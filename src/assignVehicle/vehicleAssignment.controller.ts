import type { Request, Response } from "express";
import * as vehicleAssignmentService from "./vehicleAssignment.service.js";
import type { VehicleAssignmentInput } from "./vehicleAssignment.types.js";

const toNumber = (value: unknown): number => {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
};

const getErrorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Something went wrong";

const createAssignment = async (req: Request, res: Response) => {
  try {
    const body = req.body as Partial<VehicleAssignmentInput>;

    const vehicleId = toNumber(body.vehicleId);
    const routeId = toNumber(body.routeId);

    if (Number.isNaN(vehicleId) || Number.isNaN(routeId)) {
      return res
        .status(400)
        .json({ error: "vehicleId and routeId are required" });
    }

    const result = await vehicleAssignmentService.assignVehicle(
      vehicleId,
      routeId,
    );
    return res.json(result);
  } catch (err: unknown) {
    return res.status(400).json({ error: getErrorMessage(err) });
  }
};

const getAssignments = async (_req: Request, res: Response) => {
  try {
    const data = await vehicleAssignmentService.getAssignments();
    return res.json(data);
  } catch (err: unknown) {
    return res.status(500).json({ error: getErrorMessage(err) });
  }
};

const updateAssignment = async (req: Request, res: Response) => {
  try {
    const id = toNumber(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid assignment id" });
    }

    const updated = await vehicleAssignmentService.updateAssignment(
      id,
      req.body,
    );
    return res.json(updated);
  } catch (err: unknown) {
    return res.status(400).json({ error: getErrorMessage(err) });
  }
};

const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const id = toNumber(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid assignment id" });
    }

    const deleted = await vehicleAssignmentService.deleteAssignment(id);
    return res.json(deleted);
  } catch (err: unknown) {
    return res.status(400).json({ error: getErrorMessage(err) });
  }
};

const getOptions = async (_req: Request, res: Response) => {
  try {
    const data = await vehicleAssignmentService.getAssignmentOptions();
    return res.json(data);
  } catch (err: unknown) {
    return res.status(500).json({ error: getErrorMessage(err) });
  }
};

const getRoutes = async (_req: Request, res: Response) => {
  try {
    const routes = await vehicleAssignmentService.getRoutesWithDetails();
    return res.json(routes);
  } catch (err: unknown) {
    return res.status(500).json({ error: getErrorMessage(err) });
  }
};

export {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment,
  getOptions,
  getRoutes,
};
