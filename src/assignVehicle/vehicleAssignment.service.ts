import { prisma } from "../lib/prisma.js";
import type {
  UpdateVehicleAssignmentInput,
  VehicleAssignmentStatus,
} from "./vehicleAssignment.types.js";

const ASSIGNED: VehicleAssignmentStatus = "ASSIGNED";

export const assignVehicle = async (vehicleId: number, routeId: number) => {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.vehicleAssignment.findFirst({
      where: { OR: [{ vehicleId }, { routeId }] },
    });

    if (existing) {
      throw new Error("Vehicle or Route is already assigned");
    }

    // connect vehicle to route
    const route = await tx.route.update({
      where: { id: routeId },
      data: { vehicleId },
      include: {
        vehicle: true,
        transportFee: true,
        pickupPoints: {
          include: { pickupPoint: true },
          orderBy: { stopOrder: "asc" },
        },
      },
    });

    // create assignment row
    await tx.vehicleAssignment.create({
      data: { vehicleId, routeId, status: ASSIGNED },
    });

    return route;
  });
};

export const getAssignments = async () => {
  return prisma.vehicleAssignment.findMany({
    include: { vehicle: true, route: true },
    orderBy: { id: "desc" },
  });
};

export const getAvailableRoutesWithDetails = async () => {
  return prisma.route.findMany({
    where: { status: "ACTIVE", vehicleId: null },
    include: {
      vehicle: true,
      transportFee: true,
      pickupPoints: {
        include: { pickupPoint: true },
        orderBy: { stopOrder: "asc" },
      },
    },
    orderBy: { id: "desc" },
  });
};

export const getAvailableVehicles = async () => {
  return prisma.vehicle.findMany({
    where: { status: "ACTIVE", assignment: null },
    orderBy: { id: "desc" },
  });
};

export const getAssignmentOptions = async () => {
  const [routes, vehicles] = await Promise.all([
    getAvailableRoutesWithDetails(),
    getAvailableVehicles(),
  ]);

  return { routes, vehicles };
};

export const updateAssignment = async (
  id: number,
  data: UpdateVehicleAssignmentInput,
) => {
  return prisma.$transaction(async (tx) => {
    const current = await tx.vehicleAssignment.findUnique({ where: { id } });
    if (!current) throw new Error("Assignment not found");

    const newVehicleId = data.vehicleId ?? current.vehicleId;
    const newRouteId = data.routeId ?? current.routeId;

    const conflict = await tx.vehicleAssignment.findFirst({
      where: {
        id: { not: id },
        OR: [{ vehicleId: newVehicleId }, { routeId: newRouteId }],
      },
    });

    if (conflict) {
      throw new Error("Vehicle or Route is already assigned");
    }

    // if route changes, clear old route vehicle
    if (newRouteId !== current.routeId) {
      await tx.route.update({
        where: { id: current.routeId },
        data: { vehicleId: null },
      });
    }

    // always ensure new route points to new vehicle
    await tx.route.update({
      where: { id: newRouteId },
      data: { vehicleId: newVehicleId },
    });

    return tx.vehicleAssignment.update({
      where: { id },
      data: {
        vehicleId: newVehicleId,
        routeId: newRouteId,
        ...(data.status ? { status: data.status } : {}),
      },
      include: { vehicle: true, route: true },
    });
  });
};

export const deleteAssignment = async (id: number) => {
  return prisma.$transaction(async (tx) => {
    const deleted = await tx.vehicleAssignment.delete({ where: { id } });

    await tx.route.update({
      where: { id: deleted.routeId },
      data: { vehicleId: null },
    });

    return deleted;
  });
};

export const getRoutesWithDetails = async () => {
  return prisma.route.findMany({
    where: { status: "ACTIVE" },
    include: {
      vehicle: true,
      transportFee: true,
      pickupPoints: {
        include: { pickupPoint: true },
        orderBy: { stopOrder: "asc" },
      },
    },
  });
};
