import { prisma } from "../lib/prisma.js";

const monthStart = (d = new Date()) =>
  new Date(d.getFullYear(), d.getMonth(), 1);
const nextMonthStart = (d = new Date()) =>
  new Date(d.getFullYear(), d.getMonth() + 1, 1);
const monthEnd = (d = new Date()) =>
  new Date(d.getFullYear(), d.getMonth() + 1, 0);

const monthName = (d: Date) => d.toLocaleString("en-US", { month: "long" });

const remainDaysOfBillingMonth = (billingMonth: Date, now = new Date()) => {
  const start = monthStart(billingMonth);
  const endExclusive = nextMonthStart(billingMonth);

  const tNow = now.getTime();
  const tStart = start.getTime();
  const tEnd = endExclusive.getTime();

  const clamped = new Date(Math.min(Math.max(tNow, tStart), tEnd));
  const days = Math.ceil((tEnd - clamped.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
};

export const assignTransport = async (
  studentId: number,
  routeId: number,
  pickupPointId: number,
) =>
  prisma.$transaction(async (tx) => {
    await tx.studentTransport.updateMany({
      where: { studentId, status: "ACTIVE" },
      data: { status: "INACTIVE" },
    });

    const transport = await tx.studentTransport.create({
      data: { studentId, routeId, pickupPointId, status: "ACTIVE" },
      include: {
        student: true,
        route: {
          include: {
            vehicle: true,
            transportFee: true,
          },
        },
        pickupPoint: true,
      },
    });

    const routeFee = await tx.transportFee.findUnique({
      where: { routeId },
    });

    if (routeFee) {
      const start = monthStart(new Date());
      const end = nextMonthStart(new Date());

      const existing = await tx.studentFeeAssignment.findFirst({
        where: {
          studentId,
          transportFeeId: routeFee.id,
          billingMonth: {
            gte: start,
            lt: end,
          },
        },
      });

      if (!existing) {
        await tx.studentFeeAssignment.create({
          data: {
            studentId,
            transportFeeId: routeFee.id,
            amount: routeFee.amount,
            billingMonth: start,
          },
        });
      } else {
        await tx.studentFeeAssignment.update({
          where: { id: existing.id },
          data: { amount: routeFee.amount },
        });
      }
    }

    return {
      id: transport.id,
      student: transport.student,
      routeName: transport.route.routeName,
      vehicleNumber: transport.route.vehicle?.vehicleNumber || "Not Assigned",
      pickupPoint: transport.pickupPoint.name,
      fee: routeFee?.amount || 0,
      status: transport.status,
    };
  });

export const getTransportAssignments = async () => {
  const assignments = await prisma.studentTransport.findMany({
    include: {
      student: true,
      route: {
        include: {
          vehicle: true,
          transportFee: true,
        },
      },
      pickupPoint: true,
    },
    orderBy: { id: "desc" },
  });

  return assignments.map((a) => ({
    id: a.id,
    student: a.student,
    routeName: a.route?.routeName || "",
    vehicleNumber: a.route?.vehicle?.vehicleNumber || "Not Assigned",
    pickupPoint: a.pickupPoint?.name || "",
    fee: a.route?.transportFee?.amount || 0,
    status: a.status,
  }));
};

export const getRoutesWithDetails = async () => {
  const routes = await prisma.route.findMany({
    where: { status: "ACTIVE" },
    include: {
      vehicle: true,
      transportFee: true,
      pickupPoints: {
        include: { pickupPoint: true },
        orderBy: { stopOrder: "asc" },
      },
    },
    orderBy: { id: "desc" },
  });

  return routes.map((r) => ({
    id: r.id,
    routeName: r.routeName,
    startPoint: r.startPoint,
    endPoint: r.endPoint,
    vehicle: r.vehicle,
    transportFee: r.transportFee,
    pickupPoints: r.pickupPoints.map((p) => p.pickupPoint),
  }));
};

export const getStudentTransportFeeRecords = async () => {
  const list = await prisma.studentFeeAssignment.findMany({
    include: {
      student: true,
      transportFee: {
        include: {
          route: true,
        },
      },
    },
    orderBy: { id: "desc" },
  });

  const now = new Date();

  return list.map((x) => {
    const studentName =
      `${x.student.firstName} ${x.student.lastName || ""}`.trim();
    const studentId = x.student.studentCode || String(x.student.id);

    const bill = x.billingMonth || monthStart(now);

    const feeName =
      x.transportFee?.feeName ||
      `${x.transportFee?.route?.routeName || "Transport"} Fee`;

    return {
      id: x.id,
      studentName,
      studentId,
      feeName,
      amount: x.amount,
      month: monthName(bill),
      year: bill.getFullYear(),
      remainDays: remainDaysOfBillingMonth(bill, now),
      feeStatus: x.paymentStatus || "UNPAID",
    };
  });
};
