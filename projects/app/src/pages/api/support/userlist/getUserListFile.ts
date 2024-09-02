import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@fastgpt/service/common/response';
import { authCert } from '@fastgpt/service/support/permission/auth/common';
import { connectToDatabase } from '@/service/mongo';
import { getTUserList } from '@fastgpt/service/support/t_user/controller';
import { readFromSecondary } from '@fastgpt/service/common/mongo/utils';
import { MongoT_User } from '@fastgpt/service/support/t_user/schema';
import { NextAPI } from '@/service/middleware/entry';
import * as nodeXlsx from 'node-xlsx';
import dayjs from 'dayjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dataBack = await MongoT_User.find({});
  let excelData = [['用户', '注册时间']];
  if (dataBack.length > 0) {
    dataBack.forEach((eitem: any) => {
      let cTime = dayjs(eitem && eitem.createTime).format('YYYY/MM/DD HH:mm');
      excelData.push([eitem._id, cTime]);
    });
  }

  // const excelFile = [
  //   {
  //     name: 'sheet1',
  //     data: excelData
  //   }
  // ];

  const worksheets: nodeXlsx.WorkSheet[] = [
    {
      name: 'Sheet1',
      data: excelData,
      options: {}
    }
  ];

  // const buffer = build(excelFile, options);
  const buffer = nodeXlsx.build(worksheets);
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader('Content-Disposition', 'attachment; filename=test.xlsx');
  res.end(buffer, 'binary');
}

export default NextAPI(handler);
