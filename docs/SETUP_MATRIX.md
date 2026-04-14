# Production and Developer Setup Matrix

This document is the single reference for the operational and developer setup required to run, deploy, monitor, and debug the Kingken Global Recruitment Platform.

## How to use this document

Use this matrix in three ways:

1. **Local developer setup** — configure your machine and VS Code workspace
2. **GitHub setup** — configure repository settings, secrets, workflows, and GHCR access
3. **Production setup** — configure the VPS, runtime environment, monitoring, and SMTP

The repository also enforces part of this document automatically through:

- `scripts/audit_setup_matrix.mjs`
- the CI workflow in `.github/workflows/ci.yml`

---

## Setup matrix

| Area | Setting / Secret / Tool | Scope | Required | Current expected value / format | Purpose | Where configured |
| --- | --- | --- | --- | --- | --- | --- |
| GitHub | Branch protection on `main` | Repo | Yes | PR review + required checks | Prevent direct breakage on main | GitHub repository settings |
| GitHub | Actions permissions | Repo | Yes | Contents read, packages write where needed | Allows CI/CD and GHCR publishing | GitHub repository settings + workflow permissions |
| GitHub | `VPS_HOST` | Repo secret | Yes for CD | VPS hostname or IP | Target production server | GitHub Secrets |
| GitHub | `VPS_USER` | Repo secret | Yes for CD | SSH username | Remote deployment user | GitHub Secrets |
| GitHub | `VPS_SSH_KEY` | Repo secret | Yes for CD | Private SSH key content | Secure deployment access | GitHub Secrets |
| GitHub | `DATABASE_URL` | Repo secret | Yes for CD | Production database DSN | Backend runtime DB connection | GitHub Secrets |
| GitHub | `JWT_SECRET` | Repo secret | Yes for CD | Long random secret | Backend auth token signing | GitHub Secrets |
| GitHub | `MAIL_FROM` | Repo secret | Yes for production mail | Sender email identity | Outbound notifications | GitHub Secrets |
| GitHub | `APP_BASE_URL` | Repo secret | Yes | Public app URL, e.g. `https://yourdomain.com` | Email links and runtime base URL | GitHub Secrets |
| GitHub | `SMTP_HOST` | Repo secret | Yes for email | SMTP server host | Outbound mail transport | GitHub Secrets |
| GitHub | `SMTP_PORT` | Repo secret | Yes for email | e.g. `587` | SMTP port | GitHub Secrets |
| GitHub | `SMTP_SECURE` | Repo secret | Yes for email | `true` or `false` | TLS mode | GitHub Secrets |
| GitHub | `SMTP_USER` | Repo secret | Usually yes | SMTP username | Authenticated mail send | GitHub Secrets |
| GitHub | `SMTP_PASS` | Repo secret | Usually yes | SMTP password / app password | Authenticated mail send | GitHub Secrets |
| GitHub | `HEALTHCHECK_URL` | Repo secret | Yes for uptime workflow | e.g. `https://yourdomain.com/health` | Backend uptime probe | GitHub Secrets |
| GitHub | `FRONTEND_URL` | Repo secret | Recommended | e.g. `https://yourdomain.com` | Frontend uptime probe | GitHub Secrets |
| GitHub | `OPS_STATUS_URL` | Repo secret | Recommended | e.g. `https://yourdomain.com/ops/status` | Ops feed uptime probe | GitHub Secrets |
| GitHub | `SLACK_WEBHOOK_URL` | Repo secret | Recommended | Slack incoming webhook URL | Deployment and uptime alerts | GitHub Secrets |
| GHCR | `GITHUB_TOKEN` | Workflow token | Automatic | Built-in GitHub Actions token | Push images in CI/CD | GitHub Actions runtime |
| GHCR | `GHCR_TOKEN` | Local env | Recommended for local registry login | Personal access token with package access | Local developer GHCR login | PowerShell env / terminal session |
| GHCR | Registry host | Shared | Yes | `ghcr.io` | Container registry endpoint | Workflows + `scripts/ghcr-login.ps1` |
| VPS | Docker Engine | Server | Yes | Installed and working | Run backend/frontend containers | VPS OS |
| VPS | Docker Compose | Server | Yes | `docker compose` available | Production service orchestration | VPS OS |
| VPS | Deploy path | Server | Yes | `~/kingken` | Production app directory | CD workflow |
| VPS | Deploy history path | Server | Yes | `~/kingken/deploy-history` | Deployment and uptime audit data | CD + uptime workflows |
| VPS | Port exposure | Server | Yes | `80` frontend public, backend internal | Public app traffic | `ops/docker-compose.prod.yml` |
| SMTP | Sender identity | App | Yes | `MAIL_FROM` | Branded notification delivery | Backend runtime |
| SMTP | Auth mode | App | Yes | Host/port/secure/user/pass | Reliable outbound notifications | Backend runtime |
| Monitoring | Backend health URL | Public URL | Yes | `/health` | Backend uptime and deploy health | Backend + uptime workflow |
| Monitoring | Frontend URL | Public URL | Recommended | `/` | Frontend uptime | Uptime workflow |
| Monitoring | Public ops feed URL | Public URL | Recommended | `/ops/status` | Public machine-readable status | Backend route |
| Monitoring | Admin ops endpoint | Authenticated URL | Recommended | `/admin/ops/deployment-status` | Rich admin monitoring data | Backend route |
| Monitoring | Uptime threshold | Workflow env | Yes | `UPTIME_SLOW_THRESHOLD_MS=2000` | Slow vs healthy classification | `uptime-monitor.yml` |
| Monitoring | Degraded streak threshold | Workflow env | Yes | `UPTIME_DEGRADED_CONSECUTIVE_RUNS=3` | Noise-resistant degraded alerts | `uptime-monitor.yml` |
| VS Code | Workspace entrypoint | Local | Yes | `kingken-global.code-workspace` | Opens proper multi-root layout | Workspace file |
| VS Code | Git binary | Local | Yes | GitHub Desktop bundled Git path | Stable Git in editor | Workspace + `.vscode/settings.json` |
| VS Code | Default terminal | Local | Yes | `PowerShell + Git` | Consistent terminal environment | Workspace + `.vscode/settings.json` |
| VS Code | Automation terminal | Local | Recommended | PowerShell bootstrap script | Consistent task execution | Workspace + `.vscode/settings.json` |
| VS Code | Recommended extensions | Local | Recommended | PowerShell, Docker, GitHub Actions, Prisma, Dev Containers | Better productivity and validation | `.vscode/extensions.json` |
| VS Code | Backend debug | Local | Recommended | Attach on `9229` | Backend debugging | `.vscode/launch.json` |
| VS Code | Frontend debug | Local | Recommended | Edge launch on `5173` or `3000` | Browser debugging | `.vscode/launch.json` |
| Windows | PowerShell | Local OS | Yes | Windows PowerShell 5.1 works | Script/task execution | Windows install |
| Windows | Standalone Git for Windows | Local OS | Optional right now | Installed but should be repaired before use | Future system-wide Git path | Windows install |
| Browser | Default browser | Local OS | Recommended | Microsoft Edge on this machine | Matches debug launch defaults | Windows default apps |
| Browser | Chrome | Local OS | Optional | Installed | Alternative manual browser testing | Windows install |
| Container / Dev | Dev container base image | Local dev | Recommended | `mcr.microsoft.com/devcontainers/javascript-node:1-24-bookworm` | Reproducible dev environment | `.devcontainer/devcontainer.json` |
| Container / Dev | Forwarded ports | Local dev | Recommended | `3001`, `5173` | Backend/frontend access in container | `.devcontainer/devcontainer.json` |
| Container / Dev | Post-create bootstrap | Local dev | Recommended | install backend/frontend deps + Prisma generate | Faster first start | `.devcontainer/devcontainer.json` |
| Local app | `backend/.env` | Local dev | Yes | local placeholder values | Backend local runtime config | `backend/.env` |
| Local app | `frontend/.env.local` | Local dev | Yes | `VITE_API_BASE_URL=http://localhost:3001` | Frontend local API target | `frontend/.env.local` |

---

## Production values checklist

Use this checklist before production deployment:

- VPS is reachable over SSH
- Docker and Docker Compose are installed on the VPS
- GHCR package publishing is working in GitHub Actions
- All production GitHub secrets are set
- Public DNS resolves to the VPS
- `/health` responds successfully from production
- `/ops/status` responds successfully from production
- SMTP credentials are valid and tested
- Slack webhook is configured if alerts are desired

---

## Developer machine checklist

Use this checklist on a new machine:

- Open `kingken-global.code-workspace`
- Run `setup:bootstrap`
- Confirm Git works in VS Code terminal
- Confirm `backend/.env` and `frontend/.env.local` are correct
- Run `fullstack:build`
- Optionally reopen in dev container
- Optionally set `GHCR_TOKEN` and run `registry:login:ghcr`
- Launch `Full stack debug` if browser debugging is needed

---

## Monitoring URL reference

| Purpose | URL pattern | Notes |
| --- | --- | --- |
| Backend health | `https://yourdomain.com/health` | Required for uptime monitoring |
| Frontend uptime | `https://yourdomain.com/` | Recommended for uptime monitoring |
| Public ops status | `https://yourdomain.com/ops/status` | Recommended for ops monitoring |
| Admin deployment status | `https://yourdomain.com/admin/ops/deployment-status` | Requires authenticated admin token |

---

## Recommended operating baseline

### Keep using now

- current `main` branch as source of truth
- GitHub Desktop bundled Git inside VS Code
- Windows PowerShell 5.1 for this repo
- Edge-first debug profiles
- GHCR for image publishing
- GitHub Actions for CI/CD and uptime monitoring

### Upgrade later

- repair or reinstall standalone Git for Windows
- optionally move to PowerShell 7
- add a production secrets rotation schedule
- add a status trend dashboard over persisted uptime history
- add severity-based alert routing (warning vs urgent)

---

## Related documents

- `docs/WORKSPACE_SETUP.md`
- `README.md`
- `.github/workflows/cd.yml`
- `.github/workflows/uptime-monitor.yml`
- `ops/docker-compose.prod.yml`
