import { Router } from "express";
import * as vehicleAssignmentController from "./vehicleAssignment.controller.js";
import { adminOnly, authMiddleware } from "../auth/auth.middleware.js";

const vehicleAssignmentRouter = Router();

// middlewares
vehicleAssignmentRouter.use(authMiddleware, adminOnly);

// routes
vehicleAssignmentRouter.post("/", vehicleAssignmentController.createAssignment);
vehicleAssignmentRouter.get("/", vehicleAssignmentController.getAssignments);
vehicleAssignmentRouter.put(
  "/:id",
  vehicleAssignmentController.updateAssignment,
);
vehicleAssignmentRouter.delete(
  "/:id",
  vehicleAssignmentController.deleteAssignment,
);
vehicleAssignmentRouter.get("/options", vehicleAssignmentController.getOptions);

export default vehicleAssignmentRouter;
