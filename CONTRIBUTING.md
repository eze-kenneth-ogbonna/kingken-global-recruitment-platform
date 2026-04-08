# Contributing to Kingken Global Recruitment Platform

Thank you for contributing to the Kingken Global Recruitment Platform. This guide covers everything you need to know to contribute effectively.

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Branch Naming Convention](#2-branch-naming-convention)
3. [Pull Request Process](#3-pull-request-process)
4. [Code Style](#4-code-style)
5. [Issue Reporting](#5-issue-reporting)
6. [Documentation Standards](#6-documentation-standards)
7. [Security](#7-security)

---

## 1. Getting Started

### Who Can Contribute

- **Internal team members** (Tech, Operations, Recruitment): Full contribution rights
- **Trusted partners**: Contributions welcome with prior approval
- **External developers** (Phase 2+): Open-source contributions will be enabled

### Setup

1. Fork or clone the repository (internal team members clone directly)
2. Create a new branch from `main` following the branch naming convention below
3. Make your changes
4. Test thoroughly using [ops/TESTING_GUIDE.md](ops/TESTING_GUIDE.md)
5. Submit a pull request

---

## 2. Branch Naming Convention

All branches must follow this naming pattern:

| Type | Pattern | Example |
|------|---------|---------|
| New feature | `feature/short-description` | `feature/add-resume-parser` |
| Bug fix | `fix/short-description` | `fix/phone-normalization-bug` |
| Documentation | `docs/short-description` | `docs/update-zapier-guide` |
| Operations/Infra | `ops/short-description` | `ops/update-rollout-checklist` |
| Hotfix (urgent) | `hotfix/short-description` | `hotfix/zap01-broken-trigger` |
| Release | `release/version` | `release/v1.1.0` |

**Rules:**
- Use lowercase letters and hyphens only
- Keep description concise (2–4 words)
- Never commit directly to `main` or `develop`

---

## 3. Pull Request Process

### Before Submitting

- [ ] Run through the relevant testing steps in [ops/TESTING_GUIDE.md](ops/TESTING_GUIDE.md)
- [ ] Update relevant documentation if your change affects setup or behavior
- [ ] Ensure no API keys, passwords, or secrets are in your commits
- [ ] Verify your branch is up to date with `main`

### PR Title Format

```
[Type] Short description of change

Examples:
[Feature] Add AI job matching endpoint
[Fix] Normalize phone numbers with missing country code
[Docs] Update Zapier automation guide for Zap 03
[Ops] Add WATI bot keyword triggers
```

### PR Description

Fill out the PR template completely (`.github/PULL_REQUEST_TEMPLATE.md`). Include:
- What was changed and why
- Type of change (feature / fix / docs / ops)
- How it was tested
- Any breaking changes

### Review Process

1. At least **one reviewer** must approve before merging (Tech Lead or COO)
2. CI checks must pass (markdown lint, no secrets detected)
3. All review comments must be resolved
4. Merge using **Squash and merge** for clean history

---

## 4. Code Style

### Google Apps Script (`.gs` files)

- Use `const` and `let` (not `var`)
- All functions must have a descriptive comment header
- Error handling with `try/catch` blocks on all external API calls
- Log actions with `Logger.log()` for debugging
- Use `SpreadsheetApp.flush()` after batch writes
- Store API keys in Script Properties, not hardcoded

```javascript
// ✅ Good
function migrateFormResponsesToMaster() {
  try {
    const ss = SpreadsheetApp.getActive();
    const sheet = ss.getSheetByName('Master Data');
    if (!sheet) {
      throw new Error('Master Data sheet not found');
    }
    // ... logic
    SpreadsheetApp.flush();
    Logger.log('Migration complete');
  } catch (e) {
    Logger.log('Error: ' + e.message);
    SpreadsheetApp.getUi().alert('Error: ' + e.message);
  }
}

// ❌ Bad
function migrate() {
  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getSheetByName('Master Data')
  // No error handling, no logging
}
```

### Markdown Files

- Use `##` for main sections, `###` for subsections
- Use tables for structured data (column specs, tool comparisons)
- Use code blocks with language hints for all code samples
- Use task list checkboxes (`- [ ]`) for checklists
- Include a table of contents for files longer than 100 lines
- All files must start with a `# Title` heading

### Zapier Guide Files (`.md`)

Each Zap documentation file must include:
- Zap name and purpose
- Trigger configuration (exact fields)
- Each action with field mapping
- Test instructions
- Common errors and fixes

---

## 5. Issue Reporting

Use the appropriate issue template:

| Template | Use When |
|----------|----------|
| `bug_report.md` | Something is broken or not working as expected |
| `feature_request.md` | Requesting a new feature or enhancement |
| `candidate_issue.md` | Reporting a data quality problem with a candidate record |

### Issue Labels

| Label | Meaning |
|-------|---------|
| `bug` | Confirmed bug |
| `feature` | New feature request |
| `docs` | Documentation improvement |
| `data-quality` | Candidate/employer data issue |
| `urgent` | Needs immediate attention |
| `ops` | Operations/process issue |

---

## 6. Documentation Standards

Every documentation file must:

1. **Start with a title and metadata block** (Version, Last Updated)
2. **Include a table of contents** for files > 100 lines
3. **Be complete** — no "TODO", "Coming soon", or placeholder text
4. **Use consistent terminology:**
   - `Master Data` (not "master data" or "Master Sheet")
   - `CandidateID` (not "candidate ID" or "id")
   - `Kingken Global` (not "Kingken" alone)
   - `WATI` (not "wati" or "Wati")
5. **Reference related files** using relative paths

---

## 7. Security

- **Never commit** API keys, passwords, or secrets
- **Never commit** real candidate PII to the repository
- **Never commit** the `.env` file (it's in `.gitignore`)
- Store all secrets in `.env` locally or in GitHub Secrets for CI
- Review [SECURITY.md](SECURITY.md) for the full security policy
- If you discover a security vulnerability, report it privately per [SECURITY.md](SECURITY.md)

---

Questions? Contact the Tech Lead via the **Kingken Tech** WhatsApp group or email [info@kingkenglobal.com.ng](mailto:info@kingkenglobal.com.ng).
