import { env } from "../config/env.js";

type ZohoTokenResponse = {
  access_token?: string;
  expires_in?: number;
  api_domain?: string;
  token_type?: string;
  error?: string;
};

type ZohoRecordResponse = {
  data?: Array<{
    code?: string;
    status?: string;
    message?: string;
    details?: {
      id?: string;
      [key: string]: unknown;
    };
  }>;
  [key: string]: unknown;
};

export type ZohoCandidatePayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  jobCategory?: string;
  experience?: string;
  source?: string;
};

let tokenCache: { accessToken: string; expiresAt: number } | null = null;

export function isZohoRecruitConfigured() {
  return Boolean(
    env.ZOHO_RECRUIT_ENABLED &&
      env.ZOHO_CLIENT_ID &&
      env.ZOHO_CLIENT_SECRET &&
      env.ZOHO_REFRESH_TOKEN
  );
}

export function getZohoRecruitStatus() {
  return {
    enabled: env.ZOHO_RECRUIT_ENABLED,
    configured: isZohoRecruitConfigured(),
    autoPushApplications: env.ZOHO_AUTO_PUSH_APPLICATIONS,
    candidateModule: env.ZOHO_CANDIDATE_MODULE,
    jobOpeningsModule: env.ZOHO_JOB_OPENINGS_MODULE,
    apiBaseUrl: env.ZOHO_RECRUIT_API_BASE_URL,
    superAdminEmail: env.ZOHO_SUPER_ADMIN_EMAIL,
    superAdminUserId: env.ZOHO_SUPER_ADMIN_USER_ID,
    notifyEmail: env.ZOHO_SYNC_NOTIFY_EMAIL
  };
}

async function getZohoAccessToken() {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.accessToken;
  }

  const body = new URLSearchParams({
    refresh_token: env.ZOHO_REFRESH_TOKEN,
    client_id: env.ZOHO_CLIENT_ID,
    client_secret: env.ZOHO_CLIENT_SECRET,
    grant_type: "refresh_token"
  });

  const response = await fetch(`${env.ZOHO_ACCOUNTS_BASE_URL}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });

  const data = (await response.json()) as ZohoTokenResponse;

  if (!response.ok || !data.access_token) {
    throw new Error(`Zoho token request failed: ${data.error ?? response.statusText}`);
  }

  tokenCache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + Math.max(1, data.expires_in ?? 3600) * 1000
  };

  return tokenCache.accessToken;
}

function mapCandidateToZohoRecord(candidate: ZohoCandidatePayload) {
  return {
    First_Name: candidate.firstName,
    Last_Name: candidate.lastName,
    Email: candidate.email,
    Mobile: candidate.phone,
    Country: candidate.country,
    Candidate_Status: "New",
    Source: candidate.source ?? "KINGKEN Website",
    Skill_Set: candidate.jobCategory,
    Experience_in_Years: candidate.experience
  };
}

export async function createZohoCandidate(candidate: ZohoCandidatePayload) {
  if (!isZohoRecruitConfigured()) {
    throw new Error("Zoho Recruit is not enabled or credentials are incomplete.");
  }

  const accessToken = await getZohoAccessToken();
  const response = await fetch(`${env.ZOHO_RECRUIT_API_BASE_URL}/${env.ZOHO_CANDIDATE_MODULE}`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: [mapCandidateToZohoRecord(candidate)] })
  });

  const data = (await response.json()) as ZohoRecordResponse;
  const first = data.data?.[0];

  if (!response.ok || first?.status === "error") {
    throw new Error(first?.message ?? `Zoho candidate sync failed: ${response.statusText}`);
  }

  return {
    id: first?.details?.id ?? null,
    status: first?.status ?? "success",
    code: first?.code ?? null,
    response: data
  };
}
