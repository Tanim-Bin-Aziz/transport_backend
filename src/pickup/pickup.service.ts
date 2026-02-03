import { prisma } from "../lib/prisma.js";
import type { Prisma } from "@prisma/client";
import type { CreatePickupInput, UpdatePickupInput } from "./pickup.type.js";

export const createPickup = (data: CreatePickupInput) =>
  prisma.pickupPoint.create({ data });

export const updatePickup = (id: number, input: UpdatePickupInput) => {
  const data: Prisma.PickupPointUpdateInput = {};

  if (input.name !== undefined) data.name = input.name;
  if (input.location !== undefined) data.location = input.location;
  if (input.status !== undefined) data.status = input.status;

  return prisma.pickupPoint.update({
    where: { id },
    data,
  });
};

export const deletePickup = (id: number) =>
  prisma.pickupPoint.delete({ where: { id } });

export const getPickups = () =>
  prisma.pickupPoint.findMany({
    include: { _count: { select: { routes: true } } },
    orderBy: { id: "desc" },
  });

export const getPickupWithCount = (id: number) =>
  prisma.pickupPoint.findUnique({
    where: { id },
    include: { _count: { select: { routes: true } } },
  });
