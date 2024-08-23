const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const NewsType = {
  title: String,
  content: String,
  category: Number, //类别，1，2，3
  cover: String, //封面
  isPublish: Number, //未发布已发布
};
const NewsSchema = new Schema(NewsType, {
  timestamps: { createdAt: "createTime", updatedAt: "editTime" },
});
NewsSchema.plugin(mongoosePaginate);
const NewsModel = mongoose.model("news", NewsSchema);
module.exports = NewsModel;
