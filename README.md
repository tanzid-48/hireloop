<div align="center">

<br/>

```
 ██╗  ██╗██╗██████╗ ███████╗██╗      ██████╗  ██████╗ ██████╗
 ██║  ██║██║██╔══██╗██╔════╝██║     ██╔═══██╗██╔═══██╗██╔══██╗
 ███████║██║██████╔╝█████╗  ██║     ██║   ██║██║   ██║██████╔╝
 ██╔══██║██║██╔══██╗██╔══╝  ██║     ██║   ██║██║   ██║██╔═══╝
 ██║  ██║██║██║  ██║███████╗███████╗╚██████╔╝╚██████╔╝██║
 ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═╝
```

### **The Modern Full-Stack Job Portal**

_Connecting top talent with world-class companies — built from scratch._

<br/>

[![Live App](https://img.shields.io/badge/🌐_Live_App-hireloop--ruby.vercel.app-6366f1?style=for-the-badge&logoColor=white)](https://hireloop-ruby.vercel.app)
[![API](https://img.shields.io/badge/⚙️_API_Server-Render-00C7B7?style=for-the-badge&logoColor=white)](https://hireloop-server-hj9h.onrender.com)
[![Repo](https://img.shields.io/badge/GitHub-tanzid--48/hireloop-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tanzid-48/hireloop)

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Express](https://img.shields.io/badge/Express.js-4-grey?style=flat-square&logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe&logoColor=white)](https://stripe.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel)](https://vercel.com)
[![Render](https://img.shields.io/badge/Render-API-00C7B7?style=flat-square&logo=render&logoColor=white)](https://render.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

<br/>

</div>

---

## 🔗 Quick Links

<div align="center">

|     | Resource          | URL                                                                            |
| --- | ----------------- | ------------------------------------------------------------------------------ |
| 🌐  | **Live Frontend** | [hireloop-ruby.vercel.app](https://hireloop-ruby.vercel.app)                   |
| ⚙️  | **Backend API**   | [hireloop-server-hj9h.onrender.com](https://hireloop-server-hj9h.onrender.com) |
| 📦  | **GitHub Repo**   | [github.com/tanzid-48/hireloop](https://github.com/tanzid-48/hireloop)         |

</div>

---

## 📖 About

**HireLoop** is a production-ready, full-stack job portal with three distinct user roles, real Stripe payments, JWT-secured API, MongoDB Atlas, and a fully-featured admin panel.

> 🎓 Built as a CSE project — **Pundra University of Science and Technology (PUB) · 23rd Batch**

### What makes it different?

- ✅ **Real authentication** — better-auth with Google OAuth + email/password
- ✅ **Real payments** — Stripe subscriptions with live plan quota enforcement
- ✅ **Real security** — JWT tokens verified in MongoDB on every protected API call
- ✅ **Server-side pagination** — each page click fetches fresh data from Express
- ✅ **Three-role system** — Seeker, Recruiter, Admin with dedicated dashboards
- ✅ **Company approval flow** — Recruiter registers → Admin approves → public visibility
- ✅ **Full admin panel** — real-time stats, user management, company control

---

## 🎭 Three Roles, One Platform

<table>
<tr>
<td valign="top" width="33%">

### 🔍 Job Seeker

Browse thousands of verified listings. Apply with one click. Track every application in real-time.

**Dashboard Pages:**

- 📊 Home with stats & quota
- 💼 Browse & search jobs
- 📁 Application tracker
- 🔖 Saved jobs
- 💳 Billing & subscription
- 🔔 Notifications
- 👤 Public profile
- ⚙️ Account settings

**Plans:** Free (3/mo) → Pro (30/mo) → Premium (∞)

</td>
<td valign="top" width="33%">

### 🏢 Recruiter

Register your company (admin-verified). Post detailed job listings. Manage your entire hiring pipeline.

**Dashboard Pages:**

- 🏠 Recruiter home
- 📋 Job listings & editor
- ➕ Post new jobs
- 🏭 Company profile
- 💬 Messages
- 👤 Profile & settings

**Plans:** Free (3 posts) → Growth (10) → Enterprise (50)

</td>
<td valign="top" width="33%">

### 🛡️ Admin

Complete platform control. Approve companies, manage all users, view live analytics and payment history.

**Dashboard Pages:**

- 📊 Platform analytics
- 👥 User management
- 🏭 Company reviews
- 💼 All jobs oversight
- 💰 Subscription tracker
- ⚙️ System settings

**Access:** MongoDB role set to `"admin"`

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

### Frontend — Next.js 15 App

| Package                        | Purpose                                                |
| ------------------------------ | ------------------------------------------------------ |
| `next` 15 (App Router)         | Full-stack React framework with RSC                    |
| `better-auth`                  | Auth (email + Google OAuth), session tokens in MongoDB |
| `@heroui/react` v3             | Dark-mode UI component library                         |
| `tailwindcss` v4               | Utility-first CSS styling                              |
| `@gravity-ui/icons`            | Icon set throughout the app                            |
| `stripe` + `@stripe/stripe-js` | Checkout + payment processing                          |
| `sonner`                       | Toast notifications                                    |
| `next/image`                   | Optimised image rendering                              |
| ImgBB API                      | Company logo upload and hosting                        |

### Backend — Express.js API

| Package     | Purpose                           |
| ----------- | --------------------------------- |
| `express` 4 | REST API server                   |
| `mongodb`   | Native driver for Atlas (two DBs) |
| `dotenv`    | Environment variable management   |
| `cors`      | Cross-origin request handling     |
| `stripe`    | Subscription management + webhook |

---

## 🗄️ Database Architecture

```
MongoDB Atlas
│
├── hire_loop_db                     ← Application data
│   ├── jobs              Job listings (title, category, salary, deadline, companyId…)
│   ├── companies         Company profiles (name, logo, industry, status, recruiterId…)
│   ├── applications      Applications (userId, jobId, status, form data, createdAt…)
│   └── subscriptions     Stripe records (userId, planId, stripeSubscriptionId, status…)
│
└── hireloop_auth_db                 ← Managed by better-auth
    ├── user              Accounts (name, email, role, plan, image, emailVerified…)
    ├── session           JWT tokens (token, userId, expiresAt…)
    └── account           OAuth accounts (Google provider data)
```

---

## 📁 Project Structure

```
hireloop/
│
├── server/                                ← Express.js API
│   ├── index.js                           All routes + JWT middleware
│   └── .env                               MONGODB_URI, PORT
│
└── client/                                ← Next.js 15 Frontend
    │
    ├── src/
    │   ├── app/
    │   │   ├── (auth)/
    │   │   │   ├── signin/page.jsx
    │   │   │   └── signup/page.jsx
    │   │   │
    │   │   ├── jobs/
    │   │   │   ├── page.jsx               Server — searchParams → getJobsPaginated()
    │   │   │   ├── JobsPage.jsx           Client — URL-based filters + pagination
    │   │   │   └── [id]/
    │   │   │       ├── page.jsx           Job details
    │   │   │       └── apply/
    │   │   │           ├── page.jsx       Session + quota check
    │   │   │           └── ApplyForm.jsx  3-step form
    │   │   │
    │   │   ├── company/page.jsx           Public grid / Recruiter own company
    │   │   ├── pricing/page.jsx           Plans + Stripe checkout
    │   │   ├── plans/success/page.jsx     Post-payment success
    │   │   ├── not-found.jsx              404 page
    │   │   ├── unauthorized/page.jsx      401 page
    │   │   ├── forbidden/page.jsx         403 page
    │   │   │
    │   │   ├── dashboard/
    │   │   │   │
    │   │   │   ├── seeker/
    │   │   │   │   ├── layout.jsx         Role guard
    │   │   │   │   ├── page.jsx           Stats + quota + recent apps
    │   │   │   │   ├── applications/page.jsx
    │   │   │   │   ├── saved-jobs/page.jsx
    │   │   │   │   ├── billing/page.jsx
    │   │   │   │   ├── notifications/page.jsx
    │   │   │   │   ├── profile/page.jsx
    │   │   │   │   └── settings/
    │   │   │   │       ├── page.jsx
    │   │   │   │       └── SettingsForm.jsx
    │   │   │   │
    │   │   │   ├── recruiter/
    │   │   │   │   ├── layout.jsx         Role guard
    │   │   │   │   ├── page.jsx
    │   │   │   │   ├── jobs/              Manage + post jobs
    │   │   │   │   ├── company/           Profile + register
    │   │   │   │   ├── messages/page.jsx
    │   │   │   │   ├── notifications/page.jsx
    │   │   │   │   ├── profile/page.jsx
    │   │   │   │   └── settings/
    │   │   │   │       ├── page.jsx
    │   │   │   │       └── RecruiterSettingsForm.jsx
    │   │   │   │
    │   │   │   └── admin/
    │   │   │       ├── layout.jsx         Admin-only guard
    │   │   │       ├── page.jsx           Real-time analytics
    │   │   │       ├── users/
    │   │   │       │   ├── page.jsx
    │   │   │       │   └── UserActions.jsx
    │   │   │       ├── companies/
    │   │   │       │   ├── page.jsx
    │   │   │       │   ├── CompanyActions.jsx
    │   │   │       │   └── loading.jsx
    │   │   │       ├── jobs/page.jsx
    │   │   │       ├── payments/page.jsx
    │   │   │       └── settings/page.jsx
    │   │   │
    │   │   └── api/
    │   │       ├── checkout_sessions/route.js   Stripe checkout
    │   │       ├── subscription/update/route.js Post-payment update
    │   │       └── auth/[...all]/route.js       better-auth handler
    │   │
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── JobCard.jsx
    │   │   ├── dashboard/
    │   │   │   ├── DashboardSidebar.jsx   Server — reads session
    │   │   │   ├── SidebarNavLinks.jsx    Client — active via usePathname
    │   │   │   ├── DashboardCard.jsx
    │   │   │   └── JobsTable.jsx
    │   │   └── home/
    │   │       ├── FeaturedJobsSection.jsx
    │   │       ├── FeaturesSection.jsx
    │   │       ├── HowItWorksSection.jsx
    │   │       └── LandingPricing.jsx
    │   │
    │   └── lib/
    │       ├── auth.js                    better-auth config + MongoDB adapter
    │       ├── auth-client.js             Client-side auth
    │       ├── auth-session.js            getSession / getUserToken / getAuthHeaders
    │       ├── stripe.js                  Stripe instance + plan → priceId map
    │       ├── action/
    │       │   ├── jobs.js                createJob, updateJob, deleteJob
    │       │   ├── company.js             createCompany, updateCompany
    │       │   ├── applications.js        createApplication
    │       │   └── admin.js               updateUserRole, updateUserStatus, deleteUser, updateCompanyStatus
    │       └── api/
    │           ├── jobs.js                getAllJobs, getJobById, getJobsPaginated
    │           ├── company.js             getAllCompanies, getRecruiterCompany
    │           ├── applications.js        getApplicationsByUser, getUserPlan
    │           └── admin/
    │               ├── user.js            getUsers
    │               └── payments.js        getSubscriptions
    │
    └── .env.local                         All env variables
```

---

## 🔐 Security Model

```
Every request to a protected endpoint:

Client → sends Authorization: Bearer <token>
             ↓
Express verifyToken middleware
             ↓
    Lookup token in hireloop_auth_db.session
             ↓
    Fetch user from hireloop_auth_db.user
             ↓
    Attach req.user → role check middleware
             ↓
    verifySeeker / verifyRecruiter / verifyAdmin
             ↓
    Route handler executes


OPEN (no token):          GET /jobs, GET /jobs/:id, GET /companies
SEEKER only:              POST /applications  (+ plan quota check)
RECRUITER only:           POST/PATCH/DELETE /jobs, POST/PATCH /api/companies
ADMIN only:               /admin/*, PATCH /api/companies/:id/status
ANY authenticated user:   GET /users/:id/plan, GET /applications
```

---

## 💳 Subscription Plans

### Job Seekers

| Plan       | Price  | Apps / Month | Stripe Env                       |
| ---------- | ------ | ------------ | -------------------------------- |
| 🆓 Free    | $0/mo  | 3            | —                                |
| ⚡ Pro     | $19/mo | 30           | `STRIPE_SEEKER_PRO_PRICE_ID`     |
| 👑 Premium | $39/mo | Unlimited    | `STRIPE_SEEKER_PREMIUM_PRICE_ID` |

### Recruiters

| Plan          | Price   | Active Job Posts | Stripe Env                             |
| ------------- | ------- | ---------------- | -------------------------------------- |
| 🆓 Free       | $0/mo   | 3                | —                                      |
| 📈 Growth     | $49/mo  | 10               | `STRIPE_RECRUITER_GROWTH_PRICE_ID`     |
| 🏢 Enterprise | $149/mo | 50               | `STRIPE_RECRUITER_ENTERPRISE_PRICE_ID` |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas cluster
- Stripe account (test mode)
- ImgBB API key
- Google OAuth credentials _(optional)_

---

### 1 — Clone the repo

```bash
git clone https://github.com/tanzid-48/hireloop.git
cd hireloop
```

---

### 2 — Setup Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/
```

```bash
node index.js
# ✅ Server running on port 5000
# ✅ Connected to MongoDB!
```

---

### 3 — Setup Frontend

```bash
cd client
npm install
```

Create `client/.env.local`:

```env
# ── API ─────────────────────────────────────
NEXT_PUBLIC_BASE_URL_API=http://localhost:5000

# ── Auth (better-auth) ───────────────────────
BETTER_AUTH_SECRET=your-32-char-random-secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/
AUTH_DB_NAME=hireloop_auth_db

# ── Google OAuth (optional) ──────────────────
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# ── ImgBB ────────────────────────────────────
NEXT_PUBLIC_IMGBB_API_KEY=your-imgbb-api-key

# ── Stripe ───────────────────────────────────
STRIPE_SECRET_KEY=sk_test_...
STRIPE_SEEKER_PRO_PRICE_ID=price_...
STRIPE_SEEKER_PREMIUM_PRICE_ID=price_...
STRIPE_RECRUITER_GROWTH_PRICE_ID=price_...
STRIPE_RECRUITER_ENTERPRISE_PRICE_ID=price_...
```

```bash
npm run dev
# ✅ Ready on http://localhost:3000
```

---

### 4 — Create an Admin Account

1. Sign up normally at `/signup`
2. Go to **MongoDB Atlas → hireloop_auth_db → user collection**
3. Find your user and run:

```json
{ "$set": { "role": "admin" } }
```

4. Visit [/dashboard/admin](http://localhost:3000/dashboard/admin) ✅

---

## 🌐 Deployment

### Frontend → Vercel

```bash
# Push client/ to GitHub → connect to Vercel
# Add ALL .env.local variables in Vercel dashboard
# Auto-deploys on every git push to main
```

### Backend → Render

| Setting         | Value             |
| --------------- | ----------------- |
| Build Command   | `npm install`     |
| Start Command   | `node index.js`   |
| Environment Var | `MONGODB_URI=...` |

> ⚠️ **Note:** Render free tier sleeps after 15 min of inactivity. First request after sleep takes ~30s.

---

## 📡 API Reference

```
GET    /                                 Health check

── JOBS ─────────────────────────────────────────────────────────
GET    /jobs                             All jobs (array, backward-compat)
GET    /jobs?page=1&limit=9              Paginated → { jobs, total, totalPages }
GET    /jobs?search=react                Full-text search (title / category / city)
GET    /jobs?category=Engineering        Filter by category
GET    /jobs?jobType=Full-time           Filter by type (or "Remote")
GET    /jobs?sort=salary                 Sort: salary | newest (default)
GET    /jobs?companyId=xxx               Jobs for a specific company
GET    /jobs/:id                         Single job detail
POST   /jobs                             Create job                [recruiter]
PATCH  /jobs/:id                         Update job                [recruiter]
DELETE /jobs/:id                         Delete job                [recruiter]

── COMPANIES ─────────────────────────────────────────────────────
GET    /companies                        All companies (+ email, jobCount)
GET    /companies?recruiterId=xxx        Filter by recruiter
GET    /api/company?recruiterId=xxx      Recruiter's own company (single)
GET    /api/companies/:id                Company by ID
POST   /api/companies                    Register company          [recruiter]
PATCH  /api/companies/:id                Update company            [recruiter]
PATCH  /api/companies/:id/status         Approve / reject          [admin]

── APPLICATIONS ──────────────────────────────────────────────────
POST   /applications                     Submit application        [seeker + quota check]
GET    /applications?jobId=xxx           All applications for a job
GET    /applications?userId=xxx          User's applications

── USERS & PLANS ─────────────────────────────────────────────────
GET    /users/:id/plan                   Plan info + monthly usage [auth]
PATCH  /users/:id/plan                   Update plan               (Stripe callback)

── SUBSCRIPTIONS ─────────────────────────────────────────────────
POST   /subscriptions                    Save Stripe subscription
GET    /subscriptions/:userId            User's subscription

── ADMIN ─────────────────────────────────────────────────────────
GET    /admin/users                      All platform users        [admin]
PATCH  /admin/users/:id/role             Change role               [admin]
PATCH  /admin/users/:id/status           Suspend / activate        [admin]
DELETE /admin/users/:id                  Delete user               [admin]
GET    /admin/subscriptions              All subscriptions         [admin]
```

---

## 🗺️ User Flows

```
─── JOB SEEKER ──────────────────────────────────────────────────

  /signup (role: seeker)
      ↓
  /jobs → search + filter + category → /jobs/:id
      ↓
  "Apply Now" → session check → plan quota check → /jobs/:id/apply
      ↓
  3-step form → submitted → dashboard application tracker
      ↓
  quota limit hit → /pricing → Stripe Checkout → /plans/success
      ↓
  plan updated in DB → more applications unlocked ✅


─── RECRUITER ────────────────────────────────────────────────────

  /signup (role: recruiter)
      ↓
  /dashboard/recruiter/company/register → upload logo → submit
      ↓
  Admin reviews → Approve → company visible at /company
      ↓
  /dashboard/recruiter/jobs/new → post job → live at /jobs
      ↓
  View applicants at /dashboard/recruiter/jobs/[id]/applicants


─── ADMIN ────────────────────────────────────────────────────────

  MongoDB: set role = "admin"
      ↓
  /dashboard/admin → real-time platform stats
      ↓
  /dashboard/admin/companies → approve / reject companies
      ↓
  /dashboard/admin/users → manage roles, suspend, delete
      ↓
  /dashboard/admin/payments → view all subscriptions
```

---

## 🔖 Bookmarks

> All important links in one place — save this section!

### 🌐 App Pages

| Page               | Link                                                         |
| ------------------ | ------------------------------------------------------------ |
| 🏠 Home            | [hireloop-ruby.vercel.app](https://hireloop-ruby.vercel.app) |
| 💼 Browse Jobs     | [/jobs](https://hireloop-ruby.vercel.app/jobs)               |
| 🏭 Companies       | [/company](https://hireloop-ruby.vercel.app/company)         |
| 💳 Pricing & Plans | [/pricing](https://hireloop-ruby.vercel.app/pricing)         |
| 🔐 Sign In         | [/signin](https://hireloop-ruby.vercel.app/signin)           |
| 📝 Sign Up         | [/signup](https://hireloop-ruby.vercel.app/signup)           |

### 🔍 Seeker Dashboard

| Page               | Link                                                                                               |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| 📊 Dashboard Home  | [/dashboard/seeker](https://hireloop-ruby.vercel.app/dashboard/seeker)                             |
| 📁 My Applications | [/dashboard/seeker/applications](https://hireloop-ruby.vercel.app/dashboard/seeker/applications)   |
| 🔖 Saved Jobs      | [/dashboard/seeker/saved-jobs](https://hireloop-ruby.vercel.app/dashboard/seeker/saved-jobs)       |
| 💳 Billing         | [/dashboard/seeker/billing](https://hireloop-ruby.vercel.app/dashboard/seeker/billing)             |
| 🔔 Notifications   | [/dashboard/seeker/notifications](https://hireloop-ruby.vercel.app/dashboard/seeker/notifications) |
| 👤 Profile         | [/dashboard/seeker/profile](https://hireloop-ruby.vercel.app/dashboard/seeker/profile)             |
| ⚙️ Settings        | [/dashboard/seeker/settings](https://hireloop-ruby.vercel.app/dashboard/seeker/settings)           |

### 🏢 Recruiter Dashboard

| Page               | Link                                                                                                     |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| 🏠 Dashboard Home  | [/dashboard/recruiter](https://hireloop-ruby.vercel.app/dashboard/recruiter)                             |
| 📋 Job Listings    | [/dashboard/recruiter/jobs](https://hireloop-ruby.vercel.app/dashboard/recruiter/jobs)                   |
| ➕ Post a Job      | [/dashboard/recruiter/jobs/new](https://hireloop-ruby.vercel.app/dashboard/recruiter/jobs/new)           |
| 🏭 Company Profile | [/dashboard/recruiter/company](https://hireloop-ruby.vercel.app/dashboard/recruiter/company)             |
| 💬 Messages        | [/dashboard/recruiter/messages](https://hireloop-ruby.vercel.app/dashboard/recruiter/messages)           |
| 🔔 Notifications   | [/dashboard/recruiter/notifications](https://hireloop-ruby.vercel.app/dashboard/recruiter/notifications) |
| 👤 Profile         | [/dashboard/recruiter/profile](https://hireloop-ruby.vercel.app/dashboard/recruiter/profile)             |
| ⚙️ Settings        | [/dashboard/recruiter/settings](https://hireloop-ruby.vercel.app/dashboard/recruiter/settings)           |

### 🛡️ Admin Dashboard

| Page         | Link                                                                                     |
| ------------ | ---------------------------------------------------------------------------------------- |
| 📊 Analytics | [/dashboard/admin](https://hireloop-ruby.vercel.app/dashboard/admin)                     |
| 👥 Users     | [/dashboard/admin/users](https://hireloop-ruby.vercel.app/dashboard/admin/users)         |
| 🏭 Companies | [/dashboard/admin/companies](https://hireloop-ruby.vercel.app/dashboard/admin/companies) |
| 💼 All Jobs  | [/dashboard/admin/jobs](https://hireloop-ruby.vercel.app/dashboard/admin/jobs)           |
| 💰 Payments  | [/dashboard/admin/payments](https://hireloop-ruby.vercel.app/dashboard/admin/payments)   |
| ⚙️ Settings  | [/dashboard/admin/settings](https://hireloop-ruby.vercel.app/dashboard/admin/settings)   |

### ⚙️ API Endpoints

| Endpoint         | Link                                                                           |
| ---------------- | ------------------------------------------------------------------------------ |
| 🟢 Health Check  | [hireloop-server-hj9h.onrender.com](https://hireloop-server-hj9h.onrender.com) |
| 💼 Jobs API      | [/jobs](https://hireloop-server-hj9h.onrender.com/jobs)                        |
| 🏭 Companies API | [/companies](https://hireloop-server-hj9h.onrender.com/companies)              |

### 🛠️ Developer Links

| Resource       | Link                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------ |
| 📦 GitHub Repo | [github.com/tanzid-48/hireloop](https://github.com/tanzid-48/hireloop)                     |
| 🌿 Main Branch | [github.com/tanzid-48/hireloop/tree/main](https://github.com/tanzid-48/hireloop/tree/main) |
| 🐛 Issues      | [github.com/tanzid-48/hireloop/issues](https://github.com/tanzid-48/hireloop/issues)       |

---

## 🤝 Contributing

```bash
# 1. Fork the repo on GitHub
# 2. Clone your fork
git clone https://github.com/<your-username>/hireloop.git

# 3. Create a feature branch
git checkout -b feat/your-feature-name

# 4. Make changes and commit
git add .
git commit -m "feat: add your feature"

# 5. Push and open a Pull Request
git push origin feat/your-feature-name
```

### Commit Convention

| Prefix      | Use for          |
| ----------- | ---------------- |
| `feat:`     | New feature      |
| `fix:`      | Bug fix          |
| `refactor:` | Code improvement |
| `style:`    | UI / styling     |
| `docs:`     | Documentation    |
| `chore:`    | Config, build    |

---

## 📄 License

```
MIT License

Copyright (c) 2026 Tanzid

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">

<br/>

**Built with ❤️ by [Tanzid](https://github.com/tanzid-48)**

_Pundra University of Science and Technology (PUB) · CSE · 23rd Batch_

<br/>

[![GitHub followers](https://img.shields.io/github/followers/tanzid-48?style=social)](https://github.com/tanzid-48)
[![GitHub stars](https://img.shields.io/github/stars/tanzid-48/hireloop?style=social)](https://github.com/tanzid-48/hireloop)

<br/>

_⭐ If HireLoop helped you, give it a star on GitHub!_

</div>
