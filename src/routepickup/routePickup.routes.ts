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

export default routePickupRouter;
