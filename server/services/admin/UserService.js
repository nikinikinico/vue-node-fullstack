const UserModel = require("../../modules/UseModel");

const UserService = {
  login: async ({ username, password }) => {
    return UserModel.find({
      username,
      password,
    });
  },
  upload: async ({ _id, username, introduction, gender, avatar }) => {
    const obj = {
      username,
      introduction,
      gender,
      avatar,
    };
    if (!avatar) delete obj.avatar;
    return UserModel.updateOne(
      {
        _id,
      },
      obj
    );
  },
};
module.exports = UserService;
