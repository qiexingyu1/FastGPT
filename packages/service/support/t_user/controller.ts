import { MongoT_User } from './schema';

export async function getTUserList() {
  return MongoT_User.find();
}
