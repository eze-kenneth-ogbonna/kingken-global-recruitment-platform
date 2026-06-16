import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { writeAuditLog } from "../lib/audit.js";
import { requireAuth, requireRole, type AuthenticatedRequest } from "../middleware/auth.js";

export const customerIntakeRouter = Router();

const serviceCategorySchema = z.enum([
  "flight_booking_information",
  "hotel_reservations",
  "visa_assistance",
  "study_abroad",
  "work_travel",
  "tour_packages",
  "airport_pickup",
  "travel_insurance",
  "recruitment_job_placement",
  "candidate_screening",
  "employer_partnership",
  "deployment_readiness",
  "recruitment_compliance",
  "complaint",
  "refund_request",
  "payment_dispute",
  "corporate_account_inquiry"
]);

const urgencySchema = z.enum(["low", "normal", "high", "urgent", "travel_within_24_hours"]);

const sourceChannelSchema = z.enum([
  "gmail",
  "outlook",
  "whatsapp_business",
  "website_live_chat",
  "website_form",
  "phone",
  "referral",
  "crm",
  "social_channel",
  "walk_in"
]);

const customerIntakeSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phoneNumber: z.string().trim().min(6).max(40),
  emailAddress: z.string().trim().email().max(160),
  countryOfResidence: z.string().trim().max(80).optional(),
  preferredDestinationCountry: z.string().trim().max(80).optional(),
  serviceCategory: serviceCategorySchema,
  timeline: z.string().trim().max(120).optional(),
  passportStatusIfRelevant: z.string().trim().max(120).optional(),
  urgencyLevel: urgencySchema.default("normal"),
  sourceChannel: sourceChannelSchema,
  inquirySummary: z.string().trim().max(2000).optional(),
  privacyAcknowledged: z.literal(true)
});

const followUpStatusSchema = z.object({
  status: z.enum(["PENDING", "SENT", "SKIPPED", "ESCALATED"]),
  note: z.string().trim().max(1000).optional()
});

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function routeLead(serviceCategory: z.infer<typeof serviceCategorySchema>, urgencyLevel: z.infer<typeof urgencySchema>) {
  if (["complaint", "refund_request", "payment_dispute", "corporate_account_inquiry"].includes(serviceCategory)) {
    return {
      assignedAgent: "human_manager",
      escalationStatus: "IMMEDIATE",
      routingReason: "Immediate escalation category"
    };
  }

  if (urgencyLevel === "travel_within_24_hours" || urgencyLevel === "urgent") {
    return {
      assignedAgent: "human_manager",
      escalationStatus: "IMMEDIATE",
      routingReason: "Urgent customer timeline"
    };
  }

  if (["visa_assistance", "study_abroad", "work_travel"].includes(serviceCategory)) {
    return {
      assignedAgent: "agent_2_visa_documentation",
      escalationStatus: "NONE",
      routingReason: "Visa or documentation inquiry routed to Visa Documentation Agent"
    };
  }

  if (["recruitment_job_placement"].includes(serviceCategory)) {
    return {
      assignedAgent: "agent_6_recruitment_job_placement",
      escalationStatus: "NONE",
      routingReason: "Recruitment inquiry routed to Recruitment & Job Placement Agent"
    };
  }

  if (["candidate_screening"].includes(serviceCategory)) {
    return {
      assignedAgent: "agent_7_candidate_screening",
      escalationStatus: "NONE",
      routingReason: "Candidate screening inquiry routed to Candidate Screening Agent"
    };
  }

  if (["employer_partnership"].includes(serviceCategory)) {
    return {
      assignedAgent: "agent_8_employer_partnership",
      escalationStatus: "NONE",
      routingReason: "Employer inquiry routed to Employer Partnership Agent"
    };
  }

  if (["deployment_readiness"].includes(serviceCategory)) {
    return {
      assignedAgent: "agent_9_deployment_readiness",
      escalationStatus: "NONE",
      routingReason: "Deployment readiness inquiry routed to Deployment Readiness Agent"
    };
  }

  if (["recruitment_compliance"].includes(serviceCategory)) {
    return {
      assignedAgent: "agent_10_recruitment_compliance",
      escalationStatus: "IMMEDIATE",
      routingReason: "Compliance inquiry requires compliance handling"
    };
  }

  return {
    assignedAgent: "agent_1_customer_support",
    escalationStatus: "NONE",
    routingReason: "General travel service inquiry routed to Customer Support Agent"
  };
}

function buildFollowUpDraft(fullName: string, serviceCategory: string, day: number) {
  return `Hello ${fullName}, this is KINGKEN GLOBAL following up on your ${serviceCategory.replaceAll("_", " ")} inquiry. Please let us know if you would like assistance with the next step. This message is a draft and should be reviewed before sending.`;
}

customerIntakeRouter.post("/intake", async (req, res) => {
  const parsed = customerIntakeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }

  const data = parsed.data;
  const route = routeLead(data.serviceCategory, data.urgencyLevel);
  const now = new Date();
  const followUpDays = [1, 3, 7, 14, 30];

  const lead = await prisma.customerLead.create({
    data: {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      emailAddress: data.emailAddress,
      countryOfResidence: data.countryOfResidence,
      preferredDestinationCountry: data.preferredDestinationCountry,
      serviceCategory: data.serviceCategory,
      timeline: data.timeline,
      passportStatusIfRelevant: data.passportStatusIfRelevant,
      urgencyLevel: data.urgencyLevel,
      sourceChannel: data.sourceChannel,
      assignedAgent: route.assignedAgent,
      escalationStatus: route.escalationStatus,
      privacyAcknowledgementStatus: "ACCEPTED",
      inquirySummary: data.inquirySummary,
      routingReason: route.routingReason,
      followUps: {
        create: followUpDays.map((day) => ({
          scheduledDay: day,
          scheduledAt: addDays(now, day),
          messageDraft: buildFollowUpDraft(data.fullName, data.serviceCategory, day)
        }))
      }
    },
    include: { followUps: true }
  });

  await writeAuditLog({
    actorId: "public-intake",
    action: route.escalationStatus === "IMMEDIATE" ? "CUSTOMER_LEAD_ESCALATED" : "CUSTOMER_LEAD_CREATED",
    targetId: lead.id,
    metadata: {
      assignedAgent: lead.assignedAgent,
      serviceCategory: lead.serviceCategory,
      urgencyLevel: lead.urgencyLevel,
      sourceChannel: lead.sourceChannel,
      escalationStatus: lead.escalationStatus
    },
    ipAddress: req.ip,
    userAgent: req.get("user-agent")
  });

  return res.status(201).json({
    lead: {
      id: lead.id,
      status: lead.status,
      assignedAgent: lead.assignedAgent,
      escalationStatus: lead.escalationStatus,
      routingReason: lead.routingReason,
      followUps: lead.followUps.map((followUp) => ({
        id: followUp.id,
        scheduledDay: followUp.scheduledDay,
        scheduledAt: followUp.scheduledAt,
        status: followUp.status
      }))
    }
  });
});

customerIntakeRouter.get("/leads", requireAuth, requireRole(["ADMIN"]), async (_req, res) => {
  const leads = await prisma.customerLead.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { followUps: { orderBy: { scheduledAt: "asc" } } }
  });

  return res.json({ leads });
});

customerIntakeRouter.get("/follow-ups", requireAuth, requireRole(["ADMIN"]), async (_req, res) => {
  const followUps = await prisma.leadFollowUp.findMany({
    orderBy: { scheduledAt: "asc" },
    take: 100,
    include: { lead: true }
  });

  return res.json({ followUps });
});

customerIntakeRouter.patch("/follow-ups/:id", requireAuth, requireRole(["ADMIN"]), async (req: AuthenticatedRequest, res) => {
  const parsed = followUpStatusSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }

  const followUp = await prisma.leadFollowUp.update({
    where: { id: req.params.id },
    data: { status: parsed.data.status }
  });

  await writeAuditLog({
    actorId: req.user!.id,
    action: "LEAD_FOLLOW_UP_STATUS_UPDATED",
    targetId: followUp.id,
    metadata: {
      status: parsed.data.status,
      note: parsed.data.note
    },
    ipAddress: req.ip,
    userAgent: req.get("user-agent")
  });

  return res.json({ followUp });
});
