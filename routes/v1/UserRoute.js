const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/UsersController");
const { verifyUser, adminOnly } = require("../../middleware/AuthUser");

const router = express.Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *      - "User"
 *     summary: Get All Users
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get("/users", verifyUser, adminOnly, getUsers);
/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *      - "User"
 *     summary: Get User by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get("/users/:id", verifyUser, adminOnly, getUserById);
/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     tags:
 *      - "User"
 *     summary: example to create user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                confPassword:
 *                  type: string
 *                role:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post("/users", verifyUser, adminOnly, createUser);
/**
 * @swagger
 * /api/v1/users/{id}:
 *   patch:
 *     tags:
 *      - "User"
 *     summary: Update User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the user
 *         schema:
 *           type: integer
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                confPassword:
 *                  type: string
 *                role:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.patch("/users/:id", verifyUser, adminOnly, updateUser);
/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     tags:
 *      - "User"
 *     summary: Delete User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.delete("/users/:id", verifyUser, adminOnly, deleteUser);

module.exports = router;
