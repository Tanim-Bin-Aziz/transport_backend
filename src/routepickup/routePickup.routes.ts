import { Router } from "express";
import * as routePickupController from "./routePickup.controller.js";
import { authMiddleware, adminOnly } from "../auth/auth.middleware.js";

const routePickupRouter = Router();

// middlewares
routePickupRouter.use(authMiddleware, adminOnly);

// routes
routePickupRouter.post("/", routePickupController.createPickup);
routePickupRouter.get("/", routePickupController.getPickups);
routePickupRouter.put("/:id", routePickupController.updatePickup);
routePickupRouter.delete("/:id", routePickupController.deletePickup);

/**
 * @openapi
 * /routes-pickup:
 *   get:
 *     tags: [RoutePickupPoints]
 *     summary: List route pickup points (with routeName & pickupPointName)
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: OK }
 *
 *   post:
 *     tags: [RoutePickupPoints]
 *     summary: Add pickup point to route
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [routeId, pickupPointId, stopOrder]
 *             properties:
 *               routeId: { type: integer }
 *               pickupPointId: { type: integer }
 *               stopOrder: { type: integer, example: 1 }
 *     responses:
 *       201: { description: Created }
 *
 * /routes-pickup/{id}:
 *   put:
 *     tags: [RoutePickupPoints]
 *     summary: Update stop order
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
 *             required: [stopOrder]
 *             properties:
 *               stopOrder: { type: integer }
 *     responses:
 *       200: { description: Updated }
 *
 *   delete:
 *     tags: [RoutePickupPoints]
 *     summary: Delete route pickup mapping
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Deleted }
 */

export default routePickupRouter;
