var express = require("express");
const NewsController = require("../../controller/admin/newsController");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/newsuploads/"); // 文件存储路径
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, raw) => {
      if (err) return cb(err);
      const ext = path.extname(file.originalname); // 获取原始文件的后缀
      const hashName = raw.toString("hex"); // 生成哈希值文件名
      cb(null, hashName + ext); // 将哈希值和后缀组合作为文件名
    });
  },
});
const upload = multer({ storage: storage });
var NewsRouter = express.Router();

NewsRouter.post("/news/add", upload.single("file"), NewsController.add);
NewsRouter.get("/news/list", NewsController.getList);
NewsRouter.get("/news/page", NewsController.getPage);
NewsRouter.delete("/news/list/:id", NewsController.deleteNews);
NewsRouter.put("/news/publish", NewsController.publish);
NewsRouter.post(
  "/news/image-upload",
  upload.single("file"),
  NewsController.imageUpload
);
NewsRouter.delete("/news/image-delete", NewsController.imageDelete);
module.exports = NewsRouter;
