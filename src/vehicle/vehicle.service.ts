import { prisma } from "../lib/prisma.js";
import type { Prisma } from "@prisma/client";
import type { CreateVehicleInput, UpdateVehicleInput } from "./vehicle.type.js";

export const createVehicle = (input: CreateVehicleInput) => {
  const data: Prisma.VehicleCreateInput = {
    vehicleNumber: input.vehicleNumber,
    driverName: input.driverName,
    contactNumber: input.contactNumber,
    status: input.status ?? "ACTIVE",
    helperName: input.helperName ?? null,
  };

  return prisma.vehicle.create({ data });
};

export const updateVehicle = (id: number, input: UpdateVehicleInput) => {
  const data: Prisma.VehicleUpdateInput = {};

  if (input.vehicleNumber !== undefined)
    data.vehicleNumber = input.vehicleNumber;
  if (input.driverName !== undefined) data.driverName = input.driverName;
  if (input.contactNumber !== undefined)
    data.contactNumber = input.contactNumber;
  if (input.status !== undefined) data.status = input.status;

  if (input.helperName !== undefined)
    data.helperName = input.helperName ?? null;

  return prisma.vehicle.update({
    where: { id },
    data,
  });
};

export const deleteVehicle = (id: number) =>
  prisma.vehicle.delete({ where: { id } });

export const getVehicles = () =>
  prisma.vehicle.findMany({
    include: {
      assignment: {
        include: {
          route: { select: { id: true, routeName: true } },
        },
      },
    },
    orderBy: { id: "desc" },
  });
