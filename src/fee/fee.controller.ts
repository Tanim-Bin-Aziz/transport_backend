import type { Request, Response } from "express";
import * as feeService from "./fee.service.js";
import { createFeeDto, updateFeeDto } from "./fee.dto.js";

const getErrorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Something went wrong";

const createFee = async (req: Request, res: Response) => {
  try {
    const body = createFeeDto.parse(req.body);
    const fee = await feeService.createFee(body);
    return res.status(201).json(fee);
  } catch (err: unknown) {
    return res.status(400).json({ error: getErrorMessage(err) });
  }
};

const updateFee = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: "Invalid fee id" });
    }

    const body = updateFeeDto.parse(req.body);
    const fee = await feeService.updateFee(id, body);

    return res.json(fee);
  } catch (err: unknown) {
    return res.status(400).json({ error: getErrorMessage(err) });
  }
};

const getFees = async (_req: Request, res: Response) => {
  try {
    const fees = await feeService.getFees();
    return res.json(fees);
  } catch (err: unknown) {
    return res.status(500).json({ error: getErrorMessage(err) });
  }
};

const deleteFee = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: "Invalid fee id" });
    }

    const fee = await feeService.deleteFee(id);
    return res.json({ message: "Fee deleted successfully", fee });
  } catch (err: unknown) {
    return res.status(400).json({ error: getErrorMessage(err) });
  }
};

export { createFee, updateFee, getFees, deleteFee };
