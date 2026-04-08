# Kingken Global Recruitment Platform — Wireframe Guide

> **Company:** Kingken Global Travel Agency Ltd
> **Website:** https://www.kingkenglobal.com.ng | **Email:** info@kingkenglobal.com.ng

---

## 1. Figma File Structure

Create the Figma file at [figma.com](https://figma.com) with the following organization:

**File Name:** `Kingken Global Platform — UI/UX Design`

### 7 Figma Pages

| Page # | Page Name | Contents |
|--------|-----------|---------|
| 1 | Landing Page | Public marketing website wireframes |
| 2 | Worker Dashboard | Portal for registered workers |
| 3 | Employer Dashboard | Portal for hiring companies |
| 4 | Admin Panel | Internal team management view |
| 5 | Job Application Form | Multi-step worker application flow |
| 6 | Payment Page | Employer payment and invoicing page |
| 7 | Mobile App | Mobile-first responsive layouts |

### Figma Setup Steps

1. Go to [figma.com](https://figma.com) and create a free account.
2. Click **New Design File**.
3. Rename the file: `Kingken Global Platform — UI/UX Design`.
4. Create 7 pages using the page panel on the left (click `+` next to Pages).
5. Name each page as listed above.
6. Set canvas to `Desktop` (1440 x 900px) for web pages.
7. Set canvas to `Mobile` (390 x 844px) for mobile views.

---

## 2. Design System

All screens use a consistent design system defined here.

### Color Palette

| Name | Hex Code | Usage |
|------|----------|-------|
| Primary — Dark Navy | `#1a1a2e` | Primary backgrounds, headers, navbar |
| Accent — Red | `#e94560` | CTA buttons, highlights, urgent badges |
| Success — Deep Blue | `#0f3460` | Secondary buttons, approved badges, links |
| Light Background | `#f5f5f5` | Page backgrounds, card backgrounds |
| White | `#ffffff` | Cards, text on dark, form fields |
| Text Dark | `#1a1a1a` | Main body text |
| Text Medium | `#555555` | Secondary text, labels |
| Text Light | `#888888` | Placeholder text, timestamps |
| Success Green | `#4CAF50` | Approved status, success messages |
| Warning Yellow | `#FFC107` | Pending status, warnings |
| Error Red | `#f44336` | Error states, rejected status |
| Border | `#e0e0e0` | Card borders, input borders |

### Typography

| Style | Font | Weight | Size |
|-------|------|--------|------|
| H1 — Page Title | Inter or Roboto | 700 (Bold) | 48px |
| H2 — Section Title | Inter or Roboto | 700 (Bold) | 36px |
| H3 — Card Title | Inter or Roboto | 600 (SemiBold) | 24px |
| H4 — Subsection | Inter or Roboto | 600 (SemiBold) | 20px |
| Body Large | Inter or Roboto | 400 (Regular) | 18px |
| Body | Inter or Roboto | 400 (Regular) | 16px |
| Body Small | Inter or Roboto | 400 (Regular) | 14px |
| Label | Inter or Roboto | 500 (Medium) | 12px |
| Button Text | Inter or Roboto | 600 (SemiBold) | 16px |

### Spacing Scale

```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px
```

### Border Radius

| Element | Radius |
|---------|--------|
| Buttons | 8px |
| Cards | 12px |
| Input fields | 8px |
| Badges/Pills | 20px (fully rounded) |
| Modal windows | 16px |

---

## 3. Landing Page Wireframe (Page 1)

```
┌────────────────────────────────────────────────────────────────────┐
│ NAVIGATION BAR (sticky, navy #1a1a2e)                              │
│ [🌍 KINGKEN GLOBAL]    Home | About | Workers | Employers | Jobs   │
│                                           [APPLY NOW] [HIRE NOW]   │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ HERO SECTION (full-width, dark overlay on background image)        │
│                                                                    │
│          ┌───────────────────────────────────────┐                 │
│          │  Connecting Africa's Best Talent       │                 │
│          │  with Gulf Opportunities               │                 │
│          │                                        │                 │
│          │  Kuwait • UAE • Qatar                  │                 │
│          │  Nigeria • Ghana • Kenya • Ethiopia    │                 │
│          │                                        │                 │
│          │  [  Apply for a Job  ]  [  Hire Now  ] │                 │
│          └───────────────────────────────────────┘                 │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ STATS BAR (white background, 4 columns)                            │
│                                                                    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────┐  │
│  │   500+       │ │   50+        │ │   3          │ │   8      │  │
│  │   Workers    │ │   Employers  │ │   Gulf       │ │   African│  │
│  │   Placed     │ │   Served     │ │   Countries  │ │   Nations│  │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────┘  │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ HOW IT WORKS (light grey background)                               │
│                                                                    │
│  For Workers:                                                      │
│  [Step 1: Apply] → [Step 2: Get Screened] → [Step 3: Get Deployed] │
│      📝               🔍                       ✈️                  │
│                                                                    │
│  For Employers:                                                    │
│  [Step 1: Register] → [Step 2: Get Matched] → [Step 3: Hire]      │
│      📋                  👥                      ✅                 │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ TESTIMONIALS (white background, 3-column grid)                     │
│                                                                    │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐          │
│  │ ⭐⭐⭐⭐⭐         │ │ ⭐⭐⭐⭐⭐         │ │ ⭐⭐⭐⭐⭐         │          │
│  │ "Kingken       │ │ "We hired 5    │ │ "Applied Mon,  │          │
│  │  changed my    │ │  workers all   │ │  deployed in   │          │
│  │  life..."      │ │  excellent..." │ │  10 weeks..."  │          │
│  │ — Adaeze O.   │ │ — Mohammed    │ │ — Samuel A.   │          │
│  │   Nigeria     │ │   Kuwait      │ │   Ghana       │          │
│  └────────────────┘ └────────────────┘ └────────────────┘          │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ FEATURED JOBS (navy background)                                    │
│  "Currently Hiring"                                                │
│                                                                    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐               │
│  │ 🏠 Domestic  │ │ 🚗 Driver    │ │ 🛡 Security  │               │
│  │ Worker       │ │ UAE — Dubai  │ │ Guard Qatar  │               │
│  │ Kuwait       │ │ $400–550/mo  │ │ $350–500/mo  │               │
│  │ $300–450/mo  │ │              │ │              │               │
│  │ [Apply Now]  │ │ [Apply Now]  │ │ [Apply Now]  │               │
│  └──────────────┘ └──────────────┘ └──────────────┘               │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ CALL TO ACTION BANNER (accent red #e94560)                         │
│                                                                    │
│          Ready to Build Your Future Abroad?                        │
│     [ Apply for a Job Today ]    [ Hire African Workers ]          │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ FOOTER (dark navy)                                                 │
│  Logo  |  Links  |  Contact  |  Social Media Icons                │
│  © 2024 Kingken Global Travel Agency Ltd                          │
└────────────────────────────────────────────────────────────────────┘

[WhatsApp Floating Button — bottom right corner — green]
```

---

## 4. Worker Dashboard Wireframe (Page 2)

```
┌────────────────────────────────────────────────────────────────────┐
│ TOP NAV (navy) [Kingken Global Logo]  [Notifications 🔔] [Profile] │
└────────────────────────────────────────────────────────────────────┘

┌──────────────────┐ ┌──────────────────────────────────────────────┐
│  SIDEBAR NAV     │ │  MAIN CONTENT AREA                           │
│                  │ │                                              │
│  👤 My Profile   │ │  ┌────────────────────────────────────────┐  │
│  📋 My Status    │ │  │  APPLICATION STATUS CARD                │  │
│  💼 Job Matches  │ │  │  Name: Amara Osei                       │  │
│  📂 Documents    │ │  │  Position: Domestic Worker              │  │
│  📞 Contact Us   │ │  │  Status: ████ SCREENED ████             │  │
│  ❓ FAQ          │ │  │  AI Score: 78/100                       │  │
│  🚪 Logout       │ │  │  Next Step: Document Collection         │  │
│                  │ │  │  Recruiter: Sarah O. (+96569048174)     │  │
│                  │ │  └────────────────────────────────────────┘  │
│                  │ │                                              │
│                  │ │  ┌────────────────────────────────────────┐  │
│                  │ │  │  JOB MATCHES                           │  │
│                  │ │  │  ┌─────────────────────────────────┐   │  │
│                  │ │  │  │ 🏠 Domestic Worker — Kuwait      │   │  │
│                  │ │  │  │ Salary: $350/mo | Status: Open   │   │  │
│                  │ │  │  │ [Express Interest]               │   │  │
│                  │ │  │  └─────────────────────────────────┘   │  │
│                  │ │  └────────────────────────────────────────┘  │
│                  │ │                                              │
│                  │ │  ┌────────────────────────────────────────┐  │
│                  │ │  │  MY DOCUMENTS                          │  │
│                  │ │  │  ✅ CV / Resume          [Uploaded]    │  │
│                  │ │  │  ❌ Passport Copy        [Upload Now]  │  │
│                  │ │  │  ❌ Medical Certificate  [Upload Now]  │  │
│                  │ │  │  ❌ Passport Photos      [Upload Now]  │  │
│                  │ │  └────────────────────────────────────────┘  │
└──────────────────┘ └──────────────────────────────────────────────┘
```

---

## 5. Employer Dashboard Wireframe (Page 3)

```
┌────────────────────────────────────────────────────────────────────┐
│ TOP NAV (navy) [Kingken Global Logo]  [+ Post New Job] [Profile]   │
└────────────────────────────────────────────────────────────────────┘

┌──────────────────┐ ┌──────────────────────────────────────────────┐
│  SIDEBAR NAV     │ │  DASHBOARD OVERVIEW                          │
│                  │ │  ┌──────────┐ ┌──────────┐ ┌──────────────┐  │
│  📊 Dashboard    │ │  │  3       │ │  12      │ │  2           │  │
│  💼 My Jobs      │ │  │ Active   │ │ Candidates│ │ Interviews   │  │
│  👥 Candidates   │ │  │ Job Req  │ │ Submitted│ │ Scheduled    │  │
│  📈 Pipeline     │ │  └──────────┘ └──────────┘ └──────────────┘  │
│  💳 Payments     │ │                                              │
│  📞 Contact COO  │ │  ┌────────────────────────────────────────┐  │
│  🚪 Logout       │ │  │  ACTIVE JOB REQUESTS                   │  │
│                  │ │  │  JOB-0008: 5x Domestic Worker (Kuwait) │  │
│                  │ │  │  Status: Matching | 3 candidates found  │  │
│                  │ │  │  [View Candidates] [Update Job]         │  │
│                  │ │  │                                         │  │
│                  │ │  │  JOB-0009: 2x Driver (Dubai, UAE)       │  │
│                  │ │  │  Status: Interview | 2 shortlisted      │  │
│                  │ │  │  [View Shortlist] [Schedule Interview]  │  │
│                  │ │  └────────────────────────────────────────┘  │
│                  │ │                                              │
│                  │ │  ┌────────────────────────────────────────┐  │
│                  │ │  │  PAYMENT STATUS                        │  │
│                  │ │  │  DEAL-0015: $7,500 | ⚠️ Due: $3,750    │  │
│                  │ │  │  [Pay Now] [View Invoice]              │  │
│                  │ │  └────────────────────────────────────────┘  │
└──────────────────┘ └──────────────────────────────────────────────┘
```

---

## 6. Admin Panel Wireframe (Page 4)

```
┌────────────────────────────────────────────────────────────────────┐
│ ADMIN TOP BAR (navy)  KINGKEN GLOBAL ADMIN  [👤 COO Name] [Logout]  │
└────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  KPI DASHBOARD ROW                                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │ 247      │ │ 18       │ │ 12       │ │ $28,500  │ │ 73     │ │
│  │ Total    │ │ Employers│ │ Open Jobs│ │ Total    │ │ Avg AI │ │
│  │Candidates│ │ Active   │ │          │ │ Revenue  │ │ Score  │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └────────┘ │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────┐ ┌──────────────────────────────────────────────┐
│  LEFT MENU       │ │  MAIN TABLE — CANDIDATES                     │
│                  │ │  [Search...] [Filter: Status ▼] [Export CSV] │
│  📊 Dashboard    │ │                                              │
│  👤 Candidates   │ │  ID     │ Name     │Country│ Position│Score│St│
│  🏢 Employers    │ │  ───────┼──────────┼───────┼─────────┼─────┼──│
│  💼 Job Requests │ │  C-0001 │ Amara O. │Nigeria│ Dom Work│ 78  │✅│
│  📈 Pipeline     │ │  C-0002 │ Samuel A.│ Ghana │ Driver  │ 85  │✅│
│  💰 Deals        │ │  C-0003 │ Grace N. │ Kenya │ Nanny   │ 55  │⚠️│
│  ✅ Tasks        │ │  C-0004 │ John K.  │Ethiopia│Security│ 32  │❌│
│  ⚙️ Settings     │ │  ...    │ ...      │ ...   │ ...     │ ... │..│
│                  │ │                                              │
│                  │ │  [← Prev]   Page 1 of 25   [Next →]         │
└──────────────────┘ └──────────────────────────────────────────────┘

Status Legend: ✅ Approved  ⚠️ Screened/Pending  ❌ Rejected  🔵 New
```

---

## 7. Job Application Form Wireframe (Page 5)

```
┌─────────────────────────────────────────────────────────┐
│  KINGKEN GLOBAL — JOB APPLICATION                       │
│  Step 2 of 4  [■■□□]                                   │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Step 2: Your Experience                          │  │
│  │                                                   │  │
│  │  Position Applying For *                          │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │ Domestic Worker                          ▼  │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │                                                   │  │
│  │  Years of Experience *                            │  │
│  │  ○ Less than 1 year                              │  │
│  │  ● 3–5 years                                     │  │
│  │  ○ 5+ years                                      │  │
│  │                                                   │  │
│  │  Is your passport available? *                    │  │
│  │  ● Yes — Valid                                   │  │
│  │  ○ Yes — Expired                                 │  │
│  │  ○ No — Not yet                                  │  │
│  │                                                   │  │
│  │              [← Back]  [Next Step →]              │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 8. Payment Page Wireframe (Page 6)

```
┌──────────────────────────────────────────────────────────────┐
│  EMPLOYER PAYMENT                                            │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Invoice Summary                                       │  │
│  │  ─────────────────────────────────────────────────── │  │
│  │  Company: Al Noor Services LLC                        │  │
│  │  Deal: DEAL-0015 | 5x Domestic Workers Kuwait         │  │
│  │  Total Service Fee: $7,500                            │  │
│  │  Amount Paid: $3,750 (50% deposit)                    │  │
│  │  ─────────────────────────────────────────────────── │  │
│  │  AMOUNT DUE: $3,750                                   │  │
│  │  Due Date: 01/03/2024                                 │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Payment Method                                        │  │
│  │  ● Bank Transfer (USD)                                 │  │
│  │  ○ Credit/Debit Card                                   │  │
│  │  ○ Western Union                                       │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  Bank Details (if Bank Transfer selected):                   │
│  Bank: Zenith Bank | Account: XXXX | SWIFT: XXXXXX          │
│                                                              │
│  [Download Invoice PDF]    [I Have Paid — Send Proof]        │
└──────────────────────────────────────────────────────────────┘
```

---

## 9. Mobile App Wireframe (Page 7)

```
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│  LANDING (Mobile)│   │ WORKER HOME      │   │  JOB LIST        │
│                  │   │                  │   │                  │
│  [🌍 Logo]       │   │  Hello, Amara!   │   │  ← Jobs         │
│                  │   │  ───────────── │   │                  │
│  Find Work       │   │  Status:         │   │  🏠 Domestic     │
│  in the Gulf     │   │  ████SCREENED██  │   │  Worker — Kuwait │
│                  │   │                  │   │  $350/month      │
│  [Apply Now]     │   │  AI Score: 78    │   │  [Apply]         │
│                  │   │  ─────────────── │   │  ──────────────  │
│  ────────────── │   │  📋 My Docs      │   │  🚗 Driver        │
│                  │   │  ✅ CV           │   │  Dubai, UAE      │
│  [Hire Workers]  │   │  ❌ Passport     │   │  $450/month      │
│                  │   │  ❌ Medical      │   │  [Apply]         │
│  ──────────────  │   │  ─────────────── │   │  ──────────────  │
│  💬 WhatsApp Us  │   │  [Contact Team]  │   │  🛡 Security     │
│  +96569048174    │   │                  │   │  Qatar           │
│                  │   │  [WhatsApp Bot]  │   │  $400/month      │
└──────────────────┘   └──────────────────┘   └──────────────────┘

Bottom Navigation Bar (all screens):
[ 🏠 Home ] [ 💼 Jobs ] [ 📋 Status ] [ 👤 Profile ]
```

---

## 10. Components Library

### Button Variants

| Variant | Style | Usage |
|---------|-------|-------|
| Primary | Background: `#e94560`, white text, 8px radius | Main CTAs |
| Secondary | Background: `#0f3460`, white text, 8px radius | Supporting CTAs |
| Outline | Border: `#1a1a2e`, dark text | Secondary options |
| Ghost | No background, text only | Subtle actions |
| Danger | Background: `#f44336`, white text | Delete, reject |
| Disabled | Background: `#ccc`, grey text | Inactive state |

### Form Fields

| Field Type | Style |
|-----------|-------|
| Text Input | White bg, `#e0e0e0` border, 8px radius, 16px font |
| Dropdown | Same as text input + chevron icon |
| Radio Button | Custom styled circles, accent color when selected |
| Checkbox | Custom squares, accent red when checked |
| File Upload | Dashed border, icon + "Click to upload" text |
| Date Picker | Text input + calendar icon |

### Status Badges / Pills

| Status | Background | Text Color |
|--------|-----------|------------|
| New | `#FFF176` | `#555` |
| Screened | `#90CAF9` | `#0d47a1` |
| Approved | `#66BB6A` | White |
| Processing | `#42A5F5` | White |
| Deployed | `#2E7D32` | White |
| Rejected | `#f44336` | White |
| Paid | `#4CAF50` | White |
| Open | `#FFC107` | `#333` |

### Card Component

```
┌─────────────────────────────────┐
│  [Icon/Image]                   │  ← White bg
│  Title Text (H3, SemiBold)      │  ← Shadow: 0 2px 8px rgba(0,0,0,0.1)
│  Subtitle (Body Small, #888)    │  ← Border radius: 12px
│  ─────────────────────────────  │  ← Padding: 24px
│  [Action Button]                │
└─────────────────────────────────┘
```

### Navigation (Desktop)

```
┌──────────────────────────────────────────────────────────┐
│ [Logo]    Item1  Item2  Item3  Item4  Item5    [CTA Btn]  │
│           ----                                            │ ← Active underline
└──────────────────────────────────────────────────────────┘
Height: 64px | Background: #1a1a2e | Sticky on scroll
```

---

## 11. UX/UI Best Practices for Recruitment Platform

| Principle | Application |
|-----------|------------|
| Trust signals | Show verified badges, testimonials, stats prominently |
| Social proof | Worker success stories on landing page, employer logos |
| Clear CTAs | One primary CTA per section; never two equal-weight buttons |
| Progress indicators | Multi-step forms show step X of Y progress bar |
| Mobile-first forms | Forms optimized for thumb navigation on mobile |
| Error prevention | Validate fields inline (phone format, email format) |
| Accessibility | Color contrast ratio 4.5:1 minimum; alt text on all images |
| Loading states | Show loading spinner during AI scoring or form submission |
| Success feedback | Confirmation screen after every form submission |
| Empty states | Show helpful message when no jobs / no candidates found |

---

## 12. Mobile-First Design Considerations

| Element | Desktop | Mobile |
|---------|---------|--------|
| Navigation | Horizontal menu bar | Hamburger menu → slide-in drawer |
| Hero section | Full-width image, 2 CTAs side by side | Single column, stacked CTAs |
| Stats bar | 4 columns | 2x2 grid |
| Job cards | 3 columns | Single column scroll |
| Tables (Admin) | Full table | Horizontal scroll or card view |
| Forms | Side-by-side labels | Full-width stacked fields |
| Buttons | Normal size | Minimum 44px tap target height |
| Font sizes | Standard | +2px on all text for readability |
| Images | High-res | Compressed WebP format |
| WhatsApp widget | Bottom right | Bottom center or right |

**Breakpoints:**

```css
Mobile:  < 768px   (single column layout)
Tablet:  768–1024px (two column layout)
Desktop: > 1024px  (full multi-column layout)
```

---

*Maintained by: Head of Tech | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
