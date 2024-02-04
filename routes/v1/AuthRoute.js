const express = require("express");
const { Login, logOut, Me } = require("../../controllers/AuthController");

const router = express.Router();

/**
 * @swagger
 * /api/v1/me:
 *   get:
 *     tags:
 *      - "Auth"
 *     summary: example to get me
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get("/me", Me);
/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     tags:
 *      - "Auth"
 *     summary: example to login with email and password
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.post("/login", Login);
/**
 * @swagger
 * /api/v1/logout:
 *   delete:
 *     tags:
 *      - "Auth"
 *     summary: example to logout
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.delete("/logout", logOut);

module.exports = router