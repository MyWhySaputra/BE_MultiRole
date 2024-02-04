const User = require("../models/UserModel");
const { ResponseTemplate } = require("../helpers/template.helper");

async function verifyUser(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json(ResponseTemplate(null, "Unauthorized", null, 401));
  }

  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json(ResponseTemplate(null, "User not found", null, 404));

  req.userId = user.id;
  req.role = user.role;

  next();
}

async function adminOnly(req, res, next) {
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) return res.status(404).json(ResponseTemplate(null, "User not found", null, 404));
  if (user.role !== "admin")
    return res.status(403).json(ResponseTemplate(null, "Access denied", null, 403));

  next();
}

module.exports = { verifyUser, adminOnly };
