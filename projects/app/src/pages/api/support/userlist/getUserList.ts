import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@fastgpt/service/common/response';
import { authCert } from '@fastgpt/service/support/permission/auth/common';
import { connectToDatabase } from '@/service/mongo';
import { getTUserList } from '@fastgpt/service/support/t_user/controller';
import { readFromSecondary } from '@fastgpt/service/common/mongo/utils';
import { MongoT_User } from '@fastgpt/service/support/t_user/schema';
import { NextAPI } from '@/service/middleware/entry';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pageNum = 1, pageSize = 20 } = req.body;
  // try {
  //   await connectToDatabase();

  //   jsonRes(res, {
  //     data: await getTUserList()
  //   });
  // } catch (err) {
  //   jsonRes(res, {
  //     code: 500,
  //     error: err
  //   });
  // }

  const [data, total] = await Promise.all([
    MongoT_User.aggregate([{ $skip: (pageNum - 1) * pageSize }, { $limit: pageSize }], {
      ...readFromSecondary
    }),
    MongoT_User.countDocuments({ ...readFromSecondary })
  ]);

  return {
    pageNum,
    pageSize,
    data,
    total
  };
}

export default NextAPI(handler);
