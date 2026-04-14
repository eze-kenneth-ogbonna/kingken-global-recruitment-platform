import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const MATRIX_PATH = path.join(ROOT, "docs", "SETUP_MATRIX.md");
const README_PATH = path.join(ROOT, "README.md");
const WORKSPACE_SETUP_PATH = path.join(ROOT, "docs", "WORKSPACE_SETUP.md");
const WORKFLOW_PATHS = [
  path.join(ROOT, ".github", "workflows", "cd.yml"),
  path.join(ROOT, ".github", "workflows", "uptime-monitor.yml"),
];

const EXPECTED_SECRET_ROWS = new Set([
  "VPS_HOST",
  "VPS_USER",
  "VPS_SSH_KEY",
  "DATABASE_URL",
  "JWT_SECRET",
  "MAIL_FROM",
  "APP_BASE_URL",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_USER",
  "SMTP_PASS",
  "HEALTHCHECK_URL",
  "FRONTEND_URL",
  "OPS_STATUS_URL",
  "SLACK_WEBHOOK_URL",
]);

const FILE_REFERENCE_MAP = new Map([
  ["uptime-monitor.yml", path.join(ROOT, ".github", "workflows", "uptime-monitor.yml")],
  ["cd.yml", path.join(ROOT, ".github", "workflows", "cd.yml")],
  ["ci.yml", path.join(ROOT, ".github", "workflows", "ci.yml")],
  ["backend/.env", path.join(ROOT, "backend", ".env")],
  ["frontend/.env.local", path.join(ROOT, "frontend", ".env.local")],
  ["kingken-global.code-workspace", path.join(ROOT, "kingken-global.code-workspace")],
  [".devcontainer/devcontainer.json", path.join(ROOT, ".devcontainer", "devcontainer.json")],
  [".vscode/extensions.json", path.join(ROOT, ".vscode", "extensions.json")],
  [".vscode/launch.json", path.join(ROOT, ".vscode", "launch.json")],
  ["ops/docker-compose.prod.yml", path.join(ROOT, "ops", "docker-compose.prod.yml")],
  ["README.md", path.join(ROOT, "README.md")],
  ["docs/WORKSPACE_SETUP.md", path.join(ROOT, "docs", "WORKSPACE_SETUP.md")],
]);

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function parseTableRows(markdown) {
  const rows = [];
  for (const line of markdown.split(/\r?\n/)) {
    if (!line.startsWith("|")) continue;
    if (/^\|[\s:-]+\|$/.test(line)) continue;
    const cells = line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
    rows.push(cells);
  }
  return rows;
}

function extractSecretNames(text) {
  return new Set([...text.matchAll(/secrets\.([A-Z0-9_]+)/g)].map((match) => match[1]));
}

function isRepoFileReference(token) {
  return (
    (token.includes("/") || token.endsWith(".md") || token.endsWith(".yml") || token.endsWith(".json") || token.endsWith(".env") || token.endsWith(".code-workspace")) &&
    !token.startsWith("http")
  );
}

function fail(message, details = []) {
  console.error(message);
  for (const detail of details) {
    console.error(` - ${detail}`);
  }
  process.exit(1);
}

if (!fs.existsSync(MATRIX_PATH)) {
  fail(`Missing setup matrix: ${MATRIX_PATH}`);
}

const matrixText = read(MATRIX_PATH);
const rows = parseTableRows(matrixText);
if (rows.length < 3) {
  fail("Setup matrix table is missing or too small.");
}

const expectedHeader = [
  "Area",
  "Setting / Secret / Tool",
  "Scope",
  "Required",
  "Current expected value / format",
  "Purpose",
  "Where configured",
];

const header = rows[0];
if (JSON.stringify(header) !== JSON.stringify(expectedHeader)) {
  fail("Unexpected setup matrix header.", [`Expected: ${expectedHeader.join(" | ")}`, `Found: ${header.join(" | ")}`]);
}

const matrixSecretRows = new Set();
const fileRefs = new Set();
for (const row of rows.slice(1)) {
  if (row.length !== expectedHeader.length) continue;
  const [, setting, scope, , , , whereConfigured] = row;

  for (const [, token] of setting.matchAll(/`([^`]+)`/g)) {
    if (scope === "Repo secret") {
      matrixSecretRows.add(token);
    }
  }

  for (const [, token] of whereConfigured.matchAll(/`([^`]+)`/g)) {
    if (isRepoFileReference(token)) {
      fileRefs.add(token);
    }
  }
}

const missingSecretRows = [...EXPECTED_SECRET_ROWS].filter((item) => !matrixSecretRows.has(item));
if (missingSecretRows.length > 0) {
  fail("Setup matrix is missing required secret rows:", missingSecretRows);
}

const workflowSecretUsage = new Set();
for (const workflowPath of WORKFLOW_PATHS) {
  for (const item of extractSecretNames(read(workflowPath))) {
    workflowSecretUsage.add(item);
  }
}

const undocumentedWorkflowSecrets = [...workflowSecretUsage]
  .filter((item) => item !== "GITHUB_TOKEN" && !matrixSecretRows.has(item))
  .sort();
if (undocumentedWorkflowSecrets.length > 0) {
  fail("Workflow secrets are used but not documented in the setup matrix:", undocumentedWorkflowSecrets);
}

const missingFiles = [];
for (const ref of [...fileRefs].sort()) {
  const mapped = FILE_REFERENCE_MAP.get(ref);
  if (!mapped) continue;
  if (!fs.existsSync(mapped)) {
    missingFiles.push(`${ref} -> ${mapped}`);
  }
}
if (missingFiles.length > 0) {
  fail("Setup matrix references missing files:", missingFiles);
}

for (const docPath of [README_PATH, WORKSPACE_SETUP_PATH]) {
  if (!read(docPath).includes("docs/SETUP_MATRIX.md")) {
    fail(`Missing link to docs/SETUP_MATRIX.md in ${docPath}`);
  }
}

for (const section of [
  "## Production values checklist",
  "## Developer machine checklist",
  "## Monitoring URL reference",
  "## Recommended operating baseline",
]) {
  if (!matrixText.includes(section)) {
    fail(`Missing required section in setup matrix: ${section}`);
  }
}

console.log("Setup matrix audit passed.");
console.log(`- Documented repo secrets: ${matrixSecretRows.size}`);
console.log(`- Workflow secrets checked: ${workflowSecretUsage.size}`);
console.log(`- File references checked: ${fileRefs.size}`);