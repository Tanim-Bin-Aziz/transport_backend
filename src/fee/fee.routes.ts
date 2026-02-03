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

export default feeRouter;
