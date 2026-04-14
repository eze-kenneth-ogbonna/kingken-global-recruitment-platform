# Workspace Setup

Use this guide to open the project correctly in VS Code, bootstrap local dependencies, use the dev container, and log in to GitHub Container Registry (GHCR).

## Open the workspace

Open `kingken-global.code-workspace` in VS Code.

This workspace includes:

- `Platform` — repository root for `.github`, `ops`, `scripts`, and docs
- `Backend` — API service
- `Frontend` — Vite app

## Recommended VS Code extensions

The workspace recommends:

- PowerShell
- Docker
- GitHub Actions
- Prisma
- Dev Containers

These are defined in `.vscode/extensions.json`.

## Baseline advice for this machine

- **Git:** VS Code is pinned to the working Git binary bundled with GitHub Desktop.
- **Standalone Git for Windows:** `C:\Program Files\Git\cmd\git.exe` exists on this machine but did not execute cleanly during audit, so it should not be the active VS Code Git path until reinstalled or repaired.
- **PowerShell:** Windows PowerShell 5.1 is installed and usable. PowerShell 7 is a nice future upgrade, but not required for this repo.
- **Browser:** Microsoft Edge is the default browser on this machine, so frontend debug launch configurations are Edge-first.

## Bootstrap with PowerShell

Run the VS Code task:

- `setup:bootstrap`

Or run the script directly:

- `scripts/dev-setup.ps1`

This installs backend and frontend dependencies and generates the Prisma client.

## Local environment files

Local placeholders are provided for:

- `backend/.env`
- `frontend/.env.local`

Update them before running the app locally.

## Use the dev container

The repository includes `.devcontainer/devcontainer.json`.

In VS Code:

1. Open the command palette
2. Run `Dev Containers: Reopen in Container`

The container uses Node 24 and forwards:

- `3001` for backend
- `5173` for frontend

## Connect to GHCR

Set a token in your terminal session:

- PowerShell: `$env:GHCR_TOKEN="<your-ghcr-token>"`

Then run the VS Code task:

- `registry:login:ghcr`

Or run:

- `scripts/ghcr-login.ps1`

## GitHub repository baseline (manual settings)

These should be configured in GitHub repository settings:

- protect `main`
- require pull request review before merge
- require status checks before merge
- keep Actions permissions set so workflows can read contents and publish packages when needed
- configure repository secrets for deploy and monitoring:
  - `VPS_HOST`
  - `VPS_USER`
  - `VPS_SSH_KEY`
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `MAIL_FROM`
  - `APP_BASE_URL`
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_SECURE`
  - `SMTP_USER`
  - `SMTP_PASS`
  - `HEALTHCHECK_URL`
  - `FRONTEND_URL`
  - `OPS_STATUS_URL`
  - `SLACK_WEBHOOK_URL` (optional but recommended)

## Useful tasks

- `backend:build`
- `frontend:build`
- `fullstack:build`
- `backend:dev`
- `frontend:dev`
- `fullstack:dev`
- `container:build:backend`
- `container:build:frontend`

## My advice for cleanup and version control

For this repo, the safest path is:

1. Treat the current `main` branch as the source of truth
2. Do **not** resurrect older invalid workflow snapshots
3. Keep cleanup commits small and focused
4. If you later want a cleaner history, squash on a PR branch — not by rewriting already-pushed operational fixes on `main`

That preserves deployment history while still letting you keep future changes tidy.
