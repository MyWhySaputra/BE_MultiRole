const { ResponseTemplate } = require("../helpers/template.helper");
const Joi = require("joi");

function midd_create(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confPassword: Joi.string().required().valid(Joi.ref("password")),
    role: Joi.string().valid("user", "admin").required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res
      .status(400)
      .json(
        ResponseTemplate(null, "invalid request", error.details[0].message, 400)
      );
    return;
  }
  next();
}

function midd_Update(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(255).allow(""),
    email: Joi.string().email().allow(""),
    password: Joi.string().min(6).allow(""),
    confPassword: Joi.string().allow("").valid(Joi.ref("password")),
    role: Joi.string().valid("user", "admin").allow(""),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res
      .status(400)
      .json(
        ResponseTemplate(null, "invalid request", error.details[0].message, 400)
      );
    return;
  }
  next();
}

module.exports = {
  midd_create,
  midd_Update,
};
