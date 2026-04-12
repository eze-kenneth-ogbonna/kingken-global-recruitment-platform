import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/health", (_req, res) => {
  return res.json({ ok: true });
});
