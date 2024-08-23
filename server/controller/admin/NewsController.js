const NewsService = require("../../services/admin/NewsService");
const JWT = require("../../util/JWT");
const handleFile = require("../../util/file");
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
  deleteNews: async (req, res) => {
    await NewsService.deleteNews({ _id: req.params.id });
    res.send({ code: 200, message: "ok" });
  },
  getList: async (req, res) => {
    const result = await NewsService.getList();
    res.send({ code: 200, data: result });
  },
  getPage: async (req, res) => {
    const result = await NewsService.getPage(req.params);
    res.send({ code: 200, data: result });
  },
  publish: async (req, res) => {
    const result = await NewsService.publish({
      _id: req.body._id,
      isPublish: req.body.isPublish,
    });
    res.send({ code: 200, message: "ok", data: result });
  },
  imageUpload: async (req, res) => {
    const imageUrl = req.file ? `/newsuploads/${req.file.filename}` : "";
    res.send({ code: 200, data: imageUrl });
  },
  imageDelete: async (req, res) => {
    const filePaths = req.body;
    try {
      const errors = await handleFile.delete(filePaths);
      res.send({ code: 200, message: "ok", data: errors });
    } catch (error) {
      res.status(400).json({ code: 400, message: "删除有误" });
    }
  },
};
module.exports = NewsController;
