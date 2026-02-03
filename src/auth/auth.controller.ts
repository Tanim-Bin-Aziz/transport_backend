import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { createAdminDto, loginDto } from "./auth.dto.js";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return secret;
};

const createAdmin = async (req: Request, res: Response) => {
  try {
    const body = createAdminDto.parse(req.body);

    const exists = await prisma.admin.findUnique({
      where: { email: body.email },
    });
    if (exists) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hash = await bcrypt.hash(body.password, 10);

    const admin = await prisma.admin.create({
      data: {
        email: body.email,
        password: hash,
        name: body.name ?? null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return res.status(201).json(admin);
  } catch (err: any) {
    return res.status(400).json({
      message: err.message || "Invalid request",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const body = loginDto.parse(req.body);

    const admin = await prisma.admin.findUnique({
      where: { email: body.email },
    });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(body.password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { adminId: admin.id, role: "ADMIN" },
      getJwtSecret(),
      { expiresIn: "1d" },
    );

    return res.json({ token });
  } catch (err: any) {
    return res.status(400).json({
      message: err.message || "Invalid request",
    });
  }
};

export { createAdmin, login };
