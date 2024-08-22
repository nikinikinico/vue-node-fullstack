var express = require("express");
const UserController = require("../../controller/admin/UserController");
const multer = require("multer");
const upload = multer({ dest: "public/avataruploads/" });
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
