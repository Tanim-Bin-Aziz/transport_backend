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

export default routeRouter;
