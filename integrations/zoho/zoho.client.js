const DEFAULT_ACCOUNTS_BASE_URL = "https://accounts.zoho.com";
const DEFAULT_RECRUIT_API_BASE_URL = "https://recruit.zoho.com/recruit/v2";

function required(value, name) {
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

export function createZohoClient(options = {}) {
  const config = {
    accountsBaseUrl: options.accountsBaseUrl || process.env.ZOHO_ACCOUNTS_BASE_URL || DEFAULT_ACCOUNTS_BASE_URL,
    recruitApiBaseUrl: options.recruitApiBaseUrl || process.env.ZOHO_RECRUIT_API_BASE_URL || DEFAULT_RECRUIT_API_BASE_URL,
    clientId: options.clientId || process.env.ZOHO_CLIENT_ID,
    clientSecret: options.clientSecret || process.env.ZOHO_CLIENT_SECRET,
    refreshToken: options.refreshToken || process.env.ZOHO_REFRESH_TOKEN,
    candidateModule: options.candidateModule || process.env.ZOHO_CANDIDATE_MODULE || "Candidates"
  };

  let tokenCache = null;

  async function getAccessToken() {
    if (tokenCache && tokenCache.expiresAt > Date.now() + 60000) {
      return tokenCache.accessToken;
    }

    const body = new URLSearchParams({
      refresh_token: required(config.refreshToken, "ZOHO_REFRESH_TOKEN"),
      client_id: required(config.clientId, "ZOHO_CLIENT_ID"),
      client_secret: required(config.clientSecret, "ZOHO_CLIENT_SECRET"),
      grant_type: "refresh_token"
    });

    const response = await fetch(`${config.accountsBaseUrl}/oauth/v2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    });

    const data = await response.json();
    if (!response.ok || !data.access_token) {
      throw new Error(`Zoho token request failed: ${data.error || response.statusText}`);
    }

    tokenCache = {
      accessToken: data.access_token,
      expiresAt: Date.now() + Math.max(1, data.expires_in || 3600) * 1000
    };

    return tokenCache.accessToken;
  }

  async function createCandidate(record) {
    const accessToken = await getAccessToken();
    const response = await fetch(`${config.recruitApiBaseUrl}/${config.candidateModule}`, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: [record] })
    });

    const data = await response.json();
    if (!response.ok || data.data?.[0]?.status === "error") {
      throw new Error(data.data?.[0]?.message || `Zoho candidate request failed: ${response.statusText}`);
    }

    return data;
  }

  return {
    getAccessToken,
    createCandidate
  };
}
