const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/ProductsController");
const { verifyUser } = require("../../middleware/AuthUser");
const { uuid } = require("../../middleware/Middleware");
const { midd_create, midd_Update } = require("../../middleware/ProductMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     tags:
 *      - "Product"
 *     summary: Get All Products
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get("/products", verifyUser, getProducts);
/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     tags:
 *      - "Product"
 *     summary: Get Products by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The uuid of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get("/products/:id", verifyUser, uuid, getProductById);
/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     tags:
 *      - "Product"
 *     summary: example to create product
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                price:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post("/products", verifyUser, midd_create, createProduct);
/**
 * @swagger
 * /api/v1/products/{id}:
 *   patch:
 *     tags:
 *      - "Product"
 *     summary: Update Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The uuid of the product
 *         schema:
 *           type: string
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                price:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.patch("/products/:id", verifyUser, uuid, midd_Update, updateProduct);
/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     tags:
 *      - "Product"
 *     summary: Delete Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The uuid of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.delete("/products/:id", verifyUser, uuid, deleteProduct);

module.exports = router;