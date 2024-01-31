const User = require("../models/UserModel");
const argon2 = require("argon2");
const { ResponseTemplate } = require("../helpers/template.helper");

async function getUsers(req, res) {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(ResponseTemplate(response, "Success", null, 200));
  } catch (error) {
    res
      .status(500)
      .json(ResponseTemplate(null, "internal server error", error, 500));
  }
}

async function getUserById(req, res) {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(ResponseTemplate(response, "Success", null, 200));
  } catch (error) {
    res
      .status(500)
      .json(ResponseTemplate(null, "internal server error", error, 500));
  }
}

async function createUser(req, res) {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json(ResponseTemplate(null, "Password and Confirm Password not match", null, 400));
  const hashPassword = await argon2.hash(password);
  try {
    const response = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });

    const view = await User.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: response.uuid,
      }
    })
    res.status(201).json(ResponseTemplate(view, "Success, user created", null, 201));
  } catch (error) {
    res
      .status(400)
      .json(ResponseTemplate(null, "internal server error", error, 500));
  }
}

async function updateUser(req, res) {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json(ResponseTemplate(null, "User not found", null, 404));
  const { name, email, password, confPassword, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json(ResponseTemplate(null, "Password and Confirm Password not match", null, 400));
  try {
    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    const view = await User.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      }
    })
    res.status(200).json(ResponseTemplate(view, "Success, user updated", null, 200));
  } catch (error) {
    res
      .status(400)
      .json(ResponseTemplate(null, "internal server error", error, 500));
  }
}

async function deleteUser(req, res) {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json(ResponseTemplate(null, "User not found", null, 404));
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json(ResponseTemplate(null, "Success, user deleted", null, 200));
  } catch (error) {
    res
      .status(400)
      .json(ResponseTemplate(null, "internal server error", error, 500));
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
