import { createHash } from "node:crypto";
import { prisma } from "./prisma.js";

export async function writeAuditLog(input: {
  actorId: string;
  action: string;
  targetId: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}) {
  const previous = await prisma.auditLog.findFirst({ orderBy: { createdAt: "desc" } });
  const version = 1;
  const metadata = input.metadata ? JSON.stringify(input.metadata) : null;
  const payload = JSON.stringify({
    actorId: input.actorId,
    action: input.action,
    targetId: input.targetId,
    version,
    metadata,
    ipAddress: input.ipAddress ?? null,
    userAgent: input.userAgent ?? null,
    prevHash: previous?.hash ?? null,
    createdAt: new Date().toISOString()
  });

  const hash = createHash("sha256").update(payload).digest("hex");

  return prisma.auditLog.create({
    data: {
      actorId: input.actorId,
      action: input.action,
      targetId: input.targetId,
      version,
      metadata,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      prevHash: previous?.hash,
      hash
    }
  });
}
