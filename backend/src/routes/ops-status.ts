import { readFile } from "node:fs/promises";
import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";

export const opsStatusRouter = Router();

const opsStatusFile = process.env.OPS_STATUS_FILE ?? "/app/ops/latest-status.json";

opsStatusRouter.get("/admin/ops/deployment-status", requireAuth, requireRole(["ADMIN"]), async (_req, res) => {
    try {
        const raw = await readFile(opsStatusFile, "utf8");
        const status = JSON.parse(raw) as Record<string, unknown>;
        return res.json({ status });
    } catch (error) {
        if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
            return res.status(503).json({ error: "Deployment status not available yet" });
        }

        if (error instanceof SyntaxError) {
            return res.status(500).json({ error: "Deployment status file is invalid" });
        }

        console.error("Failed to read deployment status", error);
        return res.status(500).json({ error: "Unable to read deployment status" });
    }
});