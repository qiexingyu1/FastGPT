import { connectionMongo, getMongoModel, type Model } from '../../common/mongo';
const { Schema, model, models } = connectionMongo;
import type { UserModelSchema } from '@fastgpt/global/support/user/t_user_type';

export const t_userCollectionName = 'tusers';

const T_UserSchema = new Schema({
  _id: {
    type: String
  },
  pwd: {
    type: String
  },
  createTime: {
    type: Date
  }
});

// try {
//   // login
//   T_UserSchema.index({ _id: 1 });
// } catch (error) {
//   console.log(error);
// }

export const MongoT_User = getMongoModel<UserModelSchema>(t_userCollectionName, T_UserSchema);
