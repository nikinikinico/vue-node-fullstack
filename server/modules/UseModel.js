const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserType = {
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: Number, //性别，0，1，2
  introduction: String, //简介
  avatar: String,
  role: Number, //管理员1，编辑2
};
const UserModel = mongoose.model("users", new Schema(UserType));
module.exports = UserModel;
