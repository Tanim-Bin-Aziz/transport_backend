import { z } from "zod";

export const createVehicleDto = z.object({
  vehicleNumber: z.string().min(1),
  driverName: z.string().min(1),
  helperName: z.string().optional(),
  contactNumber: z.string().min(1),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export const updateVehicleDto = z.object({
  vehicleNumber: z.string().min(1).optional(),
  driverName: z.string().min(1).optional(),
  helperName: z.string().optional(),
  contactNumber: z.string().min(1).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export type CreateVehicleDto = z.infer<typeof createVehicleDto>;
export type UpdateVehicleDto = z.infer<typeof updateVehicleDto>;
