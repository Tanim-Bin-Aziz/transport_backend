import { Router } from "express";
import * as feeController from "./fee.controller.js";
import { authMiddleware, adminOnly } from "../auth/auth.middleware.js";

const feeRouter = Router();

// middlewares
feeRouter.use(authMiddleware, adminOnly);

// routes
feeRouter.post("/", feeController.createFee);
feeRouter.put("/:id", feeController.updateFee);
feeRouter.get("/", feeController.getFees);
feeRouter.delete("/:id", feeController.deleteFee);

/**
 * @openapi
 * /transport-fees:
 *   get:
 *     tags: [Fees]
 *     summary: List transport fees
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: OK }
 *
 *   post:
 *     tags: [Fees]
 *     summary: Create transport fee
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [routeId, feeName, amount, billingCycle, feeType]
 *             properties:
 *               routeId: { type: integer }
 *               feeName: { type: string }
 *               amount: { type: number, example: 1500 }
 *               billingCycle: { type: string, example: Monthly }
 *               feeType: { type: string, example: Transport }
 *               status: { type: string, example: ACTIVE }
 *     responses:
 *       201: { description: Created }
 *
 * /transport-fees/{id}:
 *   put:
 *     tags: [Fees]
 *     summary: Update transport fee
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
 *     tags: [Fees]
 *     summary: Delete transport fee
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Deleted }
 */

export default feeRouter;
