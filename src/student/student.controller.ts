import type { Request, Response } from "express";
import * as service from "./student.service.js";
import { createStudentSchema, updateStudentSchema } from "./student.dto.js";

const getErrorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Something went wrong";

const toId = (value: unknown) => {
  const id = Number(value);
  return Number.isFinite(id) ? id : NaN;
};

const createStudent = async (req: Request, res: Response) => {
  try {
    const data = createStudentSchema.parse(req.body);
    const created = await service.createStudent(data);
    return res.status(201).json(created);
  } catch (err: unknown) {
    return res.status(400).json({ message: getErrorMessage(err) });
  }
};

const updateStudent = async (req: Request, res: Response) => {
  try {
    const id = toId(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid student id" });
    }

    const data = updateStudentSchema.parse(req.body);
    const updated = await service.updateStudent(id, data);

    return res.json(updated);
  } catch (err: unknown) {
    return res.status(400).json({ message: getErrorMessage(err) });
  }
};

const getStudents = async (_req: Request, res: Response) => {
  try {
    const list = await service.getStudents();
    return res.json(list);
  } catch (err: unknown) {
    return res.status(500).json({ message: getErrorMessage(err) });
  }
};

export { createStudent, updateStudent, getStudents };
