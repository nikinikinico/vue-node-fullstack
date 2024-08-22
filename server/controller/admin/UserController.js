const UserService = require("../../services/admin/UserService");
const JWT = require("../../util/JWT");
const UserController = {
  login: async (req, res) => {
    const result = await UserService.login(req.body);
    if (result.length === 0) {
      res.send({
        code: -1,
        message: "用户名密码不匹配",
      });
    } else {
      const token = JWT.generate(
        {
          _id: result[0].id,
          useranme: result[0].username,
        },
        "1d"
      );
      res.header("Authorization", token);
      res.send({
        code: 200,
        message: "",
        data: {
          username: result[0].username,
          gender: result[0]?.gender || 0,
          introduction: result[0].introduction,
          avatar: result[0].avatar,
          role: result[0].role,
        },
      });
    }
  },
  upload: async (req, res) => {
    //调用service模块更新数据库
    const { username, introduction, gender } = req.body;
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    const token = req.headers?.authorization?.split(" ")[1];
    const payload = JWT.verify(token);
    await UserService.upload({
      _id: payload._id,
      username,
      introduction,
      gender: Number(gender),
      avatar,
    });
    res.send({
      code: 200,
      message: "",
      data: {
        username,
        introduction,
        gender: Number(gender),
        ...(avatar ? { avatar } : {}),
      },
    });
  },
  add: async (req, res) => {
    //调用service模块更新数据库
    const { username, introduction, gender, role, password } = req.body;
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    try {
      await UserService.add({
        username,
        introduction,
        gender: Number(gender),
        avatar,
        role: Number(role),
        password,
      });
      res.send({
        code: 200,
        message: "ok",
        data: "",
      });
    } catch (error) {
      res.send({
        code: error.code,
        message: error.errorResponse.errmsg,
      });
    }
  },
  getInfo: async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    const payload = JWT.verify(token);
    const result = await UserService.getInfo({ _id: payload._id });
    res.send({ code: 200, data: result });
  },
  getList: async (req, res) => {
    const result = await UserService.getList(req.params);
    res.send({
      code: 200,
      data: result,
    });
  },
  delList: async (req, res) => {
    await UserService.delList({ _id: req.params.id });
    res.send({ code: 200, message: "ok" });
  },
  putList: async (req, res) => {
    const result = await UserService.putList(req.body);
    res.send({
      code: 200,
      message: "ok",
    });
  },
};
module.exports = UserController;
