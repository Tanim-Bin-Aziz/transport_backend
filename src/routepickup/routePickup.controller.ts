import type { Request, Response } from "express";
import * as routePickupService from "./routepickup.service.js";
import {
  createRoutePickupDto,
  updateRoutePickupDto,
} from "./routePickup.dto.js";

const getErrorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Something went wrong";

const toId = (value: unknown) => {
  const id = Number(value);
  return Number.isFinite(id) ? id : NaN;
};

const createPickup = async (req: Request, res: Response) => {
  try {
    const body = createRoutePickupDto.parse(req.body);
    const data = await routePickupService.createRoutePickup(body);
    return res.status(201).json(data);
  } catch (err: unknown) {
    return res.status(400).json({ error: getErrorMessage(err) });
  }
};

const getPickups = async (_req: Request, res: Response) => {
  try {
    const pickups = await routePickupService.getAllRoutePickups();
    return res.json(pickups);
  } catch (err: unknown) {
    return res.status(500).json({ error: getErrorMessage(err) });
  }
};

const updatePickup = async (req: Request, res: Response) => {
  try {
    const id = toId(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid routePickup id" });
    }

    const body = updateRoutePickupDto.parse(req.body);
    const data = await routePickupService.updateRoutePickup(id, body);
    return res.json(data);
  } catch (err: unknown) {
    return res.status(400).json({ error: getErrorMessage(err) });
  }
};

const deletePickup = async (req: Request, res: Response) => {
  try {
    const id = toId(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid routePickup id" });
    }

    const data = await routePickupService.deleteRoutePickup(id);
    return res.json(data);
  } catch (err: unknown) {
    return res.status(400).json({ error: getErrorMessage(err) });
  }
};

export { createPickup, getPickups, updatePickup, deletePickup };
