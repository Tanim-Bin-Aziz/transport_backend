import type { Request, Response } from "express";
import {
  assignTransport,
  getTransportAssignments,
  getRoutesWithDetails,
  getStudentTransportFeeRecords,
} from "./studentTransport.service.js";
import { assignStudentTransportDto } from "./studentTransport.dto.js";

const getErrorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Something went wrong";

const assignStudentTransport = async (req: Request, res: Response) => {
  try {
    const body = assignStudentTransportDto.parse(req.body);

    const transport = await assignTransport(
      body.studentId,
      body.routeId,
      body.pickupPointId,
    );

    return res.status(201).json(transport);
  } catch (err: unknown) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

const fetchTransportAssignments = async (_req: Request, res: Response) => {
  try {
    const assignments = await getTransportAssignments();
    return res.json(assignments);
  } catch (err: unknown) {
    return res.status(500).json({
      error: "Failed to fetch transport assignments",
    });
  }
};

const getTransportRoutes = async (_req: Request, res: Response) => {
  try {
    const routes = await getRoutesWithDetails();
    return res.json(routes);
  } catch (err: unknown) {
    return res.status(500).json({ error: "Failed to fetch routes" });
  }
};

const fetchStudentTransportFeeRecords = async (
  _req: Request,
  res: Response,
) => {
  try {
    const rows = await getStudentTransportFeeRecords();
    return res.json(rows);
  } catch (err: unknown) {
    return res.status(500).json({
      error: "Failed to fetch transport fee records",
    });
  }
};

export {
  assignStudentTransport,
  fetchTransportAssignments,
  getTransportRoutes,
  fetchStudentTransportFeeRecords,
};
