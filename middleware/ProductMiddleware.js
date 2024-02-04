const { ResponseTemplate } = require("../helpers/template.helper");
const Joi = require("joi");

function midd_create(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    price: Joi.number().required(),
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
    price: Joi.number().allow(0),
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
