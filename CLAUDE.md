# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**AugmentRisk Payments Workflow POC** - A UK-focused payment processing system demonstrating end-to-end workflow from payment creation through to bank reconciliation. This proof-of-concept showcases manual payment capture, ERP integration, multi-level approval workflows, payment release, bank acknowledgments, and receipt reconciliation.

**Current Status:** Early development phase. The OpenAPI specification is complete, but the frontend application has not yet been implemented.

## Project Structure

```
poc-augment-risk/
├── web/                    # Frontend application (not yet implemented)
│   └── documentation/      # API spec and requirements
│       ├── openapi.yml    # Complete OpenAPI 3.0.3 specification
│       └── *.docx, *.xlsx # Requirements and sample data
└── README.md              # Getting started guide
```

## Development Commands

When the Next.js application is initialized, these commands will be available:

```bash
cd web
npm install              # Install dependencies
npm run dev             # Start development server (http://localhost:3000)
npm run build           # Production build
npm start               # Run production server
npm run lint            # Run ESLint
```

## Technology Stack (Planned)

- **Framework:** Next.js 15+ with App Router
- **Language:** TypeScript (strict mode)
- **UI:** shadcn/ui (Radix UI components) + Tailwind CSS
- **Forms:** React Hook Form + Zod validation
- **State:** Zustand with localStorage persistence
- **API:** Backend defined in `documentation/openapi.yml` (not yet implemented)

## API Architecture

The backend API is fully specified in [`documentation/openapi.yml`](documentation/openapi.yml) with the following structure:

**Base URL:** `http://localhost:8040`

**Core Resources:**
- **Beneficiaries** - `/beneficiaries` - Payee management with account verification
- **Payments** - `/payments` - Payment creation, updates, and lifecycle management
- **Approvals** - `/approvals` - Multi-level approval workflow
- **Release Queue** - `/release-queue` - Payment batching and release
- **Bank Receipts** - `/bank-receipts` - Bank acknowledgments and reconciliation
- **Configuration** - `/configurations` - System settings
- **Demo Administration** - `/demo/reset-demo` - Demo data reset

**Key API Patterns:**

1. **User Context Header:** Most write operations require `IncomingUser` header for audit trail
2. **Bulk Actions:** Approval and release operations accept arrays of IDs
3. **Verification Endpoints:**
   - `/beneficiaries/account-verification` - Validate bank details before creation
   - `/beneficiaries/duplicate-check` - Prevent duplicate beneficiaries
   - `/payments/duplicate-check` - Prevent duplicate payments
4. **Dashboard Data:** `/payments/dashboard-items` returns aggregated KPIs with date range filtering

## Business Domain Model

**Payment Lifecycle:**
```
Draft → Submitted → Pending Approval → Approved → Release Queue → Released → Reconciled
```

**User Roles (Planned):**
- **Payment Initiator (PI)** - Creates payments
- **Approver 1 (A1)** - First approval level
- **Approver 2 (A2)** - Second approval level (dual authorization)
- **CFO** - High-value payment approval (£500k+)
- **Release Officer (RO)** - Batches and releases payments
- **Configurator (CONFIG)** - System settings management
- **Super User (SUPER)** - Full access for demos

**Payment Types:**
- **Domestic** - UK payments (Sort Code + Account Number)
- **Foreign** - International payments (IBAN/SWIFT)

**Approval Rules (From Requirements):**
- Domestic < £500k → Approver 1
- Domestic £500k-£1M → CFO gate
- Domestic > £1M → CFO with anomaly confirmation
- Foreign (all) → Dual Authorization (A1 + A2)

**Verification Checks:**
- Confirmation of Payee (CoP) - Name matching
- Sort Code validation
- Account Number validation
- IBAN validation
- Duplicate payment detection

## Data Model (OpenAPI Schemas)

**Key Entities:**

- **BeneficiaryRead/Write** - Payee with bank details and verification status
- **PaymentRead/Write** - Payment with beneficiary details (flattened for reads)
- **ApprovalRead** - Approval workflow with payment summary
- **ReleaseQueueRead** - Release queue items with payment details
- **BankReceiptRead** - Bank acknowledgments with match status
- **ConfigurationRead/Write** - System configuration key-value pairs

**Common Fields:**
- `ValidFrom`/`ValidTo` - Temporal validity (bi-temporal table pattern)
- `CreatedBy`/`CreatedDate` - Audit trail
- `LastChangedBy`/`LastChangedDate` - Modification tracking

**Status Enums:**
- **Payment Status:** Draft, Submitted, PendingApproval, Approved, Released, Reconciled
- **Verification Status:** Passed, Failed, Outstanding
- **Match Status:** Matched, Unmatched, PartiallyMatched
- **Ack Status:** Pending, Acknowledged, Failed

## Implementation Notes

**When Building the Frontend:**

1. **Service Layer Pattern** - Encapsulate API calls in service functions (`lib/services/`)
2. **Type Generation** - Consider generating TypeScript types from OpenAPI spec
3. **Mock Data Strategy** - Create mock implementations of API endpoints for development
4. **Form Validation** - Use Zod schemas that align with OpenAPI request bodies
5. **Error Handling** - API returns `Error` schema with `Code`, `Message`, `Details`

**Authentication & Authorization:**
- Not defined in OpenAPI spec - implement role-based access control in frontend
- User identification via `IncomingUser` header for audit purposes

**Date Handling:**
- API uses string format for dates (no specific format in spec)
- Frontend should standardize on ISO 8601 format

## Next Steps

To initialize the Next.js application:

```bash
# From web/ directory
npx create-next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*"
```

Then install additional dependencies:
```bash
npm install zustand react-hook-form zod @hookform/resolvers lucide-react
npx shadcn@latest init
```

Recommended file structure:
```
web/
├── app/                    # Next.js pages (App Router)
├── components/
│   ├── ui/                # shadcn/ui primitives
│   ├── layout/            # Header, nav, layout
│   └── [domain]/          # Feature components
├── lib/
│   ├── types/             # TypeScript types (generated from OpenAPI)
│   ├── services/          # API client and business logic
│   ├── validation/        # Zod schemas
│   ├── hooks/             # React hooks
│   └── utils/             # Helper functions
└── documentation/         # API spec (existing)
```
