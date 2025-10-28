# AugmentRisk Payments POC - Task List

**Generated:** 2025-10-28
**Target Deadline:** Friday 9 AM
**Based on:** [iteration-strategy.md](iteration-strategy.md)

---

## Project Status Overview

### Completed Phases (2/20)

✅ **Phase 1.1** - Project Initialization & Brand Setup
   - Next.js 15 with TypeScript and App Router
   - shadcn/ui, Tailwind CSS, Zustand, React Hook Form, Zod
   - AugmentRisk brand colors and styling
   - Basic app layout structure
   - Commit: `fc6970d feat: initialize Next.js project with AugmentRisk branding`

✅ **Phase 1.2** - Mock API Service Setup
   - Express.js server in `/api-mock` directory
   - File-based persistence (db.json)
   - All OpenAPI endpoints implemented
   - CORS configuration for frontend integration
   - Commit: `d6772c8 feat: create mock API service with OpenAPI compliance`

---

## Remaining Work (18/20 phases)

### **Phase 1: Core Infrastructure & Quick Wins** (3 iterations remaining)

#### 🔲 Phase 1.3: Layout, Navigation & Role Switcher
**Branch:** `feat/layout-navigation`
**Time Estimate:** 4-5 hours
**Demo-Ready:** ✅ Yes

**Tasks:**
- [ ] Create header component with AugmentRisk logo
- [ ] Create role switcher dropdown in header (7 roles: SUPER, PI, A1, A2, CFO, RO, CONFIG)
- [ ] Set up Zustand store for current role with localStorage persistence
- [ ] Create navigation component with role-based filtering
  - Dashboard (all roles except CONFIG)
  - Payments dropdown (SUPER, PI)
  - Beneficiaries dropdown (SUPER, PI)
  - My Approvals (SUPER, A1, A2, CFO)
  - Release Queue (SUPER, RO)
  - Bank dropdown (SUPER, CFO, RO)
  - Configuration (SUPER, CONFIG)
- [ ] Create layout wrapper component
- [ ] Style with AugmentRisk brand

---

#### 🔲 Phase 1.4: Dashboard with KPI Metrics
**Branch:** `feat/dashboard`
**Time Estimate:** 5-6 hours
**Demo-Ready:** ✅ Yes

**Tasks:**
- [ ] Create Dashboard page (`app/page.tsx`)
- [ ] Implement period filter (Today, Past 7 days, Past month, Past year)
- [ ] Create KPI card components
- [ ] Implement 7 metrics:
  - M1: Payments Ready to Release (clickable → Release Queue)
  - M2: Payments Requiring Approval (clickable → My Approvals)
  - M3: Receipts from Bank (clickable → Bank Receipts)
  - M4: Account Verification Statistics (stacked bar chart)
  - M5: Anomalies Detected
  - M6: Escalations Triggered
  - M7: Payments Near SLA (bar chart with 3 time ranges)
- [ ] Fetch data from `/payments/dashboard-items` API endpoint
- [ ] Add loading states
- [ ] Style with brand colors

**API Endpoints:**
- `GET /payments/dashboard-items?FromDate=YYYY-MM-DD&ToDate=YYYY-MM-DD`

---

#### 🔲 Phase 1.5: Demo Controls (Reset, Manual Injection)
**Branch:** `feat/demo-controls`
**Time Estimate:** 3-4 hours
**Demo-Ready:** ✅ Yes

**Tasks:**
- [ ] Create floating demo controls panel (SUPER role only)
- [ ] Implement Reset Demo button with confirmation modal
- [ ] Implement Add Manual ERP Payment modal
- [ ] Implement Inject Bank Receipt modal
- [ ] Style panel with brand colors
- [ ] Add toggle to show/hide panel

**API Endpoints:**
- `POST /demo/reset-demo`
- `POST /payments` (for manual ERP injection)
- `POST /bank-receipts` (for manual receipt injection)

---

### **Phase 2: Payment Creation & Approval Workflows** (5 iterations)

#### 🔲 Phase 2.1: Add Beneficiary Screen
**Branch:** `feat/add-beneficiary`
**Time Estimate:** 5-6 hours
**Demo-Ready:** ✅ Yes

**Tasks:**
- [ ] Create Add Beneficiary page (`app/beneficiaries/add/page.tsx`)
- [ ] Create form with React Hook Form + Zod validation
  - Beneficiary Name, Country, Currency
  - Domestic/Foreign toggle
  - Sort Code + Account Number (Domestic)
  - IBAN + BIC/SWIFT (Foreign)
  - Address, Email, Active Status
- [ ] Implement conditional field visibility (Domestic vs Foreign)
- [ ] Implement Save & Verify flow:
  - Duplicate check
  - Account verification (CoP/IBAN)
  - Save with verification results
- [ ] Style form with shadcn/ui components

**API Endpoints:**
- `GET /beneficiaries/duplicate-check`
- `GET /beneficiaries/account-verification`
- `POST /beneficiaries`

---

#### 🔲 Phase 2.2: Beneficiary List Screen
**Branch:** `feat/beneficiary-list`
**Time Estimate:** 3-4 hours
**Demo-Ready:** ✅ Yes

**Tasks:**
- [ ] Create Beneficiary List page (`app/beneficiaries/list/page.tsx`)
- [ ] Implement data table with columns (Name, Country, Currency, Verification, Active)
- [ ] Implement filter: Active / All / Inactive
- [ ] Fetch data from `GET /beneficiaries`
- [ ] Implement Edit action (navigate to edit form)
- [ ] Implement Delete action with confirmation
- [ ] Add "Add New" button
- [ ] Style with shadcn/ui Table component

**API Endpoints:**
- `GET /beneficiaries?IsActive=true`
- `DELETE /beneficiaries/{id}`

---

#### 🔲 Phase 2.3: Manual Payment Capture Screen
**Branch:** `feat/manual-payment-capture`
**Time Estimate:** 6-7 hours
**Demo-Ready:** ✅ Yes

**Tasks:**
- [ ] Create Manual Payment Capture page (`app/payments/manual/page.tsx`)
- [ ] Create comprehensive form with React Hook Form + Zod
  - Payment Reference (auto-generated)
  - Invoice Number, Payment Date, Amount, Currency
  - Payment Type (Domestic/Foreign)
  - Beneficiary (searchable dropdown)
  - Manual beneficiary fields
  - Payment Method, Remittance Advice
  - Cost Centre, GL Code, Reason Code
- [ ] Implement conditional field visibility
- [ ] Implement beneficiary selection auto-fill
- [ ] Implement Out-of-Range warning (>£1M)
- [ ] Implement Dual Authorization banner (foreign)
- [ ] Implement Submit for Approval flow with duplicate check
- [ ] Style with shadcn/ui form components

**API Endpoints:**
- `GET /beneficiaries?IsActive=true`
- `GET /payments/duplicate-check`
- `GET /beneficiaries/account-verification`
- `POST /payments`
- `POST /payments/{id}/submit-for-approval`

---

#### 🔲 Phase 2.4: ERP Inbound Queue Screen
**Branch:** `feat/erp-queue`
**Time Estimate:** 5-6 hours
**Demo-Ready:** ✅ Yes

**Tasks:**
- [ ] Create ERP Queue page (`app/payments/erp-queue/page.tsx`)
- [ ] Implement data table (ERP Ref, Beneficiary, Amount, Currency, Method, Status)
- [ ] Fetch data from `GET /payments?IsERP=true&Status=Received`
- [ ] Implement Submit action (submit to approval workflow)
- [ ] Implement Add ERP Payment modal
- [ ] Style with shadcn/ui Table and Dialog components

**API Endpoints:**
- `GET /payments?IsERP=true&Status=Received`
- `POST /payments` (with `IsERP=true`)
- `POST /payments/{id}/submit-for-approval`

---

#### 🔲 Phase 2.5: My Approvals Screen
**Branch:** `feat/approvals`
**Time Estimate:** 7-8 hours
**Demo-Ready:** ✅ Yes

**Tasks:**
- [ ] Create My Approvals page (`app/approvals/page.tsx`)
- [ ] Implement data table with columns (Ref, Beneficiary, Amount, Type, Status, SLA, Actions)
- [ ] Implement filters: Pending, CFO High Value, Foreign, Overdue
- [ ] Implement role-based visibility (CFO, A1, A2)
- [ ] Implement Approve action with CFO confirmation modal (>£1M)
- [ ] Implement Reject action with reason modal
- [ ] Implement bulk actions (multi-select)
- [ ] Implement SLA calculation and visual indicators (green/orange/red)
- [ ] Style with color coding

**API Endpoints:**
- `GET /approvals?Status=Pending`
- `GET /approvals?CFOHighValuePayments=true`
- `GET /approvals?PaymentType=Foreign`
- `GET /approvals?IsOverdue=true`
- `POST /approvals/approve`
- `POST /approvals/reject`

---

### **Phase 3: Release & Reconciliation** (3 iterations)

#### 🔲 Phase 3.1: Payment Release Queue Screen
**Branch:** `feat/release-queue`
**Time Estimate:** 6-7 hours
**Demo-Ready:** ✅ Yes

**Tasks:**
- [ ] Create Release Queue page (`app/release/page.tsx`)
- [ ] Implement data table with columns (Ref, Beneficiary, Amount, Date, Method, Verification, Duplicate, Status)
- [ ] Implement filters (Type, Status, Date, Amount, Beneficiary)
- [ ] Implement Release Selected action with confirmation modal
- [ ] Implement Release All action
- [ ] Implement Reject action
- [ ] Show post-release modal with batch details
- [ ] Implement Export Release (CSV download)
- [ ] Style with color coding

**API Endpoints:**
- `GET /release-queue?Status=Pending`
- `POST /release-queue/release`
- `POST /release-queue/reject`

---

#### 🔲 Phase 3.2: Bank Acknowledgement & Receipts Screens
**Branch:** `feat/bank-receipts`
**Time Estimate:** 6-7 hours
**Demo-Ready:** ✅ Yes

**Tasks:**
- [ ] Create Bank Acknowledgements page (`app/bank/acks/page.tsx`)
  - Read-only information screen
  - Table with Payment Ref, Account, Amount, Status, Message
  - Style with status colors
- [ ] Create Bank Receipts page (`app/bank/receipts/page.tsx`)
  - Table with Bank Ref, Payment Ref, Beneficiary, Amount, Method, Match Status, ACK Status
  - Color coding: Green (Matched), Orange (Partial), Blue (Matched but Rejected), Red (Unmatched)
  - Implement reconciliation display logic
- [ ] Style with color-coded badges

**API Endpoints:**
- `GET /bank-receipts`

---

#### 🔲 Phase 3.3: Configuration & Audit Logs Screens
**Branch:** `feat/config-audit`
**Time Estimate:** 4-5 hours
**Demo-Ready:** ✅ Yes

**Tasks:**
- [ ] Create Configuration page (`app/config/page.tsx`)
  - Table with Setting name, Value, Edit/Toggle action
  - Fetch from `GET /configurations`
  - Implement Edit modal for numeric values
  - Implement Toggle for boolean values
  - Role-based edit permissions (SUPER, CONFIG)
- [ ] Create Audit Logs page (`app/audit/page.tsx`)
  - Table with Batch ID, Release Date, Released By, Count, Total, Receipt Count
  - Implement filters: Date range, Released by, Status
  - Download audit file action (CSV/PDF)

**API Endpoints:**
- `GET /configurations`
- `PUT /configurations/{id}`
- Mock endpoint for batch history

---

### **Phase 4: Polish & Real-time Features** (4 iterations)

#### 🔲 Phase 4.1: Real-time Dashboard Updates
**Branch:** `feat/realtime-updates`
**Time Estimate:** 3-4 hours
**Demo-Ready:** ✅ Yes

**Tasks:**
- [ ] Create event emitter utility in frontend
- [ ] Modify dashboard to subscribe to events
- [ ] Modify action functions to emit events after operations
  - Approval screen: `payment-approved`
  - Release screen: `payment-released`
  - Demo controls: `receipt-received`
- [ ] Implement dashboard auto-refresh when events received
- [ ] Add visual feedback (brief highlight/animation)
- [ ] Test end-to-end real-time flow

**Note:** Can be cut if time runs short - not critical for core demo

---

#### 🔲 Phase 4.2: Rich Mock Data & Sample Scenarios
**Branch:** `feat/rich-mock-data`
**Time Estimate:** 3-4 hours
**Demo-Ready:** ✅ Yes

**Tasks:**
- [ ] Create rich beneficiary dataset (50+ records)
  - Mix of UK domestic and foreign
  - Various verification statuses
  - Test scenarios V001-V012 from requirements doc
- [ ] Create rich payment dataset (100+ records)
  - Various amounts (<£500k, £500k-£1M, >£1M)
  - Mix of domestic and foreign
  - Various statuses
  - Test scenarios PMT-000101 to PMT-000115
- [ ] Create bank receipts dataset (20+ records)
  - Matched, Unmatched, Partial matches
  - Various ACK statuses
- [ ] Create batch release history (10+ records)
- [ ] Ensure data aligns with requirements doc test scenarios

---

#### 🔲 Phase 4.3: UI Polish & Loading States
**Branch:** `feat/ui-polish`
**Time Estimate:** 3-4 hours
**Demo-Ready:** ✅ Yes

**Tasks:**
- [ ] Add loading spinners/skeletons to all data tables
- [ ] Add error states with retry buttons
- [ ] Implement smooth transitions and animations
- [ ] Add toast notifications for success/error messages
- [ ] Verify color coding consistency (green/orange/red/blue)
- [ ] Add hover states and tooltips
- [ ] Test responsive design (desktop focus)
- [ ] Add empty states with helpful messages
- [ ] Polish spacing, alignment, typography
- [ ] Final brand consistency check

---

#### 🔲 Phase 4.4: Documentation & Demo Preparation
**Branch:** `docs/readme-and-demo-guide`
**Time Estimate:** 2-3 hours
**Demo-Ready:** ✅ Yes

**Tasks:**
- [ ] Create comprehensive README.md
  - Project overview
  - Technology stack
  - Setup instructions (frontend + mock API)
  - Environment variables
  - Running the application
  - Troubleshooting
- [ ] Create DEMO_GUIDE.md
  - Recommended demo narrative (10-15 min)
  - Key features to highlight
  - Role switching sequence
  - Sample data to use
  - Common demo pitfalls to avoid
- [ ] Document API endpoints (in api-mock README)
- [ ] Create architecture diagram
- [ ] Final testing checklist

---

## Timeline Summary

| Phase | Duration | Status |
|-------|----------|--------|
| **Phase 1: Infrastructure** | 10-12 hours | 2/5 completed |
| **Phase 2: Core Workflows** | 18-22 hours | 0/5 started |
| **Phase 3: Release & Reconciliation** | 10-12 hours | 0/3 started |
| **Phase 4: Polish** | 6-8 hours | 0/4 started |
| **Total** | **44-54 hours** | **2/20 completed (10%)** |

---

## Next Steps

1. ✅ Review iteration strategy - DONE
2. ✅ Create task tracking file - DONE
3. 🔲 **Begin Phase 1.3** - Layout, Navigation & Role Switcher
4. 🔲 Daily progress check-ins
5. 🔲 Adjust plan as needed based on progress

---

**Last Updated:** 2025-10-28
**Progress:** 2/20 phases complete (10%)
