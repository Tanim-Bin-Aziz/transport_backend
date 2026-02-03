import { z } from "zod";

export const createAdminDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const loginDto = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type CreateAdminDto = z.infer<typeof createAdminDto>;
export type LoginDto = z.infer<typeof loginDto>;
