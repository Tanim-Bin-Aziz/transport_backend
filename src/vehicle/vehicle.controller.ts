import type { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import * as vehicleService from "./vehicle.service.js";
import { createVehicleDto, updateVehicleDto } from "./vehicle.dto.js";

const getErrorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Something went wrong";

const toId = (value: unknown) => {
  const id = Number(value);
  return Number.isFinite(id) ? id : NaN;
};

const createVehicle = async (req: Request, res: Response) => {
  try {
    const body = createVehicleDto.parse(req.body);
    const vehicle = await vehicleService.createVehicle(body);
    return res.status(201).json(vehicle);
  } catch (err: unknown) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return res.status(409).json({ message: "Vehicle number already exists" });
    }

    return res.status(400).json({
      message: "Failed to create vehicle",
      error: getErrorMessage(err),
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const id = toId(req.params.id);
    if (Number.isNaN(id))
      return res.status(400).json({ message: "Invalid vehicle id" });

    const body = updateVehicleDto.parse(req.body);
    const vehicle = await vehicleService.updateVehicle(id, body);
    return res.json(vehicle);
  } catch (err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025")
        return res.status(404).json({ message: "Vehicle not found" });
      if (err.code === "P2002")
        return res
          .status(409)
          .json({ message: "Vehicle number already exists" });
    }

    return res.status(400).json({
      message: "Failed to update vehicle",
      error: getErrorMessage(err),
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const id = toId(req.params.id);
    if (Number.isNaN(id))
      return res.status(400).json({ message: "Invalid vehicle id" });

    await vehicleService.deleteVehicle(id);
    return res.json({ message: "Vehicle deleted successfully" });
  } catch (err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025")
        return res.status(404).json({ message: "Vehicle not found" });

      if (err.code === "P2003") {
        return res.status(400).json({
          message: "Cannot delete vehicle. It is assigned to a route.",
        });
      }
    }

    return res.status(500).json({
      message: "Failed to delete vehicle",
      error: getErrorMessage(err),
    });
  }
};

const getVehicles = async (_req: Request, res: Response) => {
  try {
    const vehicles = await vehicleService.getVehicles();
    return res.json(vehicles);
  } catch (err: unknown) {
    return res.status(500).json({
      message: "Failed to fetch vehicles",
      error: getErrorMessage(err),
    });
  }
};

export { createVehicle, updateVehicle, deleteVehicle, getVehicles };
