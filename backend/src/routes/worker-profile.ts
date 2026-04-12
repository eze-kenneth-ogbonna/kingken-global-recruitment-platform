import { Role } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, requireRole, type AuthenticatedRequest } from "../middleware/auth.js";

export const workerProfileRouter = Router();

const workerProfileSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().optional(),
  country: z.string().optional(),
  skills: z.array(z.string()).default([])
});

workerProfileRouter.use(requireAuth, requireRole([Role.WORKER, Role.ADMIN]));

workerProfileRouter.get("/me", async (req: AuthenticatedRequest, res) => {
  const profile = await prisma.workerProfile.findUnique({ where: { userId: req.user!.id } });
  if (!profile) {
    return res.status(404).json({ error: "Worker profile not found" });
  }
  return res.json({ profile });
});

workerProfileRouter.post("/me", async (req: AuthenticatedRequest, res) => {
  const parsed = workerProfileSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }

  const profile = await prisma.workerProfile.upsert({
    where: { userId: req.user!.id },
    update: parsed.data,
    create: { userId: req.user!.id, ...parsed.data }
  });

  return res.status(201).json({ profile });
});

workerProfileRouter.put("/me", async (req: AuthenticatedRequest, res) => {
  const parsed = workerProfileSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }

  const profile = await prisma.workerProfile.update({
    where: { userId: req.user!.id },
    data: parsed.data
  });

  return res.json({ profile });
});

workerProfileRouter.delete("/me", async (req: AuthenticatedRequest, res) => {
  await prisma.workerProfile.delete({ where: { userId: req.user!.id } });
  return res.status(204).send();
});
