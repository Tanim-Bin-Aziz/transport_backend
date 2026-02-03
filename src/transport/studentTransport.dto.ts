import { z } from "zod";

export const assignStudentTransportDto = z.object({
  studentId: z.number().int().positive(),
  routeId: z.number().int().positive(),
  pickupPointId: z.number().int().positive(),
});

export type AssignStudentTransportDto = z.infer<
  typeof assignStudentTransportDto
>;
