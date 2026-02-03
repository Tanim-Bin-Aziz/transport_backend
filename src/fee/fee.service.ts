import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import type { CreateFeeInput, UpdateFeeInput } from "./fee.type.js";

export const createFee = (data: CreateFeeInput) =>
  prisma.transportFee.create({
    data: {
      ...data,
      status: data.status ?? "ACTIVE",
    },
    include: { route: true },
  });

export const updateFee = (id: number, input: UpdateFeeInput) => {
  const data: Prisma.TransportFeeUpdateInput = {};

  if (input.feeName !== undefined) data.feeName = input.feeName;
  if (input.amount !== undefined) data.amount = input.amount;
  if (input.billingCycle !== undefined) data.billingCycle = input.billingCycle;
  if (input.feeType !== undefined) data.feeType = input.feeType;
  if (input.status !== undefined) data.status = input.status;

  return prisma.transportFee.update({
    where: { id },
    data,
    include: { route: true },
  });
};

export const getFees = () =>
  prisma.transportFee.findMany({
    orderBy: { id: "desc" },
    include: { route: true },
  });

export const deleteFee = (id: number) =>
  prisma.transportFee.delete({
    where: { id },
  });
