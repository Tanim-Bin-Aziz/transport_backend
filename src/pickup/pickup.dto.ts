import { z } from "zod";

export const createPickupDto = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  active: z.boolean().optional(),
});

export const updatePickupDto = z.object({
  name: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  active: z.boolean().optional(),
});

export type CreatePickupDto = z.infer<typeof createPickupDto>;
export type UpdatePickupDto = z.infer<typeof updatePickupDto>;
