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
};
module.exports = UserController;
