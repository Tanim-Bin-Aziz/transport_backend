import { Router } from "express";
import * as studentController from "./student.controller.js";
import { adminOnly, authMiddleware } from "../auth/auth.middleware.js";

const studentRouter = Router();

// middlewares
studentRouter.use(authMiddleware, adminOnly);

// routes
studentRouter.post("/", studentController.createStudent);
studentRouter.put("/:id", studentController.updateStudent);
studentRouter.get("/", studentController.getStudents);

export default studentRouter;
