import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, requireRole, type AuthenticatedRequest } from "../middleware/auth.js";

export const employerProfileRouter = Router();

const employerProfileSchema = z.object({
  companyName: z.string().min(2),
  website: z.string().url().optional(),
  country: z.string().optional()
});

employerProfileRouter.use(requireAuth, requireRole(["EMPLOYER", "ADMIN"]));

employerProfileRouter.get("/me", async (req: AuthenticatedRequest, res) => {
  const profile = await prisma.employerProfile.findUnique({ where: { userId: req.user!.id } });
  if (!profile) {
    return res.status(404).json({ error: "Employer profile not found" });
  }
  return res.json({ profile });
});

employerProfileRouter.post("/me", async (req: AuthenticatedRequest, res) => {
  const parsed = employerProfileSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }

  const profile = await prisma.employerProfile.upsert({
    where: { userId: req.user!.id },
    update: parsed.data,
    create: { userId: req.user!.id, ...parsed.data }
  });

  return res.status(201).json({ profile });
});

employerProfileRouter.put("/me", async (req: AuthenticatedRequest, res) => {
  const parsed = employerProfileSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }

  const profile = await prisma.employerProfile.update({
    where: { userId: req.user!.id },
    data: parsed.data
  });

  return res.json({ profile });
});

employerProfileRouter.delete("/me", async (req: AuthenticatedRequest, res) => {
  await prisma.employerProfile.delete({ where: { userId: req.user!.id } });
  return res.status(204).send();
});
