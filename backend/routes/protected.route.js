import express from "express";
import authMiddleware from "../middlewares/auth.js";
import db from "../db/db.js";
import {
  subscribeToAccount,
  unsubscribeFromAccount,
} from "../utils/subscribeToAccount.js";
import { validateAlertForm } from "../utils/validate.js";
import { ServerError, ValidationError } from "../utils/errors.js";

let apiHitNumber = -1;

const protectedRouter = express.Router();

protectedRouter.use(authMiddleware);
protectedRouter.use((_, __, next) => {
  apiHitNumber++;
  next();
});

protectedRouter.post("/create-alert", async (req, res, next) => {
  const userId = req.user.id;
  const { isValid: isValidBody } = validateAlertForm(req.body);
  if (!isValidBody) {
    return next(new ValidationError("Invaild solana public key"));
  }

  const { address } = req.body;

  try {
    const existingAlert = await db.alert.findFirst({
      where: { address: address },
    });

    if (existingAlert) {
      return next(
        new ValidationError(
          `Alert for this address already exists #${existingAlert.id}`
        )
      );
    }
    await db.alert.create({
      data: { userId, address, id: `temp${userId}${apiHitNumber}` },
    });
    subscribeToAccount(address, `temp${userId}${apiHitNumber}`);
    return res.status(201).json({ message: "Alert created!" });
  } catch (e) {
    console.log(e);
    return next(new ServerError());
  }
});

protectedRouter.delete("/delete-alert", async (req, res, next) => {
  const userId = req.user.id;
  const alertId = req.body.alertId;

  try {
    await db.alert.delete({ where: { id: alertId, userId } });
    await unsubscribeFromAccount(alertId);

    const alerts = await db.alert.findMany({
      where: { userId, id: { not: { startsWith: "temp" } } },
      include: { _count: { select: { transactions: true } } },
    });

    return res.status(200).json({ message: "Alert deleted!", alerts });
  } catch (e) {
    console.log(e);
    return next(new ServerError());
  }
});

protectedRouter.get("/alerts", async (req, res, next) => {
  const userId = req.user.id;

  try {
    const alerts = await db.alert.findMany({
      where: { userId, AND: { id: { not: { startsWith: "temp" } } } },
      include: { _count: { select: { transactions: true } } },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ message: "Alerts fetched!", alerts });
  } catch (e) {
    console.log(e);
    return next(new ServerError());
  }
});

protectedRouter.get("/transactions", async (req, res, next) => {
  const userId = req.user.id;
  const { alertId } = req.query;

  try {
    const transactions = await db.transaction.findMany({
      where: { alertId },
      orderBy: { transactionReportedAt: "desc" },
    });

    return res
      .status(200)
      .json({ message: "Transactions fetched!", transactions });
  } catch (e) {
    console.log(e);
    return next(new ServerError());
  }
});

export default protectedRouter;
