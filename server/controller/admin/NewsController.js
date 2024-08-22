const NewsService = require("../../services/admin/NewsService");
const JWT = require("../../util/JWT");
const NewsController = {
  add: async (req, res) => {
    const cover = req.file ? `/newsuploads/${req.file.filename}` : "";
    const { title, content, category, isPublish } = req.body;
    await NewsService.add({
      title,
      content,
      category: Number(category),
      isPublish: Number(isPublish),
      cover,
    });
    res.send({ code: 200, message: "ok" });
  },
  getList: async (req, res) => {
    const result = await NewsService.getList();
    res.send({ code: 200, data: result });
  },
  publish: async (req, res) => {
    const result = await NewsService.publish({
      _id: req.body._id,
      isPublish: req.body.isPublish,
    });
    res.send({ code: 200, message: "ok", data: result });
  },
};
module.exports = NewsController;
