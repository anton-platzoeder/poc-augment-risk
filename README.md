# AugmentRisk Payments Workflow POC

A production-quality payment processing system demonstrating end-to-end workflows from payment creation through to bank reconciliation.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Running the Application

**1. Install Dependencies** (first time only)

```bash
npm install
```

**2. Start the Development Server**

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000) (or 3001 if 3000 is in use).

**3. Start the Mock API Service** (in a separate terminal)

```bash
cd ../api-mock
npm install  # first time only
npm start
```

The mock API will run on [http://localhost:8080](http://localhost:8080).

## 📁 Project Structure

```
web/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with branding
│   ├── page.tsx           # Dashboard (home page)
│   └── globals.css        # Global styles
├── components/            # React components
│   └── ui/               # shadcn/ui primitives
├── lib/                  # Utilities and business logic
│   ├── types/           # TypeScript type definitions
│   ├── services/        # API client and services
│   ├── hooks/           # Custom React hooks
│   └── utils.ts         # Helper functions
├── .specs/              # Planning documents and wireframes
│   ├── proposed-plan.md
│   ├── iteration-strategy.md
│   └── wireframes/
└── documentation/       # Requirements and API specs
```

## 🛠️ Technology Stack

- **Framework:** Next.js 15.5.6 with App Router
- **Language:** TypeScript 5.x (strict mode)
- **UI Library:** shadcn/ui (Radix UI components)
- **Styling:** Tailwind CSS 3.4
- **Forms:** React Hook Form 7.65 + Zod 4.x validation
- **State Management:** Zustand 5.0
- **Icons:** Lucide React

## 🎨 Brand & Design

**AugmentRisk Brand Colors:**
- Primary: `rgb(65, 94, 104)` - Dark blue/navy
- Success: `#10B981` - Green
- Warning: `#F59E0B` - Amber
- Error: `#EF4444` - Red
- Info: `#3B82F6` - Blue

**Font:** Roboto (weights: 300, 400, 500, 700)

## 📋 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production server
npm run lint     # Run ESLint
```

## 🔧 Configuration

The application connects to the mock API service at `http://localhost:8080` by default. To change this, update the API base URL in the configuration (TBD).

## 📖 Features

- **Dashboard** - KPI metrics and system overview
- **Beneficiary Management** - Create and manage payees with account verification
- **Payment Creation** - Manual capture and ERP queue integration
- **Approval Workflows** - Multi-level approvals with SLA monitoring
- **Payment Release** - Batch release and bank integration
- **Bank Reconciliation** - Receipt matching and settlement
- **Configuration** - System settings management
- **Audit Logs** - Complete audit trail

## 👥 User Roles

- **Super User** - Full system access
- **Payment Initiator** - Create payments and beneficiaries
- **Approver 1** - Approve payments < £500k
- **Approver 2** - Second approver for foreign payments
- **CFO** - Approve high-value payments (> £500k)
- **Release Officer** - Release payments to bank
- **Configurator** - Manage system settings

## 🧪 Demo Features

The POC includes special demo controls (visible to Super User):
- **Reset Demo Data** - Restore to starting state
- **Add Manual ERP Payment** - Simulate ERP feed
- **Inject Bank Receipt** - Simulate bank responses

## 📝 Development Notes

- This is a POC using a separate mock API service
- Mock data is file-based with in-memory persistence
- Real backend integration requires pointing to production API URL
- SLA timing is set to 2 minutes for demo (production: 2 hours)

## 🤝 Contributing

This is a proof-of-concept project for client demonstration. See [.specs/iteration-strategy.md](.specs/iteration-strategy.md) for the development roadmap.

## 📄 License

Proprietary - AugmentRisk POC
