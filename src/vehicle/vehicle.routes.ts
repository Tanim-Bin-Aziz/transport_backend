import { Router } from "express";
import * as vehicleController from "./vehicle.controller.js";
import { adminOnly, authMiddleware } from "../auth/auth.middleware.js";

const vehicleRouter = Router();

vehicleRouter.use(authMiddleware, adminOnly);

vehicleRouter.post("/", vehicleController.createVehicle);
vehicleRouter.put("/:id", vehicleController.updateVehicle);
vehicleRouter.get("/", vehicleController.getVehicles);
vehicleRouter.delete("/:id", vehicleController.deleteVehicle);

export default vehicleRouter;
