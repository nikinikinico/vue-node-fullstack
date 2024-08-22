const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NewsType = {
  title: String,
  content: String,
  category: Number, //类别，1，2，3
  cover: String, //封面
  isPublish: Number, //未发布已发布
};
const NewsModel = mongoose.model(
  "news",
  new Schema(NewsType, {
    timestamps: { createdAt: "createTime", updatedAt: "editTime" },
  })
);
module.exports = NewsModel;
