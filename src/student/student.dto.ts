import { z } from "zod";

export const createStudentSchema = z.object({
  studentCode: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  className: z.string().min(1),
  section: z.string().optional(),
  phone: z.string().optional(),
});

export const updateStudentSchema = createStudentSchema.partial();
