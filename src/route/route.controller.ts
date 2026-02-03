import type { Request, Response } from "express";
import * as routeService from "./route.service.js";
import { createRouteDto, updateRouteDto } from "./route.dto.js";

const getErrorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Something went wrong";

const toId = (value: unknown) => {
  const id = Number(value);
  return Number.isFinite(id) ? id : NaN;
};

const createRoute = async (req: Request, res: Response) => {
  try {
    const body = createRouteDto.parse(req.body);
    const route = await routeService.createRoute(body);
    return res.status(201).json(route);
  } catch (err: unknown) {
    return res.status(400).json({ message: getErrorMessage(err) });
  }
};

const updateRoute = async (req: Request, res: Response) => {
  try {
    const id = toId(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid route id" });
    }

    const body = updateRouteDto.parse(req.body);
    const route = await routeService.updateRoute(id, body);

    return res.json(route);
  } catch (err: unknown) {
    return res.status(400).json({ message: getErrorMessage(err) });
  }
};

const getRoutes = async (_req: Request, res: Response) => {
  try {
    const routes = await routeService.getRoutes();
    return res.json(routes);
  } catch (err: unknown) {
    return res.status(500).json({ message: getErrorMessage(err) });
  }
};

export { createRoute, updateRoute, getRoutes };
