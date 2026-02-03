import { Router } from "express";
import {
  assignStudentTransport,
  fetchStudentTransportFeeRecords,
  fetchTransportAssignments,
  getTransportRoutes,
} from "./studentTransport.controller.js";
import { authMiddleware, adminOnly } from "../auth/auth.middleware.js";

const studentTransportRouter = Router();

studentTransportRouter.use(authMiddleware, adminOnly);

studentTransportRouter.post("/assign", assignStudentTransport);
studentTransportRouter.get("/", fetchTransportAssignments);
studentTransportRouter.get("/routes", getTransportRoutes);
studentTransportRouter.get(
  "/student-transport-fees",
  fetchStudentTransportFeeRecords,
);

export default studentTransportRouter;
