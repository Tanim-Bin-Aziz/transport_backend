import { z } from "zod";

export const createRouteDto = z.object({
  routeName: z.string().min(1),
  startPoint: z.string().min(1),
  endPoint: z.string().min(1),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export const updateRouteDto = z.object({
  routeName: z.string().min(1).optional(),
  startPoint: z.string().min(1).optional(),
  endPoint: z.string().min(1).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export type CreateRouteDto = z.infer<typeof createRouteDto>;
export type UpdateRouteDto = z.infer<typeof updateRouteDto>;
