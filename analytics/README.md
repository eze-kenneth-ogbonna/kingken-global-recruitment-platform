# Analytics Layer

This directory contains data analytics, dashboard configurations, reporting pipelines, and recruitment metrics tooling for the Kingken Global Recruitment Platform.

---

## 🎯 Purpose

The analytics layer provides visibility into platform performance, workforce trends, and recruitment outcomes. It enables data-driven decisions for both the internal team and, where appropriate, for employers and workers through self-service reporting.

---

## 📊 Analytics Scope

### Recruitment Metrics
- Job fill rates and time-to-hire across different regions and industries
- Application funnel conversion rates (applied → shortlisted → hired)
- Worker placement success rates by destination country

### Job Match Rates
- AI matching accuracy and score distributions
- Employer acceptance rates per match recommendation
- Worker profile completeness scores and their impact on match rate

### Regional Talent Pools
- Geographic distribution of registered workers by skill set
- Supply/demand gaps for specific roles in target markets (Kuwait, Europe, etc.)
- Worker readiness metrics (document completion, verification status)

### Employer Satisfaction
- Employer retention and repeat-hire rates
- Job posting engagement metrics
- Employer NPS (Net Promoter Score) tracking

---

## 🏗 Key Folders

```
analytics/
├── dashboards/       # Dashboard definitions and configuration files
├── reports/          # Scheduled and on-demand report templates
├── pipelines/        # Data transformation and aggregation pipeline scripts
```

---

## 🛠 Tech Stack

| Technology | Role |
|---|---|
| PostgreSQL (read replicas) | Analytics queries without impacting the production database |
| Metabase | Internal BI dashboards and ad-hoc querying |
| dbt | Data transformation pipelines and metric definitions |

---

## 🔗 Related Directories

- [`database/`](../database/README.md) — Source data models consumed by analytics pipelines
- [`infrastructure/`](../infrastructure/README.md) — Infrastructure for running analytics workloads
- [`backend/`](../backend/README.md) — Backend services that emit events and metrics
