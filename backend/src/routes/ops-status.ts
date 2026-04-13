import { readFile } from "node:fs/promises";
import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";

export const opsStatusRouter = Router();

const opsStatusFile = process.env.OPS_STATUS_FILE ?? "/app/ops/latest-status.json";
const uptimeStatusFile = process.env.OPS_UPTIME_FILE ?? "/app/ops/latest-uptime.json";

function toEpoch(value: unknown): number | null {
    if (typeof value !== "string") {
        return null;
    }

    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? null : parsed;
}

function withDerivedStatus(status: Record<string, unknown>) {
    const finishedAt = toEpoch(status.deploy_finished_at);
    const ageSeconds = finishedAt ? Math.max(0, Math.floor((Date.now() - finishedAt) / 1000)) : null;

    return {
        ...status,
        age_seconds: ageSeconds,
        stale: ageSeconds !== null ? ageSeconds > 3600 : null,
    };
}

function sanitizeStatus(status: Record<string, unknown>) {
    return {
        repository: status.repository,
        release_tag: status.release_tag,
        deploy_status: status.deploy_status,
        rollback_status: status.rollback_status,
        failure_reason: status.failure_reason,
        deploy_started_at: status.deploy_started_at,
        deploy_finished_at: status.deploy_finished_at,
        deploy_duration_seconds: status.deploy_duration_seconds,
        run_id: status.run_id,
        run_attempt: status.run_attempt,
        stale: status.stale,
        age_seconds: status.age_seconds,
    };
}

async function readStatus() {
    const raw = await readFile(opsStatusFile, "utf8");
    const status = JSON.parse(raw) as Record<string, unknown>;
    return withDerivedStatus(status);
}

async function readUptimeStatus() {
    try {
        const raw = await readFile(uptimeStatusFile, "utf8");
        return JSON.parse(raw) as Record<string, unknown>;
    } catch (error) {
        if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
            return null;
        }
        throw error;
    }
}

function sanitizeUptimeStatus(status: Record<string, unknown> | null) {
    if (!status) {
        return null;
    }

    return {
        checked_at: status.checked_at,
        overall_status: status.overall_status,
        slow_count: status.slow_count,
        down_count: status.down_count,
        total_count: status.total_count,
        threshold_ms: status.threshold_ms,
        failed_endpoint: status.failed_endpoint,
        endpoints: Array.isArray(status.endpoints)
            ? status.endpoints.map((entry) => {
                if (!entry || typeof entry !== "object") {
                    return entry;
                }
                return {
                    name: "name" in entry ? entry.name : null,
                    url: "url" in entry ? entry.url : null,
                    latency_ms: "latency_ms" in entry ? entry.latency_ms : null,
                    status: "status" in entry ? entry.status : null,
                };
            })
            : [],
    };
}

opsStatusRouter.get("/ops/status", async (_req, res) => {
    try {
        const status = await readStatus();
        const uptime = sanitizeUptimeStatus(await readUptimeStatus());
        return res.json({ status: sanitizeStatus(status), uptime });
    } catch (error) {
        if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
            return res.status(503).json({ error: "Deployment status not available yet" });
        }

        if (error instanceof SyntaxError) {
            return res.status(500).json({ error: "Deployment status file is invalid" });
        }

        console.error("Failed to read public deployment status", error);
        return res.status(500).json({ error: "Unable to read deployment status" });
    }
});

opsStatusRouter.get("/admin/ops/deployment-status", requireAuth, requireRole(["ADMIN"]), async (_req, res) => {
    try {
        const status = await readStatus();
        const uptime = await readUptimeStatus();
        return res.json({ status, uptime });
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