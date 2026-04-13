# Contributing to KingKen Global Recruitment Platform

Thank you for your interest in contributing to the KingKen Global Recruitment Platform! This document covers local setup, how to find good first issues, and our branching and PR conventions.

---

## 📋 Table of Contents

- [Quick Start — Local Setup](#-quick-start--local-setup)
- [Troubleshooting](#-troubleshooting)
- [Good First Issues](#-good-first-issues)
- [Branching Strategy](#branching-strategy)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Review Guidelines](#code-review-guidelines)
- [Development Workflow](#development-workflow)

---

## 🚀 Quick Start — Local Setup

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/<your-username>/kingken-global-recruitment-platform.git
cd kingken-global-recruitment-platform

# 2. Add the upstream remote
git remote add upstream https://github.com/eze-kenneth-ogbonna/kingken-global-recruitment-platform.git

# 3. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 4. Set up the backend environment
cp ops/.env.deploy.example backend/.env
# Edit backend/.env — set DATABASE_URL=file:./prisma/dev.db at minimum

# 5. Run database migrations
cd backend && npx prisma migrate dev

# 6. Start the dev servers (two separate terminals)
cd backend && npm run dev      # → http://localhost:3001
cd frontend && npm run dev     # → http://localhost:5173
```

**SQLite constraint:** the backend runs SQLite. Do not add `Json` field types or `enum` blocks to `prisma/schema.prisma` — SQLite does not support them.

---

## 🛠 Troubleshooting

If setup fails locally, try these quick fixes before opening an issue.

### Node version mismatch

- Verify your Node.js version matches project/CI expectations.
- If you use nvm, switch to the project version, then reinstall dependencies.
- Re-run installs in both `backend` and `frontend` after switching Node versions.

### npm install failures

- Delete `node_modules` and reinstall dependencies.
- Ensure lockfiles are committed and in sync with `package.json`.
- Retry with a clean install if dependency resolution fails.

### Prisma/database path issues

- Confirm `backend/.env` exists and includes `DATABASE_URL=file:./prisma/dev.db`.
- Run Prisma migration commands from the `backend` directory.
- If DB path errors persist, verify relative paths resolve from `backend/`.

---

## 🌱 Good First Issues

New to the codebase? Start here:

👉 **[Browse `good first issue` labels](https://github.com/eze-kenneth-ogbonna/kingken-global-recruitment-platform/labels/good%20first%20issue)**
👉 **[Browse `help wanted` labels](https://github.com/eze-kenneth-ogbonna/kingken-global-recruitment-platform/labels/help%20wanted)**

These issues are:

- Small in scope (usually one file or component)
- Self-contained with clear acceptance criteria
- A great way to learn the codebase without deep context

**How to claim an issue:** Comment on it before starting — say "I'd like to work on this." This avoids duplicated effort.

---

---

## 🌿 Branching Strategy

We follow a **GitFlow-style** branching model:

```
feature/* ---> develop ---> staging ---> main (tagged release)
hotfix/*  ---> main (+ back-merge to develop)
release/* ---> staging ---> main
docs/*    ---> develop
chore/*   ---> develop
```

### Branch Descriptions

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code only. Never commit directly. |
| `staging` | Pre-production QA and testing before merging to `main`. |
| `develop` | Active integration branch. All features and fixes merge here first. |
| `feature/*` | New features and enhancements. Branch from `develop`. |
| `fix/*` | Bug fixes. Branch from `develop`. |
| `hotfix/*` | Urgent production patches. Branch from `main`, merge back to both `main` and `develop`. |
| `release/*` | Release candidates. Branch from `develop`, merge to `staging` then `main`. |
| `docs/*` | Documentation-only changes. Branch from `develop`. |
| `chore/*` | Maintenance tasks. Branch from `develop`. |

---

## 🏷️ Branch Naming Conventions

All branch names must follow this pattern:

```
<type>/<short-description>
```

**Rules:**

- Use lowercase letters only
- Use hyphens `-` to separate words
- Be concise but descriptive

**Examples:**

```
feature/employer-portal
feature/ai-job-matching
fix/login-redirect-error
hotfix/payment-gateway-crash
release/v1.0.0
docs/api-documentation
chore/update-dependencies
```

---

## 💬 Commit Message Guidelines

We follow the **Conventional Commits** specification:

```
<type>(optional scope): <short description>
```

### Commit Types

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting changes (no logic change) |
| `refactor` | Code restructuring without feature/fix |
| `test` | Adding or updating tests |
| `chore` | Build process, dependency updates, CI config |
| `hotfix` | Urgent production fix |

### Examples

```
feat(employer-portal): add employer registration form
fix(auth): resolve JWT token expiry issue
docs(readme): update development setup instructions
chore(ci): add security scan to GitHub Actions workflow
```

---

## 🔄 Pull Request Process

1. Create a branch from the appropriate base branch
2. Make your changes with clear, focused commits
3. Push your branch and open a Pull Request
4. Fill out the PR template completely
5. Request a review from at least one team member
6. Address review feedback and resolve all conversations
7. Merge only after approval and all CI checks pass

### PR Targets

| Your Branch | Merge Into |
|-------------|------------|
| `feature/*` | `develop` |
| `fix/*` | `develop` |
| `docs/*` | `develop` |
| `chore/*` | `develop` |
| `release/*` | `staging` |
| `hotfix/*` | `main` AND `develop` |
| `develop` | `staging` |
| `staging` | `main` |

---

## 👀 Code Review Guidelines

**As a reviewer:**

- Review within 24 hours of being assigned
- Be constructive and specific in feedback
- Approve only when genuinely satisfied

**As an author:**

- Keep PRs small and focused
- Respond to all comments
- Do not merge your own PR without review

---

## 🚀 Development Workflow

```bash
# 1. Start a new feature
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# 2. Make changes and commit
git add .
git commit -m "feat(scope): your descriptive message"

# 3. Push and open PR
git push origin feature/your-feature-name

# 4. After merge, clean up
git checkout develop
git pull origin develop
git branch -d feature/your-feature-name
```

---

## 📞 Contact

For questions, open a [GitHub Discussion](https://github.com/eze-kenneth-ogbonna/kingken-global-recruitment-platform/discussions) or email **<info@kingkenglobal.com.ng>**.

---

*KingKen Global Travel Agency Ltd — Connecting African Talent with Global Employers*
