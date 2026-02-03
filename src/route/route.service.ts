import { prisma } from "../lib/prisma.js";
import type { Prisma } from "@prisma/client";
import type { CreateRouteInput, UpdateRouteInput } from "./route.type.js";

export const createRoute = (data: CreateRouteInput) =>
  prisma.route.create({
    data: {
      ...data,
      status: data.status ?? "ACTIVE",
    },
  });

export const updateRoute = (id: number, input: UpdateRouteInput) => {
  const data: Prisma.RouteUpdateInput = {};

  if (input.routeName !== undefined) data.routeName = input.routeName;
  if (input.startPoint !== undefined) data.startPoint = input.startPoint;
  if (input.endPoint !== undefined) data.endPoint = input.endPoint;
  if (input.status !== undefined) data.status = input.status;

  return prisma.route.update({
    where: { id },
    data,
  });
};

export const getRoutes = () =>
  prisma.route.findMany({
    orderBy: { id: "desc" },
    include: {
      vehicle: true,
      transportFee: true,
      pickupPoints: {
        include: { pickupPoint: true },
        orderBy: { stopOrder: "asc" },
      },
    },
  });
