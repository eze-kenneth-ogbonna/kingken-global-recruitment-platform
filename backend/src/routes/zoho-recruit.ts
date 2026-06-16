import { Router } from "express";
import { z } from "zod";
import { createZohoCandidate, getZohoRecruitStatus } from "../integrations/zoho-recruit.js";
import { writeAuditLog } from "../lib/audit.js";
import { requireAuth, requireRole, type AuthenticatedRequest } from "../middleware/auth.js";

export const zohoRecruitRouter = Router();

const candidateSyncSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  jobCategory: z.string().optional(),
  experience: z.string().optional(),
  source: z.string().optional()
});

zohoRecruitRouter.use(requireAuth, requireRole(["ADMIN"]));

zohoRecruitRouter.get("/status", (_req, res) => {
  return res.json({ zohoRecruit: getZohoRecruitStatus() });
});

zohoRecruitRouter.post("/test-candidate", async (req: AuthenticatedRequest, res) => {
  const parsed = candidateSyncSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }

  try {
    const result = await createZohoCandidate({ ...parsed.data, source: parsed.data.source ?? "KINGKEN Admin Test Sync" });

    await writeAuditLog({
      actorId: req.user!.id,
      action: "ZOHO_TEST_CANDIDATE_SYNC_SUCCEEDED",
      targetId: result.id ?? parsed.data.email,
      metadata: {
        email: parsed.data.email,
        zohoCandidateId: result.id,
        status: result.status,
        code: result.code
      },
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"]
    });

    return res.status(201).json({ synced: true, result });
  } catch (error) {
    await writeAuditLog({
      actorId: req.user!.id,
      action: "ZOHO_TEST_CANDIDATE_SYNC_FAILED",
      targetId: parsed.data.email,
      metadata: {
        email: parsed.data.email,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"]
    });

    return res.status(502).json({
      synced: false,
      error: error instanceof Error ? error.message : "Zoho sync failed"
    });
  }
});
