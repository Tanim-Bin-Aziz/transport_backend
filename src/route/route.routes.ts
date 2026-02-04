import { Router } from "express";
import * as routeController from "./route.controller.js";
import { authMiddleware, adminOnly } from "../auth/auth.middleware.js";

const routeRouter = Router();

// middlewares
routeRouter.use(authMiddleware, adminOnly);

// routes
routeRouter.post("/", routeController.createRoute);
routeRouter.put("/:id", routeController.updateRoute);
routeRouter.get("/", routeController.getRoutes);

/**
 * @openapi
 * /routes:
 *   get:
 *     tags: [Routes]
 *     summary: List routes (with vehicle, fee, pickup points)
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: OK }
 *
 *   post:
 *     tags: [Routes]
 *     summary: Create route
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [routeName, startPoint, endPoint]
 *             properties:
 *               routeName: { type: string }
 *               startPoint: { type: string }
 *               endPoint: { type: string }
 *               status: { type: string, example: ACTIVE }
 *     responses:
 *       201: { description: Created }
 *
 * /routes/{id}:
 *   put:
 *     tags: [Routes]
 *     summary: Update route
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: object }
 *     responses:
 *       200: { description: Updated }
 */

export default routeRouter;
