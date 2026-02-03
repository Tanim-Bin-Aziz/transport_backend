import { Router } from "express";
import { createAdmin, login } from "./auth.controller.js";
import { authMiddleware, adminOnly } from "./auth.middleware.js";

const authRouter = Router();

// public
authRouter.post("/login", login);

// protected (only existing admin can create new admin)
authRouter.post("/create-admin", authMiddleware, adminOnly, createAdmin);

export default authRouter;
