const jsonwebtoken = require("jsonwebtoken");
const secret = "wjy";
const JWT = {
  generate(value, expires) {
    return jsonwebtoken.sign(value, secret, { expiresIn: expires });
  },
  verify(token) {
    try {
      return jsonwebtoken.verify(token, secret);
    } catch (error) {
      return false;
    }
  },
};
module.exports = JWT;
