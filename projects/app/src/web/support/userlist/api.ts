import { GET, POST, PUT } from '@/web/common/api/request';

export const getFetchUserList = () => GET(`/support/userlist/getUserList`);
