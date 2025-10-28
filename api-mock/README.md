# AugmentRisk Payments Mock API

Mock API service for the AugmentRisk Payments POC. Implements all OpenAPI 3.0.3 endpoints with file-based persistence.

## Quick Start

```bash
# Install dependencies (first time only)
npm install

# Start the server
npm start

# Or run with auto-reload (development)
npm run dev
```

The API will be available at **http://localhost:8080**

## Health Check

```bash
curl http://localhost:8080/health
```

## API Endpoints

### Beneficiaries
- `GET /beneficiaries` - Get list of beneficiaries
- `GET /beneficiaries/:id` - Get beneficiary by ID
- `POST /beneficiaries` - Create new beneficiary
- `PUT /beneficiaries/:id` - Update beneficiary
- `DELETE /beneficiaries/:id` - Delete beneficiary
- `GET /beneficiaries/duplicate-check` - Check for duplicates
- `GET /beneficiaries/account-verification` - Verify account details

### Payments
- `GET /payments` - Get list of payments
- `GET /payments/:id` - Get payment by ID
- `POST /payments` - Create new payment
- `PUT /payments/:id` - Update payment
- `POST /payments/:id/submit-for-approval` - Submit for approval
- `POST /payments/:id/import-receipts` - Import bank receipt
- `GET /payments/duplicate-check` - Check for duplicate payments
- `GET /payments/dashboard-items` - Get dashboard KPIs

### Approvals
- `GET /approvals` - Get list of approvals
- `GET /approvals/:id` - Get approval by ID
- `POST /approvals/approve` - Approve payments
- `POST /approvals/reject` - Reject payments

### Release Queue
- `GET /release-queue` - Get release queue items
- `GET /release-queue/:id` - Get release queue item by ID
- `POST /release-queue/release` - Release payments in batch
- `POST /release-queue/reject` - Reject release queue items

### Bank Receipts
- `GET /bank-receipts` - Get bank receipts

### Configuration
- `GET /configurations` - Get system configurations
- `PUT /configurations/:id` - Update configuration

### Demo Administration
- `POST /demo/reset-demo` - Reset demo data to initial state

## Data Persistence

Data is stored in `data/db.json` and persists between server restarts.

## Account Verification Rules (Simulated)

### CoP (Confirmation of Payee) - UK Domestic
- **FAIL** if beneficiary name contains "test"
- **PASS** otherwise

### Sort Code - UK Domestic
- **FAIL** if 6-digit code ends with "00"
- **PASS** otherwise

### Account Number - UK Domestic
- **FAIL** if 8-digit number ends with odd digit
- **PASS** if ends with even digit

### IBAN - Foreign Payments
- **FAIL** if starts with "ZZ" or length < 22
- **PASS** otherwise

## Headers

Most write operations require the `IncomingUser` header for audit trail:

```bash
curl -X POST http://localhost:8080/beneficiaries \
  -H "Content-Type: application/json" \
  -H "IncomingUser: pi" \
  -d '{"BeneficiaryName": "ACME Corp", ...}'
```

## Example Requests

### Create Beneficiary
```bash
curl -X POST http://localhost:8080/beneficiaries \
  -H "Content-Type: application/json" \
  -H "IncomingUser: pi" \
  -d '{
    "BeneficiaryName": "ACME LIMITED",
    "SortCode": "12-34-56",
    "AccountNumber": "87654320",
    "Currency": "GBP",
    "Country": "GB"
  }'
```

### Create Payment
```bash
curl -X POST http://localhost:8080/payments \
  -H "Content-Type: application/json" \
  -H "IncomingUser: pi" \
  -d '{
    "InvoiceNumber": "INV-001",
    "PaymentDate": "2025-10-28",
    "Amount": 25000.00,
    "Currency": "GBP",
    "PaymentType": "Domestic",
    "BeneficiaryName": "ACME LIMITED",
    "SortCode": "12-34-56",
    "AccountNumber": "87654320"
  }'
```

### Get Dashboard Data
```bash
curl "http://localhost:8080/payments/dashboard-items?FromDate=2025-10-01&ToDate=2025-10-31"
```

### Reset Demo Data
```bash
curl -X POST http://localhost:8080/demo/reset-demo
```

## Technology

- **Express.js** 4.18.2
- **CORS** enabled for frontend integration
- **Body Parser** for JSON requests
- **File-based storage** (`data/db.json`)

## Port Configuration

Default port is **8080**. To change:

```bash
PORT=3002 npm start
```

## Notes

- This is a POC mock service - not production-ready
- No authentication implemented
- No request validation (assumes valid input)
- In-memory processing with file persistence
- Real backend integration requires replacing this with production API
