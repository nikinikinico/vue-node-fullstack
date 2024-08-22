var express = require("express");
const NewsController = require("../../controller/admin/newsController");
const multer = require("multer");
const upload = multer({ dest: "public/newsuploads/" });
var NewsRouter = express.Router();

NewsRouter.post("/news/add", upload.single("file"), NewsController.add);
NewsRouter.get("/news/list", NewsController.getList);
NewsRouter.put("/news/publish", NewsController.publish);
module.exports = NewsRouter;
