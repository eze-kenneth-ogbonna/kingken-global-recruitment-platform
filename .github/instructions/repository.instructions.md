# Repository Instructions

## Purpose

This file provides contribution guidelines and repository standards for the KingKen Global Recruitment Platform.

## Documentation Standards

- Use Markdown (`.md`) for all documentation files.
- Place module-level documentation in the relevant module directory (e.g., `03-crm/README.md`).
- Keep documentation up to date with code changes.

## Contribution Workflow

1. Fork the repository and create a feature branch from `main`.
2. Follow the naming convention: `feature/<short-description>`, `fix/<short-description>`, or `docs/<short-description>`.
3. Make focused, atomic commits with clear messages following Conventional Commits format (`feat:`, `fix:`, `docs:`, `chore:`, etc.).
4. Open a pull request against `main` and fill out the pull request template completely.
5. Ensure all CI checks pass before requesting a review.

## Pull Request Checklist

- [ ] Code follows the project style guide (see `CONTRIBUTING.md`).
- [ ] Relevant tests have been added or updated.
- [ ] Documentation has been updated to reflect the changes.
- [ ] All CI checks pass.
- [ ] The PR description clearly explains the motivation and approach.

## Naming Conventions

- Directories: lowercase with hyphens (e.g., `03-crm/`, `04-ai-system/`).
- Files: lowercase with hyphens for documentation; follow language conventions for source files.
- Google Apps Script (`.gs`): use `const`/`let` instead of `var`.

## Repository Structure

```
kingken-global-recruitment-platform/
├── 03-crm/          # CRM service
├── 04-ai-system/    # AI system service
├── 05-saas-platform/# SaaS platform service
├── 06-design/       # Design assets
├── .github/         # GitHub configuration (workflows, templates, instructions)
└── ops/             # Operations and deployment checklists
```
