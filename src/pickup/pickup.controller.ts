import type { Request, Response } from "express";
import * as service from "./pickup.service.js";
import { createPickupDto, updatePickupDto } from "./pickup.dto.js";
import type { UpdatePickupInput } from "./pickup.type.js";

const getErrorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Something went wrong";

const toId = (value: unknown) => {
  const id = Number(value);
  return Number.isFinite(id) ? id : NaN;
};

const createPickup = async (req: Request, res: Response) => {
  try {
    const body = createPickupDto.parse(req.body);

    const pickup = await service.createPickup({
      name: body.name,
      location: body.location,
      status: body.active === false ? "INACTIVE" : "ACTIVE",
    });

    return res.status(201).json(pickup);
  } catch (err: unknown) {
    return res.status(400).json({ message: getErrorMessage(err) });
  }
};

const updatePickup = async (req: Request, res: Response) => {
  try {
    const id = toId(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid pickup id" });
    }

    const body = updatePickupDto.parse(req.body);

    const updateData: UpdatePickupInput = {
      ...(body.name !== undefined ? { name: body.name } : {}),
      ...(body.location !== undefined ? { location: body.location } : {}),
      ...(typeof body.active === "boolean"
        ? { status: body.active ? "ACTIVE" : "INACTIVE" }
        : {}),
    };

    const pickup = await service.updatePickup(id, updateData);
    return res.json(pickup);
  } catch (err: unknown) {
    return res.status(400).json({ message: getErrorMessage(err) });
  }
};

const deletePickup = async (req: Request, res: Response) => {
  try {
    const id = toId(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid pickup id" });
    }

    const pickup = await service.getPickupWithCount(id);
    if (!pickup) {
      return res.status(404).json({ message: "Pickup point not found" });
    }

    const assignedCount = pickup._count?.routes ?? 0;
    if (assignedCount > 0) {
      return res.status(400).json({
        message: `Cannot delete. Pickup point is occupied (${assignedCount}).`,
      });
    }

    await service.deletePickup(id);
    return res.json({ message: "Pickup point deleted successfully" });
  } catch (err: unknown) {
    return res.status(500).json({ message: getErrorMessage(err) });
  }
};

const getPickups = async (_req: Request, res: Response) => {
  try {
    const pickups = await service.getPickups();

    const result = pickups.map((p) => {
      const assignedCount = p._count?.routes ?? 0;

      return {
        id: p.id,
        name: p.name,
        location: p.location,
        status: p.status,
        assignedCount,
        occupied: assignedCount > 0,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      };
    });

    return res.json(result);
  } catch (err: unknown) {
    return res.status(500).json({ message: getErrorMessage(err) });
  }
};

export { createPickup, updatePickup, deletePickup, getPickups };
