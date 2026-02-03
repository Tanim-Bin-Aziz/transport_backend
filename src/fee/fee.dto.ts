import { z } from "zod";

export const createFeeDto = z.object({
  routeId: z.number().int().positive(),
  feeName: z.string().min(1),
  amount: z.number().positive(),
  billingCycle: z.string().min(1),
  feeType: z.string().min(1),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});
export const updateFeeDto = z.object({
  feeName: z.string().min(1).optional(),
  amount: z.number().positive().optional(),
  billingCycle: z.string().min(1).optional(),
  feeType: z.string().min(1).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export type CreateFeeDto = z.infer<typeof createFeeDto>;
export type UpdateFeeDto = z.infer<typeof updateFeeDto>;
