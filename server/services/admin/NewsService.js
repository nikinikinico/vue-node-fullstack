const NewsModel = require("../../modules/NewsModel");
const NewsService = {
  add: ({ title, content, category, cover, isPublish }) => {
    return NewsModel.create({ title, content, category, cover, isPublish });
  },
  getList: () => {
    return NewsModel.find({});
  },
  getPage: async ({ page, limit }) => {
    const options = {
      page: page || 1, // 当前页
      limit: limit || 10, // 每页记录数
      lean: true, // 使用 lean() 查询
    };
    return NewsModel.paginate({}, options);
  },
  publish: async ({ _id, isPublish }) => {
    return NewsModel.findOneAndUpdate({ _id }, { isPublish }, { new: true });
  },
  deleteNews: async ({ _id }) => {
    return NewsModel.deleteOne({ _id });
  },
};
module.exports = NewsService;
