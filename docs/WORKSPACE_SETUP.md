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
