import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const booleanString = z
  .union([z.boolean(), z.string()])
  .transform((value) => String(value).toLowerCase() === "true");

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(16),

  MAIL_FROM: z.string().default("KingKen Global <no-reply@kingkenglobal.com.ng>"),
  APP_BASE_URL: z.string().url().default("http://localhost:5173"),
  SMTP_HOST: z.string().optional().default(""),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_SECURE: booleanString.default(false),
  SMTP_USER: z.string().optional().default(""),
  SMTP_PASS: z.string().optional().default(""),

  ZOHO_RECRUIT_ENABLED: booleanString.default(false),
  ZOHO_ACCOUNTS_BASE_URL: z.string().url().default("https://accounts.zoho.com"),
  ZOHO_RECRUIT_API_BASE_URL: z.string().url().default("https://recruit.zoho.com/recruit/v2"),
  ZOHO_CLIENT_ID: z.string().optional().default(""),
  ZOHO_CLIENT_SECRET: z.string().optional().default(""),
  ZOHO_REFRESH_TOKEN: z.string().optional().default(""),
  ZOHO_CANDIDATE_MODULE: z.string().default("Candidates"),
  ZOHO_JOB_OPENINGS_MODULE: z.string().default("Job_Openings"),
  ZOHO_AUTO_PUSH_APPLICATIONS: booleanString.default(false),
  ZOHO_SYNC_NOTIFY_EMAIL: z.string().email().default("info@kingkenglobal.com.ng")
});

export const env = envSchema.parse(process.env);
