import { prisma } from "../lib/prisma.js";
import type {
  CreateRoutePickupInput,
  UpdateRoutePickupInput,
} from "./routePickup.type.js";

export const createRoutePickup = async (data: CreateRoutePickupInput) => {
  const exists = await prisma.routePickupPoint.findFirst({
    where: {
      OR: [
        { routeId: data.routeId, stopOrder: data.stopOrder },
        { routeId: data.routeId, pickupPointId: data.pickupPointId },
      ],
    },
  });

  if (exists) {
    throw new Error("Pickup point or stop order already exists for this route");
  }

  return prisma.routePickupPoint.create({
    data,
    include: {
      route: { select: { id: true, routeName: true } },
      pickupPoint: { select: { id: true, name: true } },
    },
  });
};

export const getAllRoutePickups = () =>
  prisma.routePickupPoint.findMany({
    include: {
      route: { select: { id: true, routeName: true } },
      pickupPoint: { select: { id: true, name: true } },
    },
    orderBy: [{ routeId: "desc" }, { stopOrder: "asc" }],
  });

export const updateRoutePickup = async (
  id: number,
  data: UpdateRoutePickupInput,
) => {
  const current = await prisma.routePickupPoint.findUnique({ where: { id } });
  if (!current) throw new Error("Route pickup not found");

  const conflict = await prisma.routePickupPoint.findFirst({
    where: {
      routeId: current.routeId,
      stopOrder: data.stopOrder,
      id: { not: id },
    },
  });

  if (conflict) {
    throw new Error("Stop order already exists for this route");
  }

  return prisma.routePickupPoint.update({
    where: { id },
    data,
    include: {
      route: { select: { id: true, routeName: true } },
      pickupPoint: { select: { id: true, name: true } },
    },
  });
};

export const deleteRoutePickup = (id: number) =>
  prisma.routePickupPoint.delete({ where: { id } });
