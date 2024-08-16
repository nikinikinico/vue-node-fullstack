var express = require("express");
const UserController = require("../../controller/admin/UserController");
const multer = require("multer");
const upload = multer({ dest: "public/avataruploads/" });
var UserRouter = express.Router();

UserRouter.post("/user/login", UserController.login);
UserRouter.post("/user/upload", upload.single("file"), UserController.upload);

module.exports = UserRouter;
