-- Add CRM customer intake tables for KINGKEN Priority 1 agents.

CREATE TABLE "CustomerLead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "countryOfResidence" TEXT,
    "preferredDestinationCountry" TEXT,
    "serviceCategory" TEXT NOT NULL,
    "timeline" TEXT,
    "passportStatusIfRelevant" TEXT,
    "urgencyLevel" TEXT NOT NULL DEFAULT 'normal',
    "sourceChannel" TEXT NOT NULL,
    "assignedAgent" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "escalationStatus" TEXT NOT NULL DEFAULT 'NONE',
    "privacyAcknowledgementStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "inquirySummary" TEXT,
    "routingReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "LeadFollowUp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL,
    "assignedAgent" TEXT NOT NULL DEFAULT 'agent_3_crm_follow_up',
    "scheduledDay" INTEGER NOT NULL,
    "scheduledAt" DATETIME NOT NULL,
    "channel" TEXT NOT NULL DEFAULT 'email',
    "messageDraft" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LeadFollowUp_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "CustomerLead" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "CustomerLead_assignedAgent_status_idx" ON "CustomerLead"("assignedAgent", "status");
CREATE INDEX "CustomerLead_serviceCategory_idx" ON "CustomerLead"("serviceCategory");
CREATE INDEX "CustomerLead_createdAt_idx" ON "CustomerLead"("createdAt");
CREATE INDEX "LeadFollowUp_assignedAgent_status_scheduledAt_idx" ON "LeadFollowUp"("assignedAgent", "status", "scheduledAt");
CREATE INDEX "LeadFollowUp_leadId_idx" ON "LeadFollowUp"("leadId");
