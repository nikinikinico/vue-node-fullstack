const NewsModel = require("../../modules/NewsModel");
const NewsService = {
  add: ({ title, content, category, cover, isPublish }) => {
    return NewsModel.create({ title, content, category, cover, isPublish });
  },
  getList: () => {
    return NewsModel.find({});
  },
  publish: async ({ _id, isPublish }) => {
    return NewsModel.findOneAndUpdate({ _id }, { isPublish }, { new: true });
  },
};
module.exports = NewsService;
