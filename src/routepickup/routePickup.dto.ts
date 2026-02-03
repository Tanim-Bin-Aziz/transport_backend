import { z } from "zod";

export const createRoutePickupDto = z.object({
  routeId: z.number().int().positive(),
  pickupPointId: z.number().int().positive(),
  stopOrder: z.number().int().positive(),
});

export const updateRoutePickupDto = z.object({
  stopOrder: z.number().int().positive(),
});

export type CreateRoutePickupDto = z.infer<typeof createRoutePickupDto>;
export type UpdateRoutePickupDto = z.infer<typeof updateRoutePickupDto>;
