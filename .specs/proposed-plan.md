# AugmentRisk Payments Workflow POC - Proposed Development Plan

**Generated:** 2025-10-28
**Target Deadline:** Friday 9 AM (3.5 days)
**Purpose:** Win client engagement through capability demonstration

---

## Executive Summary

This plan delivers a **complete, production-polished payment processing POC** demonstrating end-to-end workflows from payment creation through bank reconciliation. The system will showcase AugmentRisk's understanding of the client's business, technical capabilities, and ability to deliver complex systems in tight timeframes.

**Key Success Metrics:**
- ✅ All 10 screens fully functional
- ✅ All 7 user roles with proper permissions
- ✅ Complete demo workflows (beneficiary → payment → approval → release → reconciliation)
- ✅ Production-quality UI matching AugmentRisk brand
- ✅ Clean architecture enabling easy backend integration

---

## Technical Decisions & Rationale

### Architecture

**1. Frontend: Next.js 15 with App Router**
- **Why:** Latest version, server components for performance, excellent TypeScript support
- **Benefit:** Modern, fast, production-ready foundation

**2. Mock API: Separate Express.js Service**
- **Why:** Clean separation of concerns, easy URL switchover to real backend
- **Location:** `/api-mock` directory in repository
- **Benefit:** Simulates real API calls, demonstrates integration architecture

**3. State Management: Zustand + Real-time Updates**
- **Why:** Lightweight, minimal boilerplate, easy to implement pub/sub pattern
- **Benefit:** Dashboard updates instantly when actions occur (impressive demo feature)

**4. UI: shadcn/ui + Tailwind CSS**
- **Why:** Production-quality components, highly customizable, accessible
- **Brand:** Dark blue/navy + white aesthetic matching augmentrisk.com
- **Benefit:** Polished, professional appearance

**5. Form Validation: React Hook Form + Zod**
- **Why:** Type-safe validation, excellent DX, aligns with OpenAPI schemas
- **Benefit:** Robust validation matching backend spec

**6. Data Persistence: File-based (Mock API)**
- **Why:** Allows demo state preparation, survives server restarts
- **Location:** `/api-mock/data/db.json`
- **Benefit:** Reliable demo experience, can prep state ahead of time

### Authentication Strategy

**Role Switcher Dropdown (No Login)**
- **Why:** Faster demo flow, showcases RBAC without auth complexity
- **Implementation:** Header dropdown with 7 roles (SUPER, PI, A1, A2, CFO, RO, CONFIG)
- **Benefit:** Quick role switching during demo, saves 1-2 days development time

---

## Development Phases

### **Priority 1: Core Infrastructure & Quick Wins** (Day 1-1.5)

**Goal:** Establish foundation and show early progress

**Deliverables:**
1. Project initialization (Next.js 15, TypeScript, shadcn/ui, Tailwind)
2. Mock API service with OpenAPI-compliant endpoints
3. Brand styling (AugmentRisk dark blue/navy theme)
4. Layout with header, navigation, role switcher
5. Dashboard screen with KPI cards (static first, then real-time)
6. Demo controls (reset, manual ERP/receipt injection)

**Why This First:**
- Sets visual foundation (brand, layout, navigation)
- Enables parallel development of other screens
- Dashboard shows immediate value (KPIs)
- Demo controls enable testing throughout

**Demo-Ready:** ✅ Navigation, role switching, dashboard visible

---

### **Priority 2: Payment Creation & Approval Workflows** (Day 1.5-2.5)

**Goal:** Core business workflows end-to-end

**Deliverables:**
1. **Beneficiary Management**
   - Add Beneficiary screen (with account verification)
   - Beneficiary List screen
   - Duplicate detection logic

2. **Payment Creation**
   - Manual Payment Capture screen
   - ERP Inbound Queue screen
   - Duplicate check & account verification integration

3. **Approval Workflows**
   - My Approvals screen
   - Approval routing logic (thresholds, dual auth)
   - SLA monitoring & escalation
   - CFO confirmation modal for >£1M payments

**Why This Second:**
- Core value proposition of the system
- Demonstrates complex business rules (thresholds, dual auth, SLA)
- Shows understanding of client's domain
- Enables complete workflow demo

**Demo-Ready:** ✅ Create beneficiary → Create payment → Approve payment

---

### **Priority 3: Release & Reconciliation** (Day 2.5-3)

**Goal:** Complete the payment lifecycle

**Deliverables:**
1. **Payment Release**
   - Release Queue screen
   - Batch creation & release functionality
   - Release confirmation modals
   - Export to CSV

2. **Bank Integration**
   - Bank Acknowledgement screen (read-only)
   - Bank Receipts screen
   - Receipt reconciliation logic
   - Match status indicators

3. **Supporting Screens**
   - Audit Logs screen
   - Configuration screen (with role-based edit permissions)

**Why This Third:**
- Completes end-to-end workflow
- Demonstrates reconciliation capabilities
- Shows configurability and audit trail
- Final polish for demo

**Demo-Ready:** ✅ Full lifecycle demo from creation to reconciliation

---

### **Priority 4: Polish & Real-time Features** (Day 3-3.5)

**Goal:** Production-quality finishing touches

**Deliverables:**
1. **Real-time Dashboard Updates**
   - Pub/sub pattern for KPI updates
   - Instant metric refresh when actions occur

2. **Rich Mock Data**
   - 50+ beneficiaries with variety
   - 100+ payments covering all scenarios
   - Sample data matching requirements doc scenarios

3. **UI Polish**
   - Color coding (green/orange/red/blue status indicators)
   - Animations and transitions
   - Loading states and error handling
   - Responsive design refinements

4. **Documentation**
   - Comprehensive README with setup instructions
   - API endpoint documentation
   - Demo script / walkthrough guide

**Why This Last:**
- These are "nice-to-have" enhancements
- Can be cut if time runs short
- Adds wow factor but doesn't block core demo

**Demo-Ready:** ✅ Polished, impressive, production-quality demo

---

## Demo Story Flow

### **Ideal Demo Narrative (10-15 minutes)**

**1. Introduction (Role Switcher)**
- Show header dropdown with 7 roles
- Explain role-based permissions
- Start as Payment Initiator

**2. Beneficiary Creation**
- Navigate to Add Beneficiary
- Create new beneficiary (e.g., "ACME Corp")
- Trigger account verification (CoP check)
- Show verification status (Passed)

**3. Payment Creation (Manual)**
- Navigate to Manual Payment Capture
- Select beneficiary from dropdown
- Enter payment details (£450k domestic)
- Show duplicate check (no duplicates)
- Submit for approval

**4. Approval Workflow**
- Switch to Approver 1 role
- Navigate to My Approvals
- Show payment in queue
- Approve payment
- **Dashboard updates in real-time** (Pending Approvals -1, Ready to Release +1)

**5. High-Value Payment Demo**
- Switch back to Payment Initiator
- Create £1.2M payment
- Show out-of-range warning
- Submit for approval
- Switch to CFO role
- Approve with confirmation modal

**6. Foreign Payment (Dual Auth)**
- Switch to Payment Initiator
- Create foreign payment (EUR €30k)
- Switch to Approver 1 → Approve
- Switch to Approver 2 → Approve (dual auth complete)

**7. Payment Release**
- Switch to Release Officer role
- Navigate to Release Queue
- Multi-select payments
- Create batch release
- Show release confirmation modal
- Release to bank

**8. Bank Reconciliation**
- Navigate to Bank Receipts
- Show matched receipts (green)
- Show unmatched receipt (red)
- Show partial match (orange)
- **Dashboard updates** (Receipts count increases)

**9. Demo Controls**
- Show demo reset button
- Explain ability to add manual ERP payments
- Explain ability to inject bank receipts
- Reset demo to starting state

**10. Configuration (Optional)**
- Switch to Configurator role
- Show system settings (thresholds, SLA, toggles)
- Demonstrate configurability

---

## Success Criteria (Per Phase)

### **Phase 1 Checklist:**
- [ ] Project runs on `npm run dev`
- [ ] Mock API runs separately and responds to requests
- [ ] Navigation shows all screens (with role filtering)
- [ ] Role switcher dropdown works
- [ ] Dashboard displays all 7 KPI metrics
- [ ] AugmentRisk brand styling applied
- [ ] Demo reset button functional

### **Phase 2 Checklist:**
- [ ] Can create new beneficiary with account verification
- [ ] Can create manual payment
- [ ] Can add ERP payment to queue
- [ ] Duplicate detection works
- [ ] Approval routing follows business rules
- [ ] Approver 1 can approve < £500k
- [ ] CFO can approve > £500k
- [ ] Foreign payments require dual auth
- [ ] SLA escalation logic works (demo: 2 min)
- [ ] CFO confirmation modal for >£1M

### **Phase 3 Checklist:**
- [ ] Release queue shows approved payments
- [ ] Can create batch release
- [ ] Release confirmation modal works
- [ ] Bank receipts reconcile with payments
- [ ] Match status indicators (color coded)
- [ ] Audit logs display batch history
- [ ] Configuration screen shows settings
- [ ] Configurator role can edit settings

### **Phase 4 Checklist:**
- [ ] Dashboard updates in real-time
- [ ] Mock data is rich and realistic
- [ ] All status colors correct (green/orange/red/blue)
- [ ] Loading states implemented
- [ ] Error handling graceful
- [ ] README complete with setup instructions
- [ ] Demo script documented

---

## Timeline Estimate

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| **Phase 1: Infrastructure** | 10-12 hours | Foundation + Dashboard + Demo Controls |
| **Phase 2: Core Workflows** | 18-22 hours | Beneficiary + Payment + Approval |
| **Phase 3: Release & Reconciliation** | 10-12 hours | Release + Bank Receipts + Supporting Screens |
| **Phase 4: Polish** | 6-8 hours | Real-time + Rich Data + UI Polish |
| **Total** | **44-54 hours** | **Complete POC** |

**3.5 Day Breakdown (assuming 14-16 hour days):**
- **Day 1:** Phase 1 complete + Phase 2 started
- **Day 2:** Phase 2 complete + Phase 3 started
- **Day 3:** Phase 3 complete + Phase 4 started
- **Day 3.5:** Phase 4 complete + final testing + demo prep

**Contingency Plan:**
- If behind schedule: Cut Phase 4 real-time updates
- If severely behind: Implement "Coming Soon" pattern for Audit Logs and Configuration
- Critical path: Phases 1-3 must be complete for core demo

---

## Risk Mitigation

### **Risk 1: Scope Too Large**
- **Mitigation:** Phased approach with clear priorities
- **Fallback:** Coming Soon pattern for lowest-priority screens

### **Risk 2: Technical Complexity**
- **Mitigation:** Use proven libraries (shadcn/ui, Zod, Zustand)
- **Fallback:** Simplify UI interactions if needed

### **Risk 3: Integration Issues**
- **Mitigation:** Mock API matches OpenAPI spec exactly
- **Fallback:** Hardcode data if API issues arise

### **Risk 4: Time Pressure**
- **Mitigation:** Daily check-ins, aggressive iteration planning
- **Fallback:** Cut Phase 4 polish features

---

## Next Steps

1. **Approve this plan** - Confirm scope and approach
2. **Review iteration strategy** - Detailed 4-6 hour iteration breakdowns
3. **Review wireframes** - UI/UX approval for each screen
4. **Begin Phase 1** - Initialize project and build foundation
5. **Daily check-ins** - Review progress and adjust plan

---

**Ready to proceed?** Once you approve this plan, I'll present the detailed iteration strategy with specific tasks and git workflow for each iteration.
