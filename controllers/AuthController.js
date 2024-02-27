const User = require("../models/UserModel");
const argon2 = require("argon2");
const { ResponseTemplate } = require("../helpers/template.helper");

async function Login(req, res) {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json(ResponseTemplate(null, "User not found", null, 404));
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json(ResponseTemplate(null, "Incorrect password", null, 400));
  req.session.userId = user.uuid;
  const { uuid, name, email, role } = user;
  res.status(200).json({ uuid, name, email, role });
}

async function Me(req, res) {
  if (!req.session.userId) {
    return res.status(401).json(ResponseTemplate(null, "Unauthorized", null, 401));
  }
  const user = await User.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json(ResponseTemplate(null, "User not found", null, 404));
  res.status(200).json(user);
}

async function logOut(req, res) {
  req.session.destroy((err) => {
    if (err) return res.status(400).json(ResponseTemplate(null, "Failed to logout", err, 400));
    res.status(200).json(ResponseTemplate(null, "Success to logout", null, 200));
  });
  res.clearCookie("connect.sid", { path: "/" });
}

module.exports = {
  Login,
  Me,
  logOut,
}