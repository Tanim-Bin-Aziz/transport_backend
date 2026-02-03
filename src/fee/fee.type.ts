import type { Prisma } from "@prisma/client";

export type FeeWithRoute = Prisma.TransportFeeGetPayload<{
  include: { route: true };
}>;

export type CreateFeeInput = {
  routeId: number;
  feeName: string;
  amount: number;
  billingCycle: string;
  feeType: string;
  status?: string | undefined;
};
export type UpdateFeeInput = {
  feeName?: string | undefined;
  amount?: number | undefined;
  billingCycle?: string | undefined;
  feeType?: string | undefined;
  status?: string | undefined;
};
