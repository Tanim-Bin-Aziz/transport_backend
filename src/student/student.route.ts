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
/**
 * @openapi
 * /students:
 *   get:
 *     tags: [Students]
 *     summary: List students
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: OK }
 *
 *   post:
 *     tags: [Students]
 *     summary: Create student
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [studentCode, firstName, className]
 *             properties:
 *               studentCode: { type: string }
 *               firstName: { type: string }
 *               lastName: { type: string, nullable: true }
 *               className: { type: string }
 *               section: { type: string, nullable: true }
 *               phone: { type: string, nullable: true }
 *     responses:
 *       201: { description: Created }
 *
 * /students/{id}:
 *   put:
 *     tags: [Students]
 *     summary: Update student
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
 *           schema:
 *             type: object
 *     responses:
 *       200: { description: Updated }
 */

export default studentRouter;
