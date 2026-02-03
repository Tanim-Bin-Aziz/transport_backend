import { prisma } from "../lib/prisma.js";
import type { Prisma } from "@prisma/client";
import type { CreateStudentInput, UpdateStudentInput } from "./student.type.js";

export const createStudent = (input: CreateStudentInput) => {
  const data: Prisma.StudentCreateInput = {
    studentCode: input.studentCode,
    firstName: input.firstName,
    className: input.className,
    lastName: input.lastName ?? null,
    section: input.section ?? null,
    phone: input.phone ?? null,
  };

  return prisma.student.create({ data });
};

export const updateStudent = (id: number, input: UpdateStudentInput) => {
  const data: Prisma.StudentUpdateInput = {};

  if (input.studentCode !== undefined) data.studentCode = input.studentCode;
  if (input.firstName !== undefined) data.firstName = input.firstName;
  if (input.className !== undefined) data.className = input.className;
  if (input.lastName !== undefined) data.lastName = input.lastName ?? null;
  if (input.section !== undefined) data.section = input.section ?? null;
  if (input.phone !== undefined) data.phone = input.phone ?? null;

  return prisma.student.update({
    where: { id },
    data,
  });
};

export const getStudents = () =>
  prisma.student.findMany({
    orderBy: { id: "desc" },
  });
