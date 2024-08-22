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
  add: async ({ username, introduction, gender, avatar, role, password }) => {
    return UserModel.create({
      username,
      introduction,
      gender,
      avatar,
      role,
      password,
    });
  },
  getInfo: async ({ _id }) => {
    return UserModel.findById(_id);
  },
  getList: async ({ id }) => {
    return UserModel.find(
      id ? { _id: id } : {},
      id
        ? ["username", "role", "introduction", "avatar", "gender", "password"]
        : ["username", "role", "introduction", "avatar", "gender"]
    );
  },
  delList: async ({ _id }) => {
    return UserModel.deleteOne({ _id });
  },
  putList: async (body) => {
    if (!body.password) delete body.password;
    return UserModel.updateOne({ _id: body._id }, body);
  },
};
module.exports = UserService;
