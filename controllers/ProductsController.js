const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const { Op } = require("sequelize");
const { ResponseTemplate } = require("../helpers/template.helper");

async function getProducts(req, res) {
  try {
    let response;
    if (req.role === "admin") {
      response = await Product.findAll({
        attributes: ["uuid", "name", "price"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Product.findAll({
        attributes: ["uuid", "name", "price"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(ResponseTemplate(response, "Success", null, 200));
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json(ResponseTemplate(null, "Data not found", null, 404));
    let response;
    if (req.role === "admin") {
      response = await Product.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          id: product.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Product.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(ResponseTemplate(response, "Success", null, 200));
  } catch (error) {
    res.status(500).json(ResponseTemplate(null, "internal server error", error, 500));
  }
}

async function createProduct(req, res) {
  const { name, price } = req.body;
  try {
    const product = await Product.create({
      name: name,
      price: price,
      userId: req.userId,
    });
    const view = await Product.findOne({
      attributes: ["uuid", "name", "price"],
      where: {
        id: product.id,
      }
    })
    res.status(201).json(ResponseTemplate(view, "Success, product created", null, 201));
  } catch (error) {
    res.status(500).json(ResponseTemplate(null, "internal server error", error, 500));
  }
}

async function updateProduct(req, res) {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json(ResponseTemplate(null, "Data not found", null, 404));
    const { name, price } = req.body;
    if (req.role === "admin") {
      await Product.update(
        { name, price },
        {
          where: {
            id: product.id,
          },
        }
      );
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json(ResponseTemplate(null, "access denied", null, 403));
      await Product.update(
        { name, price },
        {
          where: {
            [Op.and]: [{ id: product.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json(ResponseTemplate(null, "Success, product updated", null, 200));
  } catch (error) {
    res.status(500).json(ResponseTemplate(null, "internal server error", error, 500));
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json(ResponseTemplate(null, "Data not found", null, 404));
    if (req.role === "admin") {
      await Product.destroy({
        where: {
          id: product.id,
        },
      });
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json(ResponseTemplate(null, "access denied", null, 403));
      await Product.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json(ResponseTemplate(null, "Success, product deleted", null, 200));
  } catch (error) {
    res.status(500).json(ResponseTemplate(null, "internal server error", error, 500));
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
