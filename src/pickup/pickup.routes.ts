import { Router } from "express";
import * as pickupController from "./pickup.controller.js";
import { authMiddleware, adminOnly } from "../auth/auth.middleware.js";

const pickupRouter = Router();

// middlewares
pickupRouter.use(authMiddleware, adminOnly);

// routes
pickupRouter.post("/", pickupController.createPickup);
pickupRouter.put("/:id", pickupController.updatePickup);
pickupRouter.delete("/:id", pickupController.deletePickup);
pickupRouter.get("/", pickupController.getPickups);

/**
 * @openapi
 * /pickup-points:
 *   get:
 *     tags: [PickupPoints]
 *     summary: List pickup points
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: OK }
 *
 *   post:
 *     tags: [PickupPoints]
 *     summary: Create pickup point
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, location]
 *             properties:
 *               name: { type: string }
 *               location: { type: string }
 *               active: { type: boolean, example: true }
 *     responses:
 *       201: { description: Created }
 *
 * /pickup-points/{id}:
 *   put:
 *     tags: [PickupPoints]
 *     summary: Update pickup point
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
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               location: { type: string }
 *               active: { type: boolean }
 *     responses:
 *       200: { description: Updated }
 *
 *   delete:
 *     tags: [PickupPoints]
 *     summary: Delete pickup point (blocked if occupied)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Deleted }
 *       400: { description: Occupied }
 */

export default pickupRouter;
