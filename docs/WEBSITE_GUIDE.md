# Kingken Global Recruitment Platform — Website Guide

> **Company:** Kingken Global Travel Agency Ltd
> **Domain:** kingkenglobal.com.ng
> **Website:** https://www.kingkenglobal.com.ng | **Email:** info@kingkenglobal.com.ng

---

## 1. Platform Comparison

Choose the right platform based on your team's technical ability and timeline.

| Feature | Wix | WordPress + Elementor | Webflow |
|---------|-----|----------------------|---------|
| Technical skill required | None | Moderate | Low-Moderate |
| Monthly cost | $17–35 | $10–30 (hosting) | $14–39 |
| Custom domain | Yes | Yes | Yes |
| SSL (HTTPS) | Free, automatic | Free (Let's Encrypt) | Free, automatic |
| Google Forms embed | Yes (HTML widget) | Yes (HTML block) | Yes (HTML embed) |
| WhatsApp chat widget | Yes (App Market) | Yes (plugin) | Yes (embed code) |
| SEO capability | Good (basic) | Excellent | Excellent |
| Loading speed | Good | Depends on hosting | Excellent |
| Blog/content | Yes | Excellent | Yes |
| E-commerce | Yes | Yes (WooCommerce) | Yes |
| Launch time for MVP | 1 day | 2–3 days | 2–3 days |
| **Best for** | Fast MVP, non-technical team | Long-term, full control | Design-forward brand |
| **Recommendation** | ✅ Start here | Phase 2 migration | Phase 2 option |

**Recommendation:** Start with **Wix** for the MVP. Once the business grows and revenue is consistent, migrate to WordPress or Webflow for greater control.

---

## 2. Required Pages

| Page | URL Slug | Priority | Purpose |
|------|----------|----------|---------|
| Home | `/` | Critical | First impression, CTA to apply or hire |
| About Us | `/about` | High | Company story, mission, trust building |
| For Workers | `/workers` | Critical | Benefits + embedded Worker Application Form |
| For Employers | `/employers` | Critical | Benefits + embedded Employer Registration Form |
| Jobs Board | `/jobs` | High | Available positions by country |
| Apply Now | `/apply` | Critical | Standalone Worker Form for direct traffic |
| Contact Us | `/contact` | High | Map, phone, WhatsApp, email form |
| Privacy Policy | `/privacy-policy` | Required | Legal compliance, GDPR-adjacent |

---

## 3. Home Page Sections

Build the Home page with these sections in order:

### Section 1: Navigation Bar

```
[Logo: Kingken Global]    Home | About | For Workers | For Employers | Jobs | Contact
                                                         [APPLY NOW]  [HIRE WORKERS]
```

- Logo: Company name with flag or globe icon
- Primary CTA buttons: "Apply Now" (green) and "Hire Workers" (navy)
- Mobile: hamburger menu

### Section 2: Hero Section

**Background:** High-quality image of diverse African professionals in a Gulf setting.

**Headline:** "Connecting Africa's Best Talent with Gulf Opportunities"
**Subheadline:** "Kuwait • UAE • Qatar | Nigeria • Ghana • Kenya • Ethiopia and more"
**Body:** "Kingken Global Travel Agency Ltd is a trusted international recruitment partner placing skilled African workers with reputable employers in the Gulf region."

**CTA Buttons:**
- "Apply for a Job" → links to `/workers`
- "Hire Workers Now" → links to `/employers`

**Trust Indicators (below CTAs):**
```
[✓ 500+ Workers Placed]  [✓ 50+ Trusted Employers]  [✓ 8 African Countries]  [✓ Gulf Certified]
```

### Section 3: Stats Bar

Four-column stats strip with numbers:

```
| 500+ Workers Placed | 50+ Employers | 3 Gulf Countries | 8 African Nations |
```

Use large, bold numbers with short labels. Animate on scroll if possible.

### Section 4: How It Works

**Title:** "How Kingken Global Works"
**Subtitle:** "Simple. Fast. Trusted."

**For Workers (3 steps):**
```
Step 1: Apply Online        Step 2: Get Screened       Step 3: Get Deployed
Submit your application   Our AI + expert team       Travel to Kuwait, UAE,
via form or WhatsApp.     review your profile.       or Qatar and start work.
[Apply Form Icon]         [Screening Icon]           [Plane Icon]
```

**For Employers (3 steps):**
```
Step 1: Register           Step 2: Get Matched        Step 3: Workers Arrive
Tell us your staffing     We shortlist verified      Visas processed, workers
requirements.             candidates for your role.  arrive ready to work.
[Form Icon]               [Match Icon]               [Workers Icon]
```

### Section 5: Testimonials

Three testimonials in a carousel or grid:

**Testimonial 1 (Worker):**
> "Kingken Global changed my life. Within 3 months I was working in Kuwait. The process was smooth and the team guided me every step of the way."
> — *Adaeze O., Domestic Worker, Nigeria*

**Testimonial 2 (Employer):**
> "We hired 5 workers through Kingken Global and all 5 are excellent. Professional, hardworking, and well-prepared. Highly recommended."
> — *Mohammed Al-Rashid, Business Owner, Kuwait*

**Testimonial 3 (Worker):**
> "I applied on WhatsApp on Monday, was approved by Wednesday, and deployed within 10 weeks. Truly professional."
> — *Samuel A., Driver, Ghana*

### Section 6: Featured Jobs

**Title:** "Currently Hiring"

Display 3–6 job cards:

```
[Job Card]
Domestic Worker — Kuwait
• Monthly Salary: $300–500
• Experience: 1+ years
• Nationality: Open
[Apply Now Button]
```

Repeat for: Driver (UAE), Security Guard (Qatar), Nanny (Kuwait), Cleaner (Dubai), Cook (Abu Dhabi).

### Section 7: Call to Action Banner

Full-width colored banner (navy background, white text):

```
Ready to Build Your Future Abroad?
[Apply for a Job Today]    [Hire African Workers]
```

### Section 8: Footer

```
Company: Kingken Global Travel Agency Ltd
Website: www.kingkenglobal.com.ng
Email: info@kingkenglobal.com.ng
WhatsApp: +96569048174

Links: Home | About | For Workers | For Employers | Jobs | Contact | Privacy Policy

Social: [Facebook] [LinkedIn] [Instagram] [YouTube]

Markets: Kuwait | UAE | Qatar | Nigeria | Ghana | Kenya | Ethiopia | Uganda | Tanzania | Cameroon | Senegal

© 2024 Kingken Global Travel Agency Ltd. All rights reserved.
```

---

## 4. For Workers Page

**Hero Text:** "Work in Kuwait, UAE, or Qatar — We Make It Happen"

**Benefits Section (4 columns):**
- ✅ Free for Workers — No recruitment fees
- ✅ Verified Employers — All companies are vetted
- ✅ Full Support — Visa, documentation, orientation
- ✅ Fast Processing — From application to deployment in 6–12 weeks

**Requirements Section:**
- Valid passport (or ability to obtain one)
- Minimum 1 year experience in your field
- Clear criminal record
- Medical fitness

**Embedded Worker Form:**
Add an HTML/embed widget and paste the Google Form iframe:
```html
<iframe src="YOUR_GOOGLE_FORM_URL?embedded=true"
  width="100%" height="900" frameborder="0"
  marginheight="0" marginwidth="0">Loading…</iframe>
```

---

## 5. For Employers Page

**Hero Text:** "Hire Reliable, Skilled Workers from Africa"

**Benefits Section:**
- ✅ Pre-screened Candidates — AI + manual verification
- ✅ Multiple Nationalities — Nigeria, Ghana, Kenya, Ethiopia, and more
- ✅ Visa & Documentation Support — We handle the paperwork
- ✅ Replacement Guarantee — Worker replacement if needed within probation period

**Process Timeline:**
```
Day 1: Submit Requirements → Day 3–5: Receive Shortlist → Week 2–3: Interviews
Week 4–6: Visas Applied → Week 8–12: Workers Deployed
```

**Embedded Employer Form:**
```html
<iframe src="YOUR_EMPLOYER_FORM_URL?embedded=true"
  width="100%" height="800" frameborder="0"
  marginheight="0" marginwidth="0">Loading…</iframe>
```

---

## 6. WhatsApp Chat Widget Installation

### Option A: Wix App Market

1. In Wix Editor, click **Add Apps**.
2. Search for **WhatsApp Chat**.
3. Install and configure with number: `+96569048174`.
4. Set greeting message: "Hi! How can Kingken Global help you today? 😊"

### Option B: Custom HTML Embed (Works on Any Platform)

Add this HTML code to every page (before `</body>` tag):

```html
<!-- WhatsApp Chat Button -->
<a href="https://wa.me/96569048174?text=Hello%20Kingken%20Global%2C%20I%20want%20to%20know%20more"
   target="_blank"
   style="
     position: fixed;
     bottom: 20px;
     right: 20px;
     background-color: #25D366;
     border-radius: 50px;
     padding: 14px 20px;
     color: white;
     font-size: 16px;
     font-weight: bold;
     text-decoration: none;
     box-shadow: 2px 2px 10px rgba(0,0,0,0.3);
     z-index: 9999;
     display: flex;
     align-items: center;
     gap: 8px;
   ">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967..."/>
  </svg>
  Chat with Us
</a>
```

---

## 7. SEO Basics

### Page Titles and Meta Descriptions

| Page | Title Tag (max 60 chars) | Meta Description (max 160 chars) |
|------|--------------------------|----------------------------------|
| Home | Kingken Global — International Recruitment Agency | Connecting African workers with employers in Kuwait, UAE and Qatar. Apply for jobs or hire workers today. |
| For Workers | Apply for Jobs in Kuwait & UAE — Kingken Global | Find work abroad in Kuwait, UAE, and Qatar. Free application for domestic workers, drivers, and more from Africa. |
| For Employers | Hire African Workers — Kingken Global Recruitment | Hire vetted, skilled workers from Nigeria, Ghana, Kenya and across Africa for roles in Kuwait, UAE, and Qatar. |
| Jobs Board | Available Jobs Abroad — Kuwait UAE Qatar | Browse current job openings for African workers in Gulf countries. Apply now through Kingken Global. |
| Contact Us | Contact Kingken Global — +96569048174 | Get in touch with Kingken Global Travel Agency Ltd. WhatsApp, email, or visit our website. |

### Target Keywords

**Primary Keywords:**
- international recruitment agency Nigeria
- hire workers from Africa Kuwait
- domestic workers UAE
- recruitment agency Ghana Kuwait
- African workers Gulf
- overseas job placement Nigeria

**Secondary Keywords:**
- jobs in Kuwait for Nigerians
- Dubai jobs for Africans
- domestic worker jobs Qatar
- hire Kenyan workers UAE
- recruitment agency Lagos

**Local SEO Keywords:**
- recruitment agency Lagos Nigeria
- international jobs Ghana Accra
- overseas recruitment Kenya Nairobi

### On-Page SEO Checklist

- [ ] All page titles are unique and under 60 characters
- [ ] All meta descriptions are unique and under 160 characters
- [ ] Primary keyword in H1 of each page
- [ ] Alt text on all images (e.g., "African domestic worker placement Kuwait")
- [ ] Internal links between related pages
- [ ] Schema markup for Organization and JobPosting (use [schema.org](https://schema.org))
- [ ] XML sitemap submitted to Google Search Console
- [ ] robots.txt file present and correct

---

## 8. Google Analytics Setup (GA4)

1. Go to [analytics.google.com](https://analytics.google.com) and create a new account.
2. Create a property named `Kingken Global — kingkenglobal.com.ng`.
3. Select **Web** as the data stream.
4. Enter domain: `www.kingkenglobal.com.ng`.
5. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`).
6. Add to Wix: **Settings → Marketing Integrations → Google Analytics** → paste Measurement ID.
7. Verify data is flowing: Go to GA4 → Reports → Real Time → visit your website.

### Key Conversions to Track

| Conversion | How to Track |
|-----------|-------------|
| Worker Form Submission | Thank you page view or form submit event |
| Employer Form Submission | Thank you page view or form submit event |
| WhatsApp Button Click | Click event on WhatsApp widget |
| Jobs Page Visit | Page view |
| Contact Page Visit | Page view |

---

## 9. Facebook Pixel Installation

1. Go to [business.facebook.com](https://business.facebook.com) → Events Manager.
2. Create a **Pixel** named `Kingken Global Pixel`.
3. Copy the Pixel ID (numeric string).
4. Add to Wix: **Settings → Marketing Tools → Facebook Pixel** → paste Pixel ID.
5. Set up the following standard events:

| Event | Trigger |
|-------|---------|
| `Lead` | Worker form submission |
| `Contact` | Employer form submission |
| `ViewContent` | Jobs Board page view |
| `PageView` | Every page (automatic) |

6. Use the **Facebook Pixel Helper** Chrome extension to verify events are firing.

---

## 10. Domain Setup: kingkenglobal.com.ng

### If Domain is Registered at a Nigerian Registrar (e.g., WhoGoHost, QServers)

1. Log in to your domain registrar account.
2. Go to **DNS Management** for `kingkenglobal.com.ng`.
3. In Wix, go to **Settings → Domains → Connect a Domain I Already Own**.
4. Wix will provide DNS records to add:

| Type | Name | Value |
|------|------|-------|
| A | @ | 192.168.1.1 (Wix IP — use exact value Wix gives you) |
| CNAME | www | username.wix.com |

5. Add these records in your domain registrar's DNS panel.
6. DNS propagation takes 24–48 hours.
7. After propagation: verify domain shows as **Connected** in Wix.

### Email Setup (Google Workspace)

1. Sign up for Google Workspace Business Starter at [workspace.google.com](https://workspace.google.com).
2. Verify domain ownership by adding a TXT record to DNS.
3. Create email accounts:
   - `info@kingkenglobal.com.ng` — Main contact
   - `coo@kingkenglobal.com.ng` — COO
   - `recruitment@kingkenglobal.com.ng` — Recruitment team
   - `platform@kingkenglobal.com.ng` — Automation/system

---

## 11. SSL and Security

### SSL Certificate

- **Wix:** SSL is automatic and free. The padlock icon appears in the browser automatically when your domain is connected.
- **WordPress:** Install the **Really Simple SSL** plugin or use your hosting provider's free Let's Encrypt SSL.
- **Webflow:** SSL is automatic on all paid plans.

### Security Best Practices

| Practice | Action |
|----------|--------|
| Strong passwords | Use 20+ character random passwords for all accounts |
| Two-Factor Authentication | Enable 2FA on Google, Wix, Zapier, WATI, OpenAI |
| Regular backups | Wix auto-backs up; download copies monthly |
| No sensitive data on website | Never show API keys, sheet links, or internal URLs publicly |
| Privacy Policy | Add a Privacy Policy page explaining data collection |
| Cookie consent | Add a cookie consent banner (GDPR compliance) |
| Spam protection | Enable Google reCAPTCHA on all forms |

### Privacy Policy Key Sections

The Privacy Policy at `/privacy-policy` must include:

1. **What data we collect:** Name, phone, email, CV, passport status
2. **How we use it:** Recruitment processing, employer matching
3. **Who we share it with:** Employers (only after candidate consent), Zapier (automation), OpenAI (anonymized scoring)
4. **Data retention:** 2 years after last contact
5. **Your rights:** Right to access, correct, or delete your data
6. **Contact:** info@kingkenglobal.com.ng

---

## 12. Website Launch Checklist

- [ ] All 8 pages created and published
- [ ] Domain connected: kingkenglobal.com.ng
- [ ] HTTPS/SSL active (padlock visible)
- [ ] Google Analytics tracking code installed
- [ ] Facebook Pixel installed
- [ ] Worker Form embedded on For Workers and Apply Now pages
- [ ] Employer Form embedded on For Employers page
- [ ] WhatsApp chat widget on all pages linking to +96569048174
- [ ] All page titles and meta descriptions written
- [ ] Mobile responsiveness tested on iOS and Android
- [ ] All internal links working (no broken links)
- [ ] Contact page has correct phone, email, WhatsApp
- [ ] Privacy Policy page published
- [ ] Site speed tested (Google PageSpeed Insights — aim for 70+ on mobile)
- [ ] Google Search Console verified and sitemap submitted
- [ ] Team members briefed on how to share website URL

---

*Maintained by: Head of Tech | Contact: info@kingkenglobal.com.ng | https://www.kingkenglobal.com.ng*
