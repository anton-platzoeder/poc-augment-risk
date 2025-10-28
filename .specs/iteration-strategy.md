# AugmentRisk Payments Workflow POC - Iteration Strategy

**Generated:** 2025-10-28
**Target Deadline:** Friday 9 AM
**Total Estimated Time:** 44-54 hours over 3.5 days

---

## Overview

This document breaks down the development into **15 detailed iterations**, each 3-6 hours in duration. Each iteration follows a structured workflow: branch creation → wireframe (if UI) → development → testing → commit → PR → merge. One PR per screen/feature (industry standard).

---

## Iteration Workflow Pattern

```
1. Create feature branch from main
2. Generate wireframe for UI work (save to .specs/wireframes/)
3. Implement features
4. Test functionality
5. Self-review code
6. Commit with clear message
7. Create pull request
8. Merge after approval
9. Next iteration branches from updated main
```

---

## Pull Request Strategy

**Industry Standard: One PR per screen/feature**
- Each iteration gets its own feature branch
- Commit frequently with descriptive messages
- Create PR when iteration is complete and demo-ready
- PR includes: code, tests (if applicable), wireframe reference
- Merge after review
- Next iteration starts from updated main branch

---

## Phase 1: Core Infrastructure & Quick Wins

### **Iteration 1.1: Project Initialization & Brand Setup**
**Branch:** `feat/project-init`
**Time Estimate:** 3-4 hours
**Demo-Ready:** ⚠️ Partial (project runs, styling applied)

#### Goal
Initialize Next.js project, install dependencies, set up AugmentRisk brand styling, create basic layout structure.

#### Git Workflow
```bash
# Create new feature branch
git checkout -b feat/project-init

# After completion
git add .
git commit -m "feat: initialize Next.js project with AugmentRisk branding

- Set up Next.js 15 with TypeScript and App Router
- Install shadcn/ui, Tailwind CSS, Zustand, React Hook Form, Zod
- Configure Tailwind with AugmentRisk brand colors (dark blue/navy + white)
- Set up Roboto font family
- Create basic app layout structure

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# Create PR
gh pr create --title "Project initialization with AugmentRisk branding" --body "$(cat <<'EOF'
## Summary
- Initialize Next.js 15 project with TypeScript
- Install all required dependencies (shadcn/ui, Tailwind, Zustand, etc.)
- Configure brand styling (dark blue/navy theme from augmentrisk.com)
- Set up basic layout structure

## Testing
- [x] Project runs with `npm run dev`
- [x] Brand colors applied correctly
- [x] Roboto font loaded
- [x] Basic layout renders

🤖 Generated with Claude Code
EOF
)"
```

#### Features
- [x] Initialize Next.js 15 with TypeScript, App Router
- [x] Install dependencies: shadcn/ui, Tailwind CSS, Zustand, React Hook Form, Zod, Lucide React
- [x] Configure Tailwind with AugmentRisk brand:
  - Primary: `rgb(65, 94, 104)` (dark blue)
  - Success: `#10B981`, Warning: `#F59E0B`, Error: `#EF4444`, Info: `#3B82F6`
  - Font: Roboto (weights: 300, 400, 500, 700)
- [x] Create basic layout: `app/layout.tsx` with header, navigation, main content area
- [x] Initialize shadcn/ui components

#### API Endpoints Used
None

#### Mock Data Required
None

#### Deliverable
- Running Next.js project with brand styling
- Basic layout structure
- README with setup instructions (part 1)

---

### **Iteration 1.2: Mock API Service Setup**
**Branch:** `feat/mock-api-setup`
**Time Estimate:** 4-5 hours
**Demo-Ready:** ⚠️ Partial (API responds to health checks)

#### Goal
Create separate Express.js mock API service that implements OpenAPI specification with file-based persistence.

#### Git Workflow
```bash
git checkout main
git pull
git checkout -b feat/mock-api-setup

# After completion
git add .
git commit -m "feat: create mock API service with OpenAPI compliance

- Set up Express.js server in /api-mock directory
- Implement file-based persistence (db.json)
- Create endpoints for Beneficiaries, Payments, Approvals, Release Queue, Bank Receipts
- Add CORS configuration for frontend integration
- Implement health check endpoint

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

gh pr create --title "Mock API service with OpenAPI compliance" --body "..."
```

#### Features
- [x] Create `/api-mock` directory with package.json
- [x] Set up Express.js server with CORS
- [x] Implement file-based persistence (`/api-mock/data/db.json`)
- [x] Create endpoints matching OpenAPI spec:
  - `/beneficiaries` (GET, POST, PUT, DELETE)
  - `/beneficiaries/duplicate-check` (GET)
  - `/beneficiaries/account-verification` (GET)
  - `/payments` (GET, POST, PUT)
  - `/payments/duplicate-check` (GET)
  - `/payments/dashboard-items` (GET)
  - `/approvals` (GET)
  - `/approvals/approve` (POST)
  - `/approvals/reject` (POST)
  - `/release-queue` (GET)
  - `/release-queue/release` (POST)
  - `/release-queue/reject` (POST)
  - `/bank-receipts` (GET)
  - `/configurations` (GET, PUT)
  - `/demo/reset-demo` (POST)
- [x] Add health check endpoint (`/health`)
- [x] Configure to run on port 8080 (or configurable)
- [x] Create startup scripts in package.json

#### API Endpoints Used
All (creating them)

#### Mock Data Required
- Initial seed data with 10 beneficiaries, 10 payments
- Will be enriched in later iterations

#### Deliverable
- Functioning mock API service
- Responds to all OpenAPI endpoints
- File-based persistence working
- README updated with API startup instructions

---

### **Iteration 1.3: Layout, Navigation & Role Switcher**
**Branch:** `feat/layout-navigation`
**Time Estimate:** 4-5 hours
**Demo-Ready:** ✅ Yes (navigation works, role switching visible)

#### Wireframe
```
┌─────────────────────────────────────────────────────────────┐
│ Header (Dark Blue Background)                               │
│ ┌──────────────────┐                   ┌──────────────────┐ │
│ │ AugmentRisk Logo │                   │ [Role Switcher ▼]│ │
│ └──────────────────┘                   └──────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Navigation Bar                                              │
│ [Dashboard] [Payments ▼] [Approvals] [Release] [Bank ▼]    │
│                                      [Beneficiaries] [Config]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                     Main Content Area                       │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Git Workflow
```bash
git checkout main
git pull
git checkout -b feat/layout-navigation

# After completion - commit and create PR
```

#### Features
- [x] Create header component with AugmentRisk logo
- [x] Create role switcher dropdown in header:
  - Options: SUPER, Payment Initiator, Approver 1, Approver 2, CFO, Release Officer, Configurator
  - Zustand store for current role
  - localStorage persistence
- [x] Create navigation component with role-based filtering:
  - Dashboard (all roles except CONFIG)
  - Payments dropdown: Manual Capture, ERP Queue, Payment List (SUPER, PI only)
  - Beneficiaries dropdown: Add, List (SUPER, PI only)
  - My Approvals (SUPER, A1, A2, CFO only)
  - Release Queue (SUPER, RO only)
  - Bank dropdown: ACKs, Receipts (SUPER, CFO, RO only)
  - Configuration (SUPER, CONFIG only - edit permissions)
- [x] Create layout wrapper component
- [x] Style with AugmentRisk brand (dark blue header, white text)

#### API Endpoints Used
None (frontend only)

#### Mock Data Required
None

#### Deliverable
- Functioning navigation with role-based visibility
- Role switcher working with persistence
- Production-quality header and layout

---

### **Iteration 1.4: Dashboard with KPI Metrics**
**Branch:** `feat/dashboard`
**Time Estimate:** 5-6 hours
**Demo-Ready:** ✅ Yes (dashboard shows all metrics)

#### Wireframe
```
┌─────────────────────────────────────────────────────────────┐
│ Dashboard                              [Period: Past 7 Days ▼]│
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│ │ Ready to    │ │ Approval    │ │ Bank        │            │
│ │ Release     │ │ Required    │ │ Receipts    │            │
│ │             │ │             │ │             │            │
│ │     42      │ │     18      │ │     156     │            │
│ └─────────────┘ └─────────────┘ └─────────────┘            │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Account Verification Statistics                         │ │
│ │ [Passed: 145] [Outstanding: 23] [Failed: 8]             │ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓░░░░                                        │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│ │ Anomalies    │ │ Escalations  │ │ Near SLA     │         │
│ │ Detected     │ │ Triggered    │ │              │         │
│ │              │ │              │ │ <30min: 5    │         │
│ │      12      │ │       3      │ │ <1hr: 8      │         │
│ │              │ │              │ │ <2hr: 12     │         │
│ └──────────────┘ └──────────────┘ └──────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

#### Git Workflow
```bash
git checkout main
git pull
git checkout -b feat/dashboard

# After completion - commit and create PR
```

#### Features
- [x] Create Dashboard page (`app/page.tsx`)
- [x] Implement period filter (Today, Past 7 days, Past month, Past year)
- [x] Create KPI card components
- [x] Implement 7 metrics:
  - M1: Payments Ready to Release (clickable → Release Queue)
  - M2: Payments Requiring Approval (clickable → My Approvals)
  - M3: Receipts from Bank (clickable → Bank Receipts)
  - M4: Account Verification Statistics (stacked bar chart)
  - M5: Anomalies Detected
  - M6: Escalations Triggered
  - M7: Payments Near SLA (bar chart with 3 time ranges)
- [x] Fetch data from `/payments/dashboard-items` API endpoint
- [x] Style with brand colors and proper spacing
- [x] Add loading states

#### API Endpoints Used
- `GET /payments/dashboard-items?FromDate=YYYY-MM-DD&ToDate=YYYY-MM-DD`

#### Mock Data Required
- Dashboard metrics calculation in mock API
- Sample data to populate metrics

#### Deliverable
- Functioning dashboard with all 7 KPIs
- Period filtering working
- Clickable metrics navigation

---

### **Iteration 1.5: Demo Controls (Reset, Manual Injection)**
**Branch:** `feat/demo-controls`
**Time Estimate:** 3-4 hours
**Demo-Ready:** ✅ Yes (demo controls functional)

#### Wireframe
```
┌─────────────────────────────────────────────────────────────┐
│ Demo Controls (Floating Panel - Top Right)                 │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🎬 Demo Controls                                  [X]   │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ [Reset Demo Data]                                       │ │
│ │ Revert to known starting point                          │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ [Add Manual ERP Payment]                                │ │
│ │ Simulate incoming ERP feed                              │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ [Inject Bank Receipt]                                   │ │
│ │ Simulate bank receipt for payment                       │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### Git Workflow
```bash
git checkout main
git pull
git checkout -b feat/demo-controls

# After completion - commit and create PR
```

#### Features
- [x] Create floating demo controls panel (visible to SUPER role only)
- [x] Implement Reset Demo button:
  - Calls `POST /demo/reset-demo`
  - Shows confirmation modal
  - Reloads page after reset
- [x] Implement Add Manual ERP Payment modal:
  - Form with: Beneficiary (dropdown), Amount, Currency, Method
  - Calls `POST /payments` with `IsERP=true`
  - Adds payment to ERP queue
- [x] Implement Inject Bank Receipt modal:
  - Form with: Payment Ref (dropdown of released payments), Status, Status Reason
  - Creates bank receipt record
  - Triggers reconciliation
- [x] Style panel with brand colors
- [x] Add toggle to show/hide panel

#### API Endpoints Used
- `POST /demo/reset-demo`
- `POST /payments` (for manual ERP injection)
- `POST /bank-receipts` (for manual receipt injection - may need to add to API)

#### Mock Data Required
None (uses existing data)

#### Deliverable
- Functioning demo controls panel
- Reset demo working
- Manual ERP and receipt injection working

---

## Phase 2: Payment Creation & Approval Workflows

### **Iteration 2.1: Add Beneficiary Screen**
**Branch:** `feat/add-beneficiary`
**Time Estimate:** 5-6 hours
**Demo-Ready:** ✅ Yes (can create beneficiaries with verification)

#### Wireframe
```
┌─────────────────────────────────────────────────────────────┐
│ Add Beneficiary                                             │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Beneficiary Details                                     │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ Beneficiary Name: [___________________________________] │ │
│ │ Country:          [Great Britain ▼]                     │ │
│ │ Currency:         [GBP ▼]                               │ │
│ │                                                         │ │
│ │ [○ Domestic  ● Foreign]                                 │ │
│ │                                                         │ │
│ │ Sort Code:        [__-__-__]                            │ │
│ │ Account Number:   [________]                            │ │
│ │                                                         │ │
│ │ IBAN:             [__________________________________]  │ │
│ │ BIC/SWIFT:        [___________]                         │ │
│ │                                                         │ │
│ │ Address Line 1:   [___________________________________] │ │
│ │ City:             [___________________________________] │ │
│ │ Postal Code:      [__________]                          │ │
│ │ Contact Email:    [___________________________________] │ │
│ │                                                         │ │
│ │ Active Status:    [✓] Active                            │ │
│ │                                                         │ │
│ │              [Cancel]  [Save & Verify]                  │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### Git Workflow
```bash
git checkout main
git pull
git checkout -b feat/add-beneficiary

# After completion - commit and create PR
```

#### Features
- [x] Create Add Beneficiary page (`app/beneficiaries/add/page.tsx`)
- [x] Create form with React Hook Form + Zod validation:
  - Beneficiary Name (required, max 140 chars)
  - Country (required, dropdown with ISO codes)
  - Currency (required, dropdown with ISO codes)
  - Domestic/Foreign toggle (derived from country)
  - Sort Code (required if Domestic, NN-NN-NN format)
  - Account Number (required if Domestic, 8 digits)
  - IBAN (required if Foreign, max 34 chars)
  - BIC/SWIFT (required if Foreign, 8 or 11 chars)
  - Address Line 1, City, Postal Code (optional)
  - Contact Email (optional, email validation)
  - Active Status (toggle, default true)
- [x] Implement conditional field visibility (Domestic vs Foreign)
- [x] Implement Save & Verify flow:
  1. Call `GET /beneficiaries/duplicate-check` (before save)
  2. If duplicate: Show warning, mark inactive, set verification note
  3. Call `GET /beneficiaries/account-verification`
  4. Call `POST /beneficiaries` with verification results
  5. Show success/failure message with verification status
- [x] Style form with shadcn/ui components

#### API Endpoints Used
- `GET /beneficiaries/duplicate-check?Currency=X&AccountNumber=Y&SortCode=Z&IBAN=I&SwiftCode=S`
- `GET /beneficiaries/account-verification?BeneficiaryName=X&Currency=Y&...`
- `POST /beneficiaries` (with `IncomingUser` header)

#### Mock Data Required
- Duplicate check logic in mock API
- Account verification logic (CoP/IBAN rules)

#### Deliverable
- Functioning Add Beneficiary screen
- Duplicate detection working
- Account verification working with simulated rules

---

### **Iteration 2.2: Beneficiary List Screen**
**Branch:** `feat/beneficiary-list`
**Time Estimate:** 3-4 hours
**Demo-Ready:** ✅ Yes (can view and manage beneficiaries)

#### Wireframe
```
┌─────────────────────────────────────────────────────────────┐
│ Beneficiaries                                    [+ Add New] │
├─────────────────────────────────────────────────────────────┤
│ Filter: [● Active  ○ All  ○ Inactive]                       │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Name             │ Country │ Currency │ Verification │   ││
│ ├─────────────────────────────────────────────────────────┤ │
│ │ ACME Ltd         │ GB      │ GBP      │ ✓ Passed     │[≡]││
│ │ Global Parts GmbH│ DE      │ EUR      │ ✓ Passed     │[≡]││
│ │ Test Vendor Ltd  │ GB      │ GBP      │ ✗ Failed     │[≡]││
│ │ ...              │         │          │              │   ││
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### Git Workflow
```bash
git checkout main
git pull
git checkout -b feat/beneficiary-list

# After completion - commit and create PR
```

#### Features
- [x] Create Beneficiary List page (`app/beneficiaries/list/page.tsx`)
- [x] Implement data table with columns:
  - Beneficiary Name
  - Country
  - Currency
  - Account Number (masked) or IBAN (partial)
  - Verification Status (with color indicator)
  - Active Status
  - Actions menu (Edit, Delete)
- [x] Implement filter: Active / All / Inactive
- [x] Fetch data from `GET /beneficiaries?IsActive=true/false`
- [x] Implement Edit action (navigate to edit form)
- [x] Implement Delete action with confirmation
- [x] Add "Add New" button (navigate to Add Beneficiary)
- [x] Style with shadcn/ui Table component

#### API Endpoints Used
- `GET /beneficiaries?IsActive=true`
- `DELETE /beneficiaries/{id}` (with `IncomingUser` header)

#### Mock Data Required
- List of beneficiaries (10-15 records)

#### Deliverable
- Functioning Beneficiary List screen
- Filter, edit, delete working

---

### **Iteration 2.3: Manual Payment Capture Screen**
**Branch:** `feat/manual-payment-capture`
**Time Estimate:** 6-7 hours
**Demo-Ready:** ✅ Yes (can create payments with verification)

#### Wireframe
```
┌─────────────────────────────────────────────────────────────┐
│ Manual Payment Capture                                      │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Payment Details                                         │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ Payment Reference: [_________________] (auto-generated) │ │
│ │ Invoice Number:    [_________________________________]  │ │
│ │ Payment Date:      [DD/MM/YYYY]                         │ │
│ │ Amount:            [£_____________]                      │ │
│ │ Currency:          [GBP ▼]                              │ │
│ │ Payment Type:      [● Domestic  ○ Foreign]              │ │
│ │                                                         │ │
│ │ Beneficiary:       [Select beneficiary... ▼]            │ │
│ │ (or enter manually)                                     │ │
│ │ Beneficiary Name:  [___________________________________]│ │
│ │ Sort Code:         [__-__-__]                           │ │
│ │ Account Number:    [________]                           │ │
│ │ IBAN:              [__________________________________] │ │
│ │ BIC/SWIFT:         [___________]                        │ │
│ │                                                         │ │
│ │ Payment Method:    [Faster Payments ▼]                  │ │
│ │ Remittance Advice: [___________________________________]│ │
│ │ Cost Centre:       [Optional ▼]                         │ │
│ │ GL Code:           [Optional ▼]                         │ │
│ │ Reason Code:       [Supplier Invoice ▼]                 │ │
│ │                                                         │ │
│ │ ⚠️ Out-of-Range Warning: Amount > £1,000,000            │ │
│ │                                                         │ │
│ │              [Cancel]  [Submit for Approval]            │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### Git Workflow
```bash
git checkout main
git pull
git checkout -b feat/manual-payment-capture

# After completion - commit and create PR
```

#### Features
- [x] Create Manual Payment Capture page (`app/payments/manual/page.tsx`)
- [x] Create comprehensive form with React Hook Form + Zod:
  - Payment Reference (auto-generated, read-only)
  - Invoice Number (required, unique)
  - Payment Date (required, date picker, default today)
  - Amount (required, > 0, decimal)
  - Currency (required, dropdown, locked GBP for domestic)
  - Payment Type (Domestic/Foreign toggle)
  - Beneficiary (searchable dropdown from beneficiaries list)
  - Manual beneficiary fields (if no beneficiary selected)
  - Payment Method (dropdown, filtered by type)
  - Remittance Advice (text area, 240 chars)
  - Cost Centre, GL Code (optional dropdowns)
  - Reason Code (required dropdown)
- [x] Implement conditional field visibility (Domestic vs Foreign)
- [x] Implement beneficiary selection auto-fill
- [x] Implement Out-of-Range warning if amount > £1,000,000
- [x] Implement Dual Authorization banner for foreign payments
- [x] Implement Submit for Approval flow:
  1. Call `GET /payments/duplicate-check`
  2. If duplicate: Show confirmation modal
  3. Call `GET /beneficiaries/account-verification` (if manual entry)
  4. Call `POST /payments`
  5. Call `POST /payments/{id}/submit-for-approval`
  6. Show success message with payment status
- [x] Style with shadcn/ui form components

#### API Endpoints Used
- `GET /beneficiaries?IsActive=true`
- `GET /payments/duplicate-check?BeneficiaryId=X&InvoiceNumber=Y&Amount=Z&Date=D`
- `GET /beneficiaries/account-verification?...`
- `POST /payments` (with `IncomingUser` header)
- `POST /payments/{id}/submit-for-approval` (with `IncomingUser` header)

#### Mock Data Required
- Payment reference generation logic
- Duplicate check logic
- Submit for approval routing logic

#### Deliverable
- Functioning Manual Payment Capture screen
- All validations working
- Submit for approval working

---

### **Iteration 2.4: ERP Inbound Queue Screen**
**Branch:** `feat/erp-queue`
**Time Estimate:** 5-6 hours
**Demo-Ready:** ✅ Yes (can view and submit ERP payments)

#### Wireframe
```
┌─────────────────────────────────────────────────────────────┐
│ ERP Inbound Queue                            [+ Add ERP Pay] │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ ERP Ref    │ Beneficiary  │ Amount │ Currency │ Method │ ││
│ ├─────────────────────────────────────────────────────────┤ │
│ │ ERP-001234 │ ACME Ltd     │ £45,000│ GBP      │ BACS   │[Submit]│
│ │ ERP-001235 │ Global Parts │ €8,500 │ EUR      │ SWIFT  │[Submit]│
│ │ ERP-001236 │ Tokyo Trading│ ¥500k  │ JPY      │ SWIFT  │[Submit]│
│ │ ...        │              │        │          │        │   ││
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

Add ERP Payment Modal:
┌─────────────────────────────────────────┐
│ Add ERP Payment               [X]       │
├─────────────────────────────────────────┤
│ Beneficiary: [Select... ▼]              │
│ Amount:      [___________]              │
│ Currency:    [GBP ▼]                    │
│ Method:      [BACS ▼]                   │
│                                         │
│          [Cancel]  [Add to Queue]       │
└─────────────────────────────────────────┘
```

#### Git Workflow
```bash
git checkout main
git pull
git checkout -b feat/erp-queue

# After completion - commit and create PR
```

#### Features
- [x] Create ERP Queue page (`app/payments/erp-queue/page.tsx`)
- [x] Implement data table with columns:
  - ERP Ref
  - Beneficiary Name
  - Amount
  - Currency
  - Method (Payment Type)
  - Status
  - Created Date
  - Submit button (row action)
- [x] Fetch data from `GET /payments?IsERP=true&Status=Received`
- [x] Implement Submit action:
  - Calls `POST /payments/{id}/submit-for-approval`
  - Updates status to "Submitted"
  - Shows success message
- [x] Implement Add ERP Payment modal:
  - Form: Beneficiary (dropdown), Amount, Currency, Method
  - Calls `POST /payments` with `IsERP=true`
  - Generates random ERP ref
  - Adds to queue
- [x] Style with shadcn/ui Table and Dialog components

#### API Endpoints Used
- `GET /payments?IsERP=true&Status=Received`
- `POST /payments` (with `IsERP=true`, `IncomingUser` header)
- `POST /payments/{id}/submit-for-approval`

#### Mock Data Required
- ERP payments in queue (5-10 records)

#### Deliverable
- Functioning ERP Queue screen
- Add ERP payment working
- Submit to workflow working

---

### **Iteration 2.5: My Approvals Screen**
**Branch:** `feat/approvals`
**Time Estimate:** 7-8 hours
**Demo-Ready:** ✅ Yes (full approval workflow functional)

#### Wireframe
```
┌─────────────────────────────────────────────────────────────┐
│ My Approvals                                                │
│ Filter: [● Pending  ○ CFO High Value  ○ Foreign  ○ Overdue] │
├─────────────────────────────────────────────────────────────┤
│ [☑️] Select All  |  [Approve Selected]  [Reject Selected]    │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │[☑] Ref      │Beneficiary│Amount │Type│Status│SLA│Action││
│ ├─────────────────────────────────────────────────────────┤ │
│ │[☑] PMT-0101 │ACME Ltd   │£25,000│DOM │Pend  │🟢 │[App][Rej]││
│ │[☑] PMT-0103 │Global GmbH│€8,500 │FOR │Pend  │🟡 │[App][Rej]││
│ │[☑] PMT-0107 │Bristol Co │£510k  │DOM │Pend  │🔴 │[App][Rej]││ (CFO req)
│ │[☑] PMT-0108 │South Coast│£1.2M  │DOM │Pend  │🔴 │[App][Rej]││ (>£1M)
│ │ ...         │           │       │    │      │   │       ││
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

CFO Confirmation Modal (for >£1M):
┌─────────────────────────────────────────┐
│ High-Value Payment Approval   [X]       │
├─────────────────────────────────────────┤
│ ⚠️ This payment exceeds £1,000,000      │
│                                         │
│ Payment: PMT-0108                       │
│ Beneficiary: South Coast Logistics      │
│ Amount: £1,200,000.00                   │
│                                         │
│ Please confirm approval of this         │
│ high-value payment.                     │
│                                         │
│          [Cancel]  [Confirm Approval]   │
└─────────────────────────────────────────┘
```

#### Git Workflow
```bash
git checkout main
git pull
git checkout -b feat/approvals

# After completion - commit and create PR
```

#### Features
- [x] Create My Approvals page (`app/approvals/page.tsx`)
- [x] Implement data table with columns:
  - Checkbox (multi-select)
  - Payment Ref (clickable to detail view)
  - Beneficiary Name
  - Amount (formatted currency)
  - Payment Type (Domestic/Foreign badge)
  - Status
  - SLA indicator (color-coded: green < 1hr, orange 1-2hr, red > 2hr)
  - Verification Status badge
  - Duplicate Flag indicator
  - Out-of-Range Flag indicator
  - Actions: Approve, Reject buttons
- [x] Implement filters:
  - Pending Approval (default)
  - CFO High Value (>£500k) - only for CFO role
  - Foreign Payments
  - Overdue (SLA exceeded)
- [x] Implement role-based visibility:
  - CFO: Show all payments, can approve all
  - A1/A2: Show all, can only approve < £500k
  - CFO toggle for >£500k only view
- [x] Implement Approve action:
  - If CFO and amount > £1M: Show confirmation modal first
  - Call `POST /approvals/approve` with array of approval IDs
  - Update status to "Approved"
  - Show success message
  - Trigger dashboard update
- [x] Implement Reject action:
  - Show modal for rejection reason/comments
  - Call `POST /approvals/reject` with approval IDs and comments
  - Update status to "Rejected"
- [x] Implement bulk actions (multi-select)
- [x] Implement SLA calculation and visual indicators
- [x] Style with color coding (green/orange/red)

#### API Endpoints Used
- `GET /approvals?Status=Pending`
- `GET /approvals?CFOHighValuePayments=true` (for CFO filter)
- `GET /approvals?PaymentType=Foreign` (for foreign filter)
- `GET /approvals?IsOverdue=true` (for overdue filter)
- `POST /approvals/approve` (with `IncomingUser` header, `ApprovalIds` array)
- `POST /approvals/reject` (with `IncomingUser` header, `ApprovalIds` array)

#### Mock Data Required
- Approvals in queue (10-15 records with varying amounts/types)
- SLA deadline calculation

#### Deliverable
- Functioning My Approvals screen
- All filters working
- Approve/Reject with business rules enforced
- CFO confirmation modal for >£1M
- Bulk actions working

---

## Phase 3: Release & Reconciliation

### **Iteration 3.1: Payment Release Queue Screen**
**Branch:** `feat/release-queue`
**Time Estimate:** 6-7 hours
**Demo-Ready:** ✅ Yes (can release payments in batches)

#### Wireframe
```
┌─────────────────────────────────────────────────────────────┐
│ Payment Release Queue                                       │
│ Filter: [Type ▼] [Status ▼] [Date ▼] [Amount ▼] [Benef ▼]  │
├─────────────────────────────────────────────────────────────┤
│ [☑️] Select All  |  [Release Selected]  [Release All]  [Reject]│
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │[☑] Ref      │Beneficiary│Amount │Date│Method│Verif│Dup││
│ ├─────────────────────────────────────────────────────────┤ │
│ │[☑] PMT-0101 │ACME Ltd   │£25,000│10/28│FP   │✓   │   ││
│ │[☑] PMT-0103 │Global GmbH│€8,500 │10/28│SWIFT│✓   │   ││
│ │[☑] PMT-0107 │Bristol Co │£510k  │10/28│CHAPS│✓   │   ││
│ │ ...         │           │       │    │     │    │   ││
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

Release Confirmation Modal:
┌─────────────────────────────────────────┐
│ Confirm Payment Release       [X]       │
├─────────────────────────────────────────┤
│ You are about to release:               │
│                                         │
│ • 3 payments                            │
│ • Total: £543,500.00                    │
│                                         │
│ This action cannot be undone.           │
│                                         │
│          [Cancel]  [Confirm Release]    │
└─────────────────────────────────────────┘

Post-Release Modal:
┌─────────────────────────────────────────┐
│ Payments Released Successfully [X]      │
├─────────────────────────────────────────┤
│ ✓ 3 payments released                   │
│ Total: £543,500.00                      │
│ Batch ID: BATCH-00045                   │
│                                         │
│ Payments sent to bank for processing.   │
│                                         │
│                    [Close]              │
└─────────────────────────────────────────┘
```

#### Git Workflow
```bash
git checkout main
git pull
git checkout -b feat/release-queue

# After completion - commit and create PR
```

#### Features
- [x] Create Release Queue page (`app/release/page.tsx`)
- [x] Implement data table with columns:
  - Checkbox (multi-select)
  - Payment Ref (clickable to detail view)
  - Beneficiary Name
  - Amount
  - Payment Date
  - Payment Method
  - Verification Status
  - Duplicate Flag
  - Out-of-Range Flag
  - Release Status
- [x] Implement filters:
  - Payment Type (Domestic/Foreign)
  - Status (Pending/Released/Rejected)
  - Date range
  - Amount range
  - Beneficiary search
  - Default: Pending release
- [x] Implement Release Selected action:
  - Show confirmation modal with count and total
  - Call `POST /release-queue/release` with release queue IDs
  - Generate batch ID
  - Show post-release modal with batch details
  - Update status to "Released"
  - Trigger dashboard update
- [x] Implement Release All action (all pending payments in one batch)
- [x] Implement Reject action:
  - Call `POST /release-queue/reject` with IDs
  - Send back to approver
- [x] Implement Export Release (CSV download)
- [x] Style with color coding

#### API Endpoints Used
- `GET /release-queue?Status=Pending`
- `POST /release-queue/release` (with `IncomingUser` header, `ReleaseQueueIds` array)
- `POST /release-queue/reject` (with `ReleaseQueueIds` array)

#### Mock Data Required
- Approved payments in release queue (10-15 records)

#### Deliverable
- Functioning Release Queue screen
- Batch release working
- Confirmation modals working
- Export to CSV working

---

### **Iteration 3.2: Bank Acknowledgement & Receipts Screens**
**Branch:** `feat/bank-receipts`
**Time Estimate:** 6-7 hours
**Demo-Ready:** ✅ Yes (reconciliation workflow visible)

#### Wireframe
```
Bank Acknowledgements (Info Only):
┌─────────────────────────────────────────────────────────────┐
│ Bank Acknowledgements                                       │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Payment Ref │ Account   │ Amount  │ Status   │ Message ││
│ ├─────────────────────────────────────────────────────────┤ │
│ │ PMT-0101    │ ****4320  │ £25,000 │ Accepted │ -       ││
│ │ PMT-0105    │ ****8765  │ £1,500  │ Rejected │ Account ││
│ │             │           │         │          │ Closed  ││
│ │ ...         │           │         │          │         ││
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

Bank Receipts (Reconciliation):
┌─────────────────────────────────────────────────────────────┐
│ Bank Receipts                                               │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Bank Ref│Pay Ref │Benefic│Amount│Method│Match│ACK Status││
│ ├─────────────────────────────────────────────────────────┤ │
│ │ BNK-001 │PMT-0101│ACME   │£25k  │FP    │🟢M  │Accepted ││
│ │ BNK-002 │PMT-0105│Bristol│£1.5k │BACS  │🔵M  │Rejected ││ (Acct Closed)
│ │ BNK-003 │PMT-0109│Global │€30k  │SWIFT │🟡P  │Partial  ││
│ │ BNK-004 │-       │Unknown│€20k  │SWIFT │🔴U  │-        ││ (Unmatched)
│ │ ...     │        │       │      │      │    │         ││
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

Legend: 🟢 Matched/Settled | 🟡 Partial Match | 🔵 Matched but Rejected | 🔴 Unmatched
```

#### Git Workflow
```bash
git checkout main
git pull
git checkout -b feat/bank-receipts

# After completion - commit and create PR
```

#### Features
- [x] Create Bank Acknowledgements page (`app/bank/acks/page.tsx`)
  - Read-only information screen
  - Table with: Payment Ref, Account (masked), Amount, Status, Reason Code, Message
  - Fetch from `GET /bank-receipts` (filter by ACK status)
  - Style with status colors
- [x] Create Bank Receipts page (`app/bank/receipts/page.tsx`)
  - Table with: Bank Ref, Payment Ref, Beneficiary, Amount, Currency, Method, Match Status, ACK Status, Value Date
  - Color coding:
    - Green: Matched & Settled
    - Orange: Partial Match
    - Blue: Matched but Rejected (account closed, insufficient funds)
    - Red: Unmatched
  - Implement reconciliation display logic
  - Fetch from `GET /bank-receipts`
- [x] Implement mock reconciliation logic in API:
  - Primary match: Payment Ref
  - Secondary match: Beneficiary Name + Amount + Value Date
  - Multiple candidates → Partial Match
  - No match → Unmatched
- [x] Style with color-coded badges

#### API Endpoints Used
- `GET /bank-receipts`

#### Mock Data Required
- Bank receipts (10-15 records with various match statuses)

#### Deliverable
- Functioning Bank ACKs screen (info only)
- Functioning Bank Receipts screen with reconciliation
- Color-coded match statuses

---

### **Iteration 3.3: Configuration & Audit Logs Screens**
**Branch:** `feat/config-audit`
**Time Estimate:** 4-5 hours
**Demo-Ready:** ✅ Yes (configuration and audit visible)

#### Wireframe
```
Configuration Screen:
┌─────────────────────────────────────────────────────────────┐
│ System Configuration                                        │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Setting                           │ Value    │ Action   ││
│ ├─────────────────────────────────────────────────────────┤ │
│ │ CFO Approval Threshold (£)        │ 500,000  │ [Edit]   ││
│ │ Anomaly Detection Threshold (£)   │1,000,000 │ [Edit]   ││
│ │ Escalation Time Limit (hours)     │ 2        │ [Edit]   ││
│ │ CoP/Account Verification          │ ☑️ Enabled│ [Toggle] ││
│ │ Dual Auth for Foreign Payments    │ ☑️ Enabled│ [Toggle] ││
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

Audit Logs Screen:
┌─────────────────────────────────────────────────────────────┐
│ Audit Logs                                                  │
│ Filter: [Date Range ▼] [Released By ▼] [Status ▼]          │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Batch ID   │ Date     │ By      │ Count │ Total  │ Rcpt ││
│ ├─────────────────────────────────────────────────────────┤ │
│ │ BATCH-0045 │ 10/28/25 │ RO      │ 3     │ £543k  │ 3    ││
│ │ BATCH-0044 │ 10/27/25 │ RO      │ 5     │ £1.2M  │ 5    ││
│ │ ...        │          │         │       │        │      ││
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### Git Workflow
```bash
git checkout main
git pull
git checkout -b feat/config-audit

# After completion - commit and create PR
```

#### Features
- [x] Create Configuration page (`app/config/page.tsx`)
  - Table with: Setting name, Value, Edit/Toggle action
  - Fetch from `GET /configurations`
  - Implement Edit modal for numeric values
  - Implement Toggle for boolean values
  - Call `PUT /configurations/{id}` to save
  - Role-based edit permissions (SUPER, CONFIG can edit; others view-only)
  - Style with shadcn/ui components
- [x] Create Audit Logs page (`app/audit/page.tsx`)
  - Table with: Batch ID, Release Date, Released By, Number of Payments, Total Amount, Receipt Count
  - Fetch batch release history
  - Implement filters: Date range, Released by, Status
  - Download audit file action (CSV/PDF)
  - Style with shadcn/ui Table

#### API Endpoints Used
- `GET /configurations`
- `PUT /configurations/{id}` (with config value)
- Mock endpoint for batch history (may need to add)

#### Mock Data Required
- Configuration settings (5 records)
- Batch release history (5-10 records)

#### Deliverable
- Functioning Configuration screen with role-based permissions
- Functioning Audit Logs screen with filters

---

## Phase 4: Polish & Real-time Features

### **Iteration 4.1: Real-time Dashboard Updates**
**Branch:** `feat/realtime-updates`
**Time Estimate:** 3-4 hours
**Demo-Ready:** ✅ Yes (impressive real-time updates)

#### Goal
Implement pub/sub pattern so dashboard KPIs update instantly when actions occur (approve payment, release batch, etc.)

#### Git Workflow
```bash
git checkout main
git pull
git checkout -b feat/realtime-updates

# After completion - commit and create PR
```

#### Features
- [x] Create event emitter utility in frontend
- [x] Modify dashboard to subscribe to events: `payment-approved`, `payment-released`, `receipt-received`
- [x] Modify action functions to emit events after successful operations:
  - Approval screen: Emit `payment-approved` after approve
  - Release screen: Emit `payment-released` after release
  - Demo controls: Emit `receipt-received` after inject receipt
- [x] Implement dashboard auto-refresh when events received
- [x] Add visual feedback (brief highlight/animation on updated metric)
- [x] Test end-to-end real-time flow

#### API Endpoints Used
None (frontend state management)

#### Mock Data Required
None

#### Deliverable
- Dashboard updates in real-time when actions occur
- Visual feedback on updates

**Note:** Can be cut if time runs short - not critical for core demo

---

### **Iteration 4.2: Rich Mock Data & Sample Scenarios**
**Branch:** `feat/rich-mock-data`
**Time Estimate:** 3-4 hours
**Demo-Ready:** ✅ Yes (realistic data for demo)

#### Goal
Populate mock API with comprehensive, realistic data matching requirements doc scenarios

#### Git Workflow
```bash
git checkout main
git pull
git checkout -b feat/rich-mock-data

# After completion - commit and create PR
```

#### Features
- [x] Create rich beneficiary dataset (50+ records):
  - Mix of UK domestic and foreign
  - Various verification statuses (Passed, Failed, Pending)
  - Include specific test scenarios from requirements doc (V001-V012)
- [x] Create rich payment dataset (100+ records):
  - Various amounts (< £500k, £500k-£1M, > £1M)
  - Mix of domestic and foreign
  - Various statuses (Draft, Pending Approval, Approved, Released, Settled)
  - Include specific test scenarios from requirements doc (PMT-000101 to PMT-000115)
- [x] Create bank receipts dataset (20+ records):
  - Matched, Unmatched, Partial matches
  - Various ACK statuses (Accepted, Rejected, Pending)
- [x] Create batch release history (10+ records)
- [x] Ensure data aligns with requirements doc test scenarios
- [x] Test data variety (edge cases, thresholds, anomalies)

#### API Endpoints Used
None (mock data setup)

#### Mock Data Required
All (comprehensive dataset)

#### Deliverable
- Realistic, comprehensive mock data
- All test scenarios from requirements doc covered

---

### **Iteration 4.3: UI Polish & Loading States**
**Branch:** `feat/ui-polish`
**Time Estimate:** 3-4 hours
**Demo-Ready:** ✅ Yes (production-quality UI)

#### Goal
Add final UI polish, animations, loading states, error handling, responsive design

#### Git Workflow
```bash
git checkout main
git pull
git checkout -b feat/ui-polish

# After completion - commit and create PR
```

#### Features
- [x] Add loading spinners/skeletons to all data tables
- [x] Add error states with retry buttons
- [x] Implement smooth transitions and animations
- [x] Add toast notifications for success/error messages
- [x] Verify color coding consistency (green/orange/red/blue)
- [x] Add hover states and tooltips where helpful
- [x] Test responsive design (desktop focus, but basic mobile awareness)
- [x] Add empty states ("No payments found") with helpful messages
- [x] Polish spacing, alignment, typography
- [x] Final brand consistency check

#### API Endpoints Used
None (UI only)

#### Mock Data Required
None

#### Deliverable
- Production-quality UI polish
- Smooth, professional user experience

---

### **Iteration 4.4: Documentation & Demo Preparation**
**Branch:** `docs/readme-and-demo-guide`
**Time Estimate:** 2-3 hours
**Demo-Ready:** ✅ Yes (ready to present)

#### Goal
Create comprehensive documentation and demo walkthrough guide

#### Git Workflow
```bash
git checkout main
git pull
git checkout -b docs/readme-and-demo-guide

# After completion - commit and create PR
```

#### Features
- [x] Create comprehensive README.md:
  - Project overview
  - Technology stack
  - Setup instructions (frontend + mock API)
  - Environment variables (if any)
  - Running the application
  - Troubleshooting
- [x] Create DEMO_GUIDE.md:
  - Recommended demo narrative (10-15 min walkthrough)
  - Key features to highlight
  - Role switching sequence
  - Sample data to use
  - Common demo pitfalls to avoid
- [x] Document API endpoints (in api-mock README)
- [x] Create architecture diagram (simple ASCII or link to Excalidraw)
- [x] Final testing checklist

#### API Endpoints Used
None

#### Mock Data Required
None

#### Deliverable
- Complete README with clear setup instructions
- Demo walkthrough guide
- Architecture documentation

---

## Benefits of Iterative Approach

1. **Early Feedback** - Show progress after each iteration, course-correct quickly
2. **Risk Mitigation** - Identify blockers early, adjust plan before deadline
3. **Demo-Ready Increments** - Can demo partial system if needed
4. **Clear Progress** - Easy to see what's done vs. what remains
5. **Parallel Opportunities** - Some iterations can run in parallel if needed
6. **Quality Focus** - Each iteration is complete and tested before moving on

---

## Communication Checkpoints

**After Each Iteration:**
- ✅ Create PR with clear description
- ✅ Request review (or self-merge if approved)
- ✅ Brief update on progress and any blockers
- ✅ Confirm next iteration priority

**Daily Check-ins:**
- End of day: Summary of completed iterations
- Show demo of progress
- Discuss any plan adjustments needed
- Confirm priorities for next day

**Mid-Project Checkpoint (End of Day 2):**
- Review Phase 1 & 2 completion
- Assess if on track for Friday 9 AM deadline
- Decide if any features need to be cut or simplified
- Adjust Phase 3 & 4 plan if needed

---

## PR Checklist (Per Iteration)

Before creating PR:
- [ ] Code runs without errors
- [ ] All features in iteration scope implemented
- [ ] Basic testing completed (manual or automated)
- [ ] Code follows project conventions (TypeScript strict mode, ESLint)
- [ ] No console errors in browser
- [ ] Styling matches AugmentRisk brand
- [ ] Wireframe (if applicable) saved to `.specs/wireframes/`
- [ ] README updated (if needed)
- [ ] Self-review completed
- [ ] Commit message follows convention (feat/fix/docs: description)

---

## Next Steps

1. **Review & approve this iteration strategy**
2. **Confirm wireframe preference** (all upfront, iterative, or complex screens only)
3. **Begin Iteration 1.1** (Project Initialization & Brand Setup)
4. **Daily progress check-ins**

---

**Ready to start building?** 🚀
