const { ResponseTemplate } = require("../helpers/template.helper");
const Joi = require("joi");

function midd_login(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json(ResponseTemplate(null, "invalid request", error.details[0].message, 400));
    return;
  }

  next();
}

function uuid(req, res, next) {
  const schema = Joi.object({
    id: Joi.string().required(),
  });

  const { error } = schema.validate(req.params);
  if (error) {
    res.status(400).json(ResponseTemplate(null, "invalid request", error.details[0].message, 400));
    return;
  }
  next();
}

module.exports = {
  midd_login,
  uuid,
}