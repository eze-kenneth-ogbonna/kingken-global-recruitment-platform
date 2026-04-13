# Infrastructure Layer

This directory contains cloud infrastructure configuration, CI/CD pipeline definitions, containerization setup, and deployment orchestration for the Kingken Global Recruitment Platform.

---

## 🎯 Purpose

The infrastructure layer manages how the platform is built, deployed, scaled, and monitored across environments (development, staging, and production). It provides the foundation on which all application layers run.

---

## ☁️ Cloud Infrastructure

The platform is designed to run on AWS or GCP, using managed services where possible to minimize operational overhead:

- **Compute** — Containerized services running on Kubernetes (EKS / GKE)
- **Database** — Managed PostgreSQL (AWS RDS / Cloud SQL)
- **Storage** — Object storage for worker documents and assets (S3 / GCS)
- **CDN** — Content delivery for frontend assets (CloudFront / Cloud CDN)
- **Secrets Management** — AWS Secrets Manager / GCP Secret Manager

---

## 🔄 CI/CD Pipeline

All code changes go through an automated pipeline powered by GitHub Actions:

1. **Lint & Test** — Code quality checks and unit/integration tests run on every push
2. **Build** — Docker images are built and tagged with the commit SHA
3. **Push** — Images are pushed to the container registry (ECR / Artifact Registry)
4. **Deploy** — Kubernetes manifests are applied to the target environment
5. **Verify** — Health checks confirm successful deployment

See [`ops/ROLLOUT_CHECKLIST.md`](../ops/ROLLOUT_CHECKLIST.md) for the full pre-deployment checklist.

---

## 🏗 Key Folders

```
infrastructure/
├── docker/           # Dockerfiles and docker-compose configurations
├── k8s/              # Kubernetes manifests (deployments, services, ingress)
├── terraform/        # Infrastructure-as-code for cloud resource provisioning
├── ci/               # GitHub Actions workflow definitions
```

---

## 🛠 Tech Stack

See [`TECH_STACK.md`](./TECH_STACK.md) for a detailed reference of all planned technologies, versions, and rationale.

---

## 🔗 Related Directories

- [`backend/`](../backend/README.md) — Application services deployed by this infrastructure
- [`analytics/`](../analytics/README.md) — Analytics pipelines running on this infrastructure
- [`ops/`](../ops/ROLLOUT_CHECKLIST.md) — Operational runbooks and deployment checklists
