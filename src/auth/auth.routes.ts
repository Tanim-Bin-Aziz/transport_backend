import { Router } from "express";
import { createAdmin, login } from "./auth.controller.js";
import { authMiddleware, adminOnly } from "./auth.middleware.js";

const authRouter = Router();

// public
authRouter.post("/login", login);

// protected (only existing admin can create new admin)
authRouter.post("/create-admin", authMiddleware, adminOnly, createAdmin);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Admin login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: admin@gmail.com }
 *               password: { type: string, example: "123456" }
 *     responses:
 *       200:
 *         description: JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token: { type: string }
 *       401: { description: Invalid credentials }
 */

/**
 * @openapi
 * /auth/create-admin:
 *   post:
 *     tags: [Auth]
 *     summary: Create new admin (protected)
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string, minLength: 6 }
 *               name: { type: string, nullable: true }
 *     responses:
 *       201: { description: Admin created }
 *       409: { description: Email already exists }
 */

export default authRouter;
