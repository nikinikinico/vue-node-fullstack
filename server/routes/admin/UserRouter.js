var express = require("express");
const UserController = require("../../controller/admin/UserController");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/avataruploads/"); // 文件存储路径
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
var UserRouter = express.Router();
UserRouter.post("/user/login", UserController.login);
UserRouter.post("/user/upload", upload.single("file"), UserController.upload);
UserRouter.post("/user/add", upload.single("file"), UserController.add);
UserRouter.get("/user/info", UserController.getInfo);
UserRouter.get("/user/list", UserController.getList);
UserRouter.get("/user/list/:id", UserController.getList);
UserRouter.delete("/user/list/:id", UserController.delList);
UserRouter.put("/user/list/:id", UserController.putList);
module.exports = UserRouter;
