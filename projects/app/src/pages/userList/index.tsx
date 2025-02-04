import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  useTheme,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import PageContainer from '@/components/PageContainer';
import { serviceSideProps } from '@/web/common/utils/i18n';
import EmptyTip from '@fastgpt/web/components/common/EmptyTip';
import { usePagination } from '@fastgpt/web/hooks/usePagination';
import { userList } from '@/types/app';
import { getFetchUserList } from '@/web/support/userlist/api';

const UserList = () => {
  const {
    data: userListData,
    isLoading,
    Pagination,
    getData,
    pageNum
  } = usePagination<userList>({
    api: getFetchUserList,
    pageSize: 20
  });

  const exportUserList = () => {
    fetch('/api/support/userlist/getUserListFile')
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        const fileName = '用户列表.xlsx';
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <>
      <PageContainer>
        <Flex style={{ padding: '24px 40px 0' }}>
          <Box flex={'1 0 0'} h={'100%'} pb={[4, 0]} overflow={'auto'}>
            <Flex justifyContent={'space-between'}>
              <span></span>
              <Button variant={'primary'} onClick={exportUserList}>
                <Box>导出</Box>
              </Button>
            </Flex>
            <TableContainer style={{ paddingTop: '1.25rem' }}>
              <Table variant={'simple'} w={'100%'} overflowX={'auto'} fontSize={'sm'}>
                <Thead>
                  <Tr>
                    <Th>用户</Th>
                    <Th>注册时间</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {userListData &&
                    userListData.map((item: any) => (
                      <Tr key={item && item._id}>
                        <Td>{item && item._id}</Td>
                        {item && item.createTime && (
                          <Td>{dayjs(item && item.createTime).format('YYYY/MM/DD HH:mm')}</Td>
                        )}
                        {!item || (!item.createTime && <Td>--</Td>)}
                      </Tr>
                    ))}
                </Tbody>
              </Table>
              {userListData.length === 0 && !isLoading && (
                <EmptyTip text="还没有用户噢~"></EmptyTip>
              )}
            </TableContainer>
            <HStack w={'100%'} mt={3} justifyContent={'flex-end'}>
              <Pagination />
            </HStack>
          </Box>
        </Flex>
      </PageContainer>
    </>
  );
};

export async function getServerSideProps(content: any) {
  return {
    props: {
      ...(await serviceSideProps(content, ['publish', 'user']))
    }
  };
}

export default React.memo(UserList);
