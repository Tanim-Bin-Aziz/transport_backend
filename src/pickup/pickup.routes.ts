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

export default pickupRouter;
