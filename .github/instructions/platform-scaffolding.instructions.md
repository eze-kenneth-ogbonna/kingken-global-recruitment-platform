## Repository Instructions: Platform Structure and Documentation

Use this repository structure consistently and keep changes aligned with the platform's modular architecture.

---

## Platform Scaffolding

Maintain clear separation of concerns across the core platform directories:

* `03-crm/` for CRM system structure, schemas, and workflows
* `04-ai-system/` for AI automation and intelligence components
* `05-saas-platform/` for SaaS architecture and platform model assets
* `06-design/` for UI/UX and design system documentation

When adding new files or features, place them in the directory that matches their functional responsibility. Do not mix CRM, AI, SaaS, and design concerns in the same module unless the integration is explicitly documented.

---

## Documentation

Keep README files present and up to date across major modules.

Standardize documentation format for consistency, and document system roles, workflows, and architectural responsibilities clearly. Update module documentation whenever behavior, ownership, interfaces, or structure changes.

---

## Issue Templates

Use structured issue templates for repository workflow:

* 🐛 Bug reports
* ✨ Feature requests

Preserve template structure so issues remain clear, actionable, and easy to triage.

---

## Architecture Documentation

Keep `ARCHITECTURE.md` aligned with the current implementation.

Document:

* overall system architecture
* platform layers such as Frontend, Backend, Database, AI, and SaaS
* system interactions and data flow
* deployment considerations, including scalability and multi-region support where applicable

Update `ARCHITECTURE.md` whenever platform layers, cross-system integrations, or major data flows change.

---

## Expected Outcome

Follow these instructions to maintain a production-ready repository structure, improve onboarding and collaboration, and keep the project aligned with scalable SaaS architecture standards.
