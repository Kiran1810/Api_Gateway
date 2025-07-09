/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication routes
 */

const express = require('express');
const { UserController } = require('../../controllers');
const { AuthRequestMiddlewares } = require('../../middlewares');
const router = express.Router();

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/signup', AuthRequestMiddlewares.validateAuthRequest, UserController.signup);
/**
 * @swagger
 * /api/user/signin:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post('/signin', AuthRequestMiddlewares.validateAuthRequest, UserController.signin);

/**
 * @swagger
 * /api/user/role:
 *   post:
 *     summary: Assign a role to a user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role assigned
 */
router.post('/role', AuthRequestMiddlewares.checkAuth, AuthRequestMiddlewares.isAdmin, UserController.role);

module.exports = router;
