import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.config.js";

import authRoutes from "./auth/auth.routes.js";
import studentRoutes from "./student/student.route.js";
import vehicleRoutes from "./vehicle/vehicle.routes.js";
import pickupRoutes from "./pickup/pickup.routes.js";
import routeRoutes from "./route/route.routes.js";
import routePickupRoutes from "./routepickup/routePickup.routes.js";
import feeRouter from "./fee/fee.routes.js";
import vehicleAssignmentRoutes from "./assignVehicle/vehicleAssignment.routes.js";
import transportRoutes from "./transport/studentTransport.routes.js";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/vehicle-assignments", vehicleAssignmentRoutes);
app.use("/pickup-points", pickupRoutes);
app.use("/routes", routeRoutes);
app.use("/transport-fees", feeRouter);
app.use("/routes-pickup", routePickupRoutes);
app.use("/transport-assignments", transportRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default app;
