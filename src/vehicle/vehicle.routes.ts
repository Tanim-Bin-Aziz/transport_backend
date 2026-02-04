import { Router } from "express";
import * as vehicleController from "./vehicle.controller.js";
import { adminOnly, authMiddleware } from "../auth/auth.middleware.js";

const vehicleRouter = Router();

vehicleRouter.use(authMiddleware, adminOnly);

vehicleRouter.post("/", vehicleController.createVehicle);
vehicleRouter.put("/:id", vehicleController.updateVehicle);
vehicleRouter.get("/", vehicleController.getVehicles);
vehicleRouter.delete("/:id", vehicleController.deleteVehicle);

/**
 * @openapi
 * /vehicles:
 *   get:
 *     tags: [Vehicles]
 *     summary: List vehicles
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: OK }
 *
 *   post:
 *     tags: [Vehicles]
 *     summary: Create vehicle
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [vehicleNumber, driverName, contactNumber]
 *             properties:
 *               vehicleNumber: { type: string }
 *               driverName: { type: string }
 *               helperName: { type: string, nullable: true }
 *               contactNumber: { type: string }
 *               status: { type: string, example: ACTIVE }
 *     responses:
 *       201: { description: Created }
 *
 * /vehicles/{id}:
 *   put:
 *     tags: [Vehicles]
 *     summary: Update vehicle
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
 *
 *   delete:
 *     tags: [Vehicles]
 *     summary: Delete vehicle
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Deleted }
 *       400: { description: Cannot delete if assigned }
 */

export default vehicleRouter;
