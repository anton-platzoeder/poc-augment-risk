
---
subtitle: Requirements Definition
title: AugmentRisk -- Payments Workflow POC
---
# Overview

This document outlines the requirements for the AugmentRisk Payments
Workflow POC tailored for the UK market. The POC will simulate a payment
processing system that supports manual payment capture and ERP
integration, duplicate payment check, bank account verification, anomaly
detection, approval workflows, audit traceability, and dashboard
analytics.

# In Scope

- Manual Payment Capture with validation and beneficiary lookup.

- ERP payments feed simulation from inbound queue.

- Beneficiary creation and management.

- Duplicate Check engine with scoring and exception handling.

- Account Verification (CoP / IBAN / BIC).

- Approval workflow with escalation.

- Payment Release (dual auht where applicable).

- Bank Receipt ingestion (simulated) and reconciliation.

- Dashboards, KPIs, and exports (audit and operations).

# End-to-end walkthrough of the POC

The workflow defines the journey from payment creation to
reconciliation, including validation, duplicate detection, verification,
approval routing, and release.

1.  Payment originates via manual capture or ERP feed (simulated
    import).

2.  System performs duplicate checks using beneficiary, amount, date,
    and reference criteria.

3.  If duplicate is detected, user must confirm non-duplicate or send to
    exceptions queue.

4.  Account verification executes (confirmation of payee (CoP) for UK,
    IBAN/BIC check for foreign).

5.  Workflow routes payments based on rules: amount thresholds,
    currency, and country.

6.  Approval routing: Level 1, Level 2, and CFO (if \> £500,000).

7.  Foreign payments always require dual authorisation.

8.  Once approved, release officer executes payment (bank API
    integration simulation).

9.  Bank receipt ingested (Accepted, Rejected, or Partial) -- simulated
    import.

10. Receipt Reconciliation updates payment status and dashboard KPIs.

# Menu structure

The POC application will have the following main menu sections:

- Home (Dashboard screen)
- Payments
  - Manual capture (Adhoc)
  - ERP Inbound Queue (simulated feed)
- Beneficiaries
  - Add Beneficiaries
- My Approvals
- Payment Release Queue
- Bank Receipts (Bank Acks)
- Audit Logs
- Configuration

# Screens and data fields

## Manual Payment (Adhoc) Capture screen

| Field                    | Type          | Required | Control               | Source/Default     | Validation / Notes                                  |
|--------------------------|---------------|----------|-----------------------|--------------------|-----------------------------------------------------|
| Payment Reference        | String (50)   | Yes      | Text                  | User               | Unique value.                                       |
| Invoice Number           | String (50)   | Yes      | Text                  | User               | Unique value.                                       |
| Payment Date             | Date          | Yes      | Date Picker           | Today              | DD/MM/YYYY.                                         |
| Amount                   | Decimal(18,2) | Yes      | Numeric               | User               | \> 0.                                               |
| Currency                 | ISO 4217      | Yes      | Dropdown              | GBP                | Lock to GBP for domestic; allow others for foreign. |
| Domestic/Foreign         | Enum          | Yes      | Dropdown              | Domestic           | Switch toggles form fields.                         |
| Beneficiary              | Entity Ref    | No       | Dropdown (searchable) | Beneficiary Master | Optional.                                           |
| Beneficiary Account Name | String(120)   | Yes      | Text                  | User               | Editable if allowed.                                |
| Sort Code                | String(6)     | Yes      | Text                  | User               | NN-NN-NN or NNNNNN; UK format.                      |
| Account Number           | String(8)     | Yes      | Text                  | User               | 8 digits.                                           |
| IBAN                     | String(34)    | No       | Text                  | User               | Required if Foreign.                                |
| BIC/SWIFT                | String(11)    | No       | Text                  | User               | Required if Foreign.                                |
| Payment Method           | Enum          | Yes      | Dropdown              | Faster Payments    | Faster Payments, BACS, CHAPS, SWIFT.                |
| Remittance Advice        | String(240)   | No       | Text                  | User               | Shown to beneficiary.                               |
| Cost Centre              | String(20)    | No       | Dropdown              | Ref Data           | Optional for POC.                                   |
| GL Code                  | String(20)    | No       | Dropdown              | Ref Data           | Optional.                                           |
| Reason Code              | Enum          | Yes      | Dropdown              | Ref Data           | E.g., Supplier invoice, Refund, Payroll, Adhoc.     |

- Actions:
  - Run payments duplicate check (auto on submit).
  - Run account verification (auto on submit).
  - Submit for Approval.
- Validation:
  - CoP for UK (match name)
  - IBAN checksum for foreign payments
  - Sort code and Account check
  - Amount \> 0
  - Required fields present
- Rules shown:
  - Out-of-range warning if \> £1,000,000
  - If foreign payment then dual approval banner must be shown.
- Each payment must have a payment details screen showing all the
  details of the selected payment. The payment must have a payment
  status showing where in the process the payment is (Pending Approval,
  Pending Release, Released, Pending Acknowledgement, Pending Receipt,
  Settled)

## ERP Inbound queue screen

| Field                 | Type                                                        | Required | Source / Default                        | Validation / Notes                                                                   |
|-----------------------|-------------------------------------------------------------|----------|-----------------------------------------|--------------------------------------------------------------------------------------|
| ERP Ref               | String (50)                                                 | Yes      | Generated random reference number       | Must be unique per inbound record; duplicates rejected.                              |
| Beneficiary Name      | String (120)                                                | Yes      | From Beneficiary Master lookup          | Must match an existing active Beneficiary                                            |
| Amount                | Decimal (18,2)                                              | Yes      | From ERP feed or manual entry           | Must be \> 0; currency format GBP for domestic or foreign currency per Beneficiary.  |
| Currency              | ISO 4217 Code (3 chars)                                     | Yes      | From ERP feed / Beneficiary default     | Must be valid ISO currency code (e.g. GBP, EUR, USD).                                |
| Method (Payment Type) | Enum (Faster Payments / BACS / CHAPS / SWIFT)               | Yes      | From ERP feed or selected from dropdown | Valid methods depend on Payment Type -- SWIFT only for foreign; others for domestic. |
| Status                | Enum (Received / Validated / Error / Submitted / Processed) | Yes      | System-derived                          | Updates automatically as payment progresses through validation and workflow.         |
| Created               | DateTime (DD/MM/YYYY HH:MM)                                 | Yes      | System-generated                        | Read-only audit field; used for ageing and queue filters.                            |

- Grid of inbound payments with columns:
  - ERP Ref
  - Beneficiary name
  - Amount
  - Currency
  - Method (payment type)
  - Status
  - Created
- Row actions:
  - Submit to Workflow
- Actions:
  - Add new ERP payment. Allows the user to capture a new ERP payment.
  - On save -- payment must be ready in grid for user to add to the
    workflow.
- Each payment must have a payment details screen showing all the
  details of the selected payment. The payment must have a payment
  status showing where in the process the payment is (Pending Approval,
  Pending Release, Released, Pending Acknowledgement, Pending Receipt,
  Settled, etc)

## Add Beneficiary screen

| Field                            | Type                             | Required           | Source / Default                       | Validation / Notes                                                                    |
|----------------------------------|----------------------------------|--------------------|----------------------------------------|---------------------------------------------------------------------------------------|
| Beneficiary Name                 | String (140)                     | Yes                | User input                             | Must be legal entity or individual name; used for Confirmation of Payee (CoP) match.  |
| Sort Code                        | String (6)                       | Yes (for Domestic) | User input                             | UK format NN-NN-NN or NNNNNN; required for GBP payments.                              |
| Account Number                   | String (8)                       | Yes (for Domestic) | User input                             | Must be 8 digits                                                                      |
| IBAN                             | String (34)                      | Yes (for Foreign)  | User input                             | Must pass IBAN checksum; first two letters = country code.                            |
| BIC / SWIFT                      | String (11)                      | Yes (for Foreign)  | User input                             | Must be 8 or 11 characters (A--Z, 0--9); validates bank code.                         |
| Currency                         | ISO 4217 Code (3 chars)          | Yes                | User input                             | Must be valid ISO code (e.g. GBP, EUR, USD); default to Beneficiary country currency. |
| Country                          | ISO 3166 Code (2 chars)          | Yes                | User selection / auto from IBAN prefix | Used to classify Domestic vs Foreign and drive dual auth rule.                        |
| Active Status                    | Boolean (Toggle)                 | Yes                | Default = Active                       | Inactive beneficiaries hidden from dropdown lists.                                    |
| Address Line 1 / City / Postcode | Strings                          | Optional           | User input                             |                                                                                       |
| Contact Email                    | String (120)                     | Optional           | User input                             | Must be valid email format; used for remittance advice.                               |
| Verification Status              | Enum (Pending / Passed / Failed) | Yes                | System-generated (CoP / IBAN check)    | Read-only; updated when account verified.                                             |
| Verification Note                | String (250)                     | No                 | System generated                       | See UI behavior below                                                                 |
| Created / Modified By            | String (User ID)                 | Yes                | System-generated                       | For audit trail                                                                       |
| Created Date                     | DateTime                         | Yes                | System-generated                       | Timestamp for audit and reporting.                                                    |

- Actions:
  - On Save - Run duplicate check
    - Check for duplicates on account details:
      - Account number
      - IBAN
      - BIC/SWIFT
  - On Save - Run account verification check
    - Executes CoP or IBAN check
- Rules:
  - If Country = GB or IBAN prefix -- GB then Domestic, else Foreign
  - If Country != GB, then Foreign, mark beneficiary as needing dual
    authorization.
  - Currency must match beneficiary country (GBP--\>GB, EUR--\>EU,
    USD--\>US)
- UI behavior:
  - If the duplicate check fails, mark beneficiary as inactive and set
    verification note to "Possible duplicate beneficiary".
  - Account verification:
    - Pending -- CoP/IBAN check not yet passed.
    - Failed -- cannot activate until corrected.
    - Passed -- ready for use in workflow.

## My Approvals screen

| Field               | Type                                                        | Required | Source / Default                        | Validation / Notes                                                       |
|---------------------|-------------------------------------------------------------|----------|-----------------------------------------|--------------------------------------------------------------------------|
| Payment Ref         | String (50)                                                 | Yes      | Populated from payment detail           | Unique reference per payment; links to Payment Detail screen.            |
| Beneficiary Name    | String (120)                                                | Yes      | Populated from payment detail           | Read-only display field.                                                 |
| Amount              | Decimal (18,2)                                              | Yes      | Populated from payment detail           | Used to drive approval routing logic (CFO threshold, out-of-range flag). |
| Currency            | ISO 4217 Code (3 chars)                                     | Yes      | Populated from payment detail           | Display only.                                                            |
| Payment Type        | Enum (Domestic / Foreign)                                   | Yes      | Populated from payment detail           | Used to enforce dual auth rule for Foreign payments.                     |
| Status              | Enum (Pending / Approved / Rejected / Escalated / Released) | Yes      | System-managed                          | Updates dynamically based on workflow stage.                             |
| Created By          | String (User ID / Name)                                     | Yes      | From Payment Capture                    | Read only                                                                |
| Created Date        | DateTime                                                    | Yes      | System timestamp                        | Used for SLA ageing & escalation triggers.                               |
| Verification Status | Enum (Passed / Failed / Pending / Inconclusive)             | Yes      | From Account Verification service       | Read-only; informs approver decision.                                    |
| Duplicate Flag      | Boolean                                                     | Yes      | From Duplicate Check logic              | "True" indicates potential duplicate; visual badge in UI                 |
| Out-of-Range Flag   | Boolean                                                     | Yes      | System-derived                          | Highlight if amount \> £1,000,000.                                       |
| Comments / Notes    | Text                                                        | Optional | User input                              | Approver remarks (required on rejection).                                |
| Approval Deadline   | DateTime                                                    | Yes      | System-calculated (Created + SLA hours) | Used for auto-escalation if not actioned within SLA (2h).                |

- Actions:
  - Multi-select for bulk approval.
  - Approval of a payment moves the payment to the release queue.
  - Rejection, send payment back to ERP queue, or back to payment
    initiator.
- Rules
  - If logged in user is the CFO, show all payments for approval
  - If logged in user is CFO, provide toggle to show only \>500 000
    payments
  - If logged in user is NOT the CFO, show all payments, but don't allow
    approval of payments \> 500 000.
  - If any payment is \>1 000 000, highlight payment. Payment is only
    allowed to be approved by CFO.
  - If logged in user is CFO and payment is \> 1 000 000, on approval
    show modal confirming the payment.
- UI behavior
  - Colour coding of payments according to status:
    - Green -- Approved
    - Orange - Pending within SLA
    - Red -- Pending outside of SLA (Overdue)
    - Grayed out -- Rejected
  - Filter options:
    - All payments
    - CFO -- High Value (\>500k)
    - Foreign Payments
    - Overdue
    - Pending Approval (Default)

## Payment Release Queue screen (Must Have)

This screen contains all the fields from the My Approvals screen with
the below additional fields:

| Field            | Type                                          | Required | Source / Default                 | Validation / Notes                  |
|------------------|-----------------------------------------------|----------|----------------------------------|-------------------------------------|
| Release Status   | Enum (Pending / Released / Failed / Rejected) | Yes      | System-managed                   | Updates dynamically after release.  |
| Released By      | String                                        | Optional | Populated when payment released  | Read-only after release.            |
| Released Date    | DateTime                                      | Optional | Populated when payment released  | Read-only after release.            |
| Release Batch ID | String (50)                                   | Optional | Auto-generated per release batch | Used for export and reconciliation. |

- Actions:
  - Click on Payment Ref opens the full details of the payment and all
    the history of the approvals, notes (if available).
  - Multi select to create a batch payment release
  - Release -- send payments to bank via API (simulated) and updates the
    Release status.
  - Release All -- groups all payments into a single batch and does the
    release, updates the Release Status.
  - Reject -- send payment back to approver.
  - Export Release -- creates a CSV file with all payments and details.
- Filter:
  - Payment type
  - Status
  - Date
  - Amount
  - Beneficiary
  - Default filter -- Pending release
- UI behavior:
  - Release confirmation
    - When Release or Release All is clicked display a modal that shows:
    - "You are about to release payment **PMT-000102** to **ACME LTD**
      for £600,000.  
      This action cannot be undone. Proceed?"
    - Requires click on **Confirm Release**.
  - When Release or Release All is clicked, and confirmed display a
    modal that shows:
    - Number of payments released
    - Total amount
    - Batch ID

## Bank Acknowledgement screen (Combine with Bank Receipts)

| Field                           | Description                             | Example / Notes                                     |
|---------------------------------|-----------------------------------------|-----------------------------------------------------|
| PaymentReference                | Unique ID per transaction from payment  | PMT00012345                                         |
| AccountNumber / SortCode / IBAN | Beneficiary account details             | Masked for privacy in some ACKs                     |
| Amount                          | Payment amount                          | 5000.00                                             |
| Currency                        | Transaction currency                    | GBP                                                 |
| Status                          | Bank processing status                  | Accepted, Rejected, Pending                         |
| ReasonCode / RejectCode         | Code explaining a rejection or hold     | R01 / R02 / R03                                     |
| BankResponseMessage             | Text description                        | invalid account, account closed, insufficient funds |
| ReceivedTimestamp               | When the bank validated the transaction | 2025-10-21T09:35:12Z                                |

- For the POC we don't have to implement the Header or Trailer sections
  of the ACKs.
- This is only an information screen.
  - No actions required on this screen.

## Bank Receipts screen (add Bank ACKs) 

| Field              | Type                                           | Required | Source / Default                      | Validation / Notes                                                          |
|--------------------|------------------------------------------------|----------|---------------------------------------|-----------------------------------------------------------------------------|
| Receipt ID         | String (50)                                    | Yes      | Auto-generated                        | Unique identifier for each receipt record.                                  |
| Bank Ref           | String (100)                                   | Yes      | From mock bank API                    | Must be unique per bank message.                                            |
| Payment Ref        | String (50)                                    | Yes      | Matched against internal payment      | Cross-referenced with released payments                                     |
| Beneficiary Name   | String (120)                                   | Yes      | From matched payment                  | Read-only.                                                                  |
| Amount             | Decimal (18,2)                                 | Yes      | From bank message                     | Must match released payment                                                 |
| Currency           | ISO 4217 Code (3 chars)                        | Yes      | From bank message                     | Must match released payment.                                                |
| Rail / Method      | Enum (Faster / BACS / CHAPS / SWIFT)           | Yes      | From payment release                  | Used for reporting and grouping.                                            |
| ACK Status         | Enum (Accepted, Rejected, Pending)             | Yes      | From bank message                     | Reason or notes from bank                                                   |
| Status             | Enum (ACCEPTED / REJECTED / PENDING / PARTIAL) | Yes      | From bank message                     | Read only                                                                   |
| Status Reason      | String (255)                                   | Optional | From bank message                     | Explains REJECTED or PARTIAL statuses ( AccountClosed, Insufficient funds). |
| Value Date         | Date                                           | Yes      | From bank message                     | Payment settlement date.                                                    |
| Received Date      | DateTime                                       | Yes      | System timestamp on receipt ingestion | Used for ageing.                                                            |
| Matched Payment ID | String (UUID / internal ID)                    | Yes      | System-generated on match             | Used for automated linking to Payment table.                                |
| Match Status       | Enum (Matched / Unmatched / Partial)           | Yes      | System-calculated                     | Read only                                                                   |

- Actions:
  - Reconciliation:
    - Primary match is on PaymentRef
    - Secondary match is on:
      - Beneficiary name
      - Amount
      - Value date
    - If multiple candidates, mark as "Partial Match"
    - If matched, mark as "Settled"
    - If no match, mark as \"Unmatched"
- UI behavior
  - Green -- Settled
  - Orange -- Partial Match
  - Blue -- Matched, but rejected (Account closed, insufficient funds)
  - Red - Unmatched

## Audit Log screen

| Field               | Type                     | Required | Source / Default                    | Validation / Notes                                      |
|---------------------|--------------------------|----------|-------------------------------------|---------------------------------------------------------|
| Batch ID            | String (50)              | Yes      | Auto-generated during batch release | Unique identifier per release batch (e.g. BATCH-00045). |
| Release Date        | DateTime                 | Yes      | System-generated at time of release | Timestamp when batch was successfully released.         |
| Released By         | String (User Name / ID)  | Yes      | From authenticated session          | Identifies the Release Officer responsible.             |
| No. of Payments     | Integer                  | Yes      | Count of payments in batch          | Auto-calculated during batch generation.                |
| Total Amount        | Decimal (18,2)           | Yes      | Sum of all payment amounts in batch | Display formatted (e.g., £1,200,000.00).                |
| Status              | Enum (Released / Failed) | Yes      | System-managed                      | Indicates batch transmission result.                    |
| Receipt Count       | Integer                  | Optional | Derived from Bank Receipts module   | Number of receipts matched to this batch.               |
| Download Audit File | Button                   | Yes      | System-generated on release         | Enables CSV or PDF export of all payments within batch. |
| Comments / Notes    | Text                     | Optional | User entry                          | Optional remarks when creating or verifying batch.      |

- Actions
  - Select batch to download.
- Filter:
  - Release date
  - Release by
  - Status

## Configuration screen

Screen to set the values of the following:
- CFO Approval Threshold: \[Numeric, default 500 000\]
- Anomaly Detection Threshold: \[Numeric, default 1 000 000\]
- Escalation Time Limit: \[Numeric, 2h\]
- CoP/Account Verification Toggle: \[Checkbox\]
- Dual Authorisation for Foreign Payments: \[Checkbox\]

##  Home (Dashboard screen)

Screen to show the KPI metrics for a selected period. Period must be
global period for all metrics on the page.
Period values can be:
- Today
- Past 7 days
- Past month
- Past year
**M1. Payments Ready to be Released**
- **Definition:** Payment.status = \'Approved\' AND Verification.status
  = \'Passed\' AND DuplicateCheck.status = 'Passed' AND Payment.status
  IS NOT 'Released'
- **Count:** integer
- **Click-through:** opens *Release Queue* page.
**M2. Payments Requiring Approval**
- **Definition:** Payment.status IN (\'Submitted\',\'In Approval\')
  (awaiting any approver incl. CFO)
- **Count:** integer
- **Click-through:** opens My Approvals filtered by user.
**M3. Receipts from Bank**
- **Definition:** receipts ingested for period.
- **Breakdown:** total count of receipts from bank. Can be shown in
  their different statuses.
- **Click-through:** opens *Bank Receipts* screen.
**M4. Account Verification Stats (Passed, Failed, Outstanding)**
- **Definition:** verification outcomes over Last Week / Last Month /
  Last Year
- **Aggregation:** counts by outcome per period bucket
- **Graph:** stacked bar (three outcomes), toggle period
  (Week/Month/Year)
**M5. Anomalies Detected**
1.  **Definition:** count of payments with any of:
    - amount \> OUT_OF_RANGE_THRESHOLD (default £1,000,000)
    - DuplicateFlag = true
    - Verification.status = \'Failed\'
2.  **Count:** total anomalies in selected period.
**M6. Escalations Triggered**
- **Definition:** number of escalation events raised in selected period.
  - Escalation occurs when pending approval exceeds SLA_HOURS (2 hours)
- **Click-through:** opens My Approvals screen.
**M7. Payments near SLA**
- **Definition:** number of payments where the SLA is \< 2h away.
- **Graph:** Bar chart showing:
  - Payments within 30min or less of SLA
  - Payments within 1 hour or less of SLA
  - Payments within 2 hours or less of SLA
- **Click-through:** opens My Approvals screen.

# Features
## Duplicate Check

The system will detect duplicate beneficiaries and payments using exact
matching. Exact match checks fields like Beneficiary, Invoice Number,
Amount, and Date.

## Account Verification

The system will verify bank details using:

- Confirmation of Payee (CoP): Matches account holder name with bank
  records (simulated).
  - To simulate the CoP process we need to do the following:
    - If **Beneficiary Name** contains 'Test', the verification must
      fail, all other must pass.
- IBAN Validation: Checks format and country-specific rules.
  - We will simulate this as:
    - If IBAN starts with 'ZZ', verification must fail.
    - If IBAN is less than 22 chars, verification must fail.
    - All else must pass.
- Sort Code and Account Number: Validated using modulus checks and bank
  directory services (simulated)
  - If the 6-digit **Sort code** ends with '00', the verification must
    fail, all other must pass.
  - If the 8-digit **account number** ends with an odd number, the
    verification must fail.
  - If the 8-digit **account number** ends with an even number, the
    verification will pass.

## Anomaly Detection

Payments above £1,000,000 will be flagged as anomalies, and a warning
message should be shown to the user.

## Auto Escalation

Payments not approved within 2 hours (configurable) will be escalated to
the next approver or CFO.

For the POC we will make the 2 hours (120 minutes) = 2 minute (just for
demo purposes)

This must be configurable from the Configuration screen.

## CFO Approval

Payments above £500,000 cannot bypass CFO approval. The system will
enforce this rule and route such payments to the CFO user.

## Dual Authorisation for Foreign Payments

All foreign payments require dual authorisation regardless of amount.
Two separate users must approve the payment before that payment will be
moved to the release queue.

# User Roles

The following users must be configured on the application:

1.  **Super User**

Username: super

Password: 1234

Must have access to everything on the application.

2.  **Payments Initiator**

Username: pi

Password: 1234

Must be able to initiate payments (manual capture and ERP queue). No
approval or release capability. Has capability to create a new
beneficiary.

3.  **Approver 1**

Username: a1

Password: 1234

Must be able to see all payments and approve payments. No release
capability.

4.  **Approver 2**

Username: a2

Password: 1234

Must be able to see all payments and approve payments that have been
escalated to them on trigger of payment outside of SLA.

5.  **CFO**

Username: cfo

Password: 1234

Must be able to see all payments and approve all payments. Payments \>
500 000 must be assigned to the CFO for approval by default and not be
assigned to approver 1 or approver 2.

6.  **Configurator**

Username: config

Password: 1234

Must have access to change the config values on the configuration
screen.

All other users will be able to see the configuration screen and values,
but will not have the ability to update them.

7.  **Release Officer**

Username: ro

Password: 1234

Must be able to release payments in the release queue. This user will
not have the ability to capture or approve any payments, but will be
able to see all payments and payments awaiting approval.

# Sample Data

## Beneficiaries Data
| BeneficiaryID | Beneficiary Name      | Country | Currency | Sort Code | Account Number | IBAN                     | BIC/SWIFT   | Active | Expected Verification Outcome | Notes (why)                                                                                    | DB Scipt Notes                                   |
| ------------- | --------------------- | ------- | -------- | --------- | -------------- | ------------------------ | ----------- | ------ | ----------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| V001          | ACME LIMITED          | GB      | GBP      | 112233    | 12345678       | GB29NWBK60161331926819   | NWBKGB2L    | Yes    | Passed                        | Normal UK business — even acct (pass)                                                          | Pre-seed in DB for Demo                          |
| V002          | OMEGA SERVICES LTD    | GB      | GBP      | 202020    | 87654321       | GB82WEST12345698765432   | WESTGB2L    | Yes    | Inconclusive / Close          | Name slight variations in test mapping                                                         | Pre-seed in DB for Demo                          |
| V003          | GLOBAL PARTS GMBH     | DE      | EUR      |           |                | DE89370400440532013000   | COBADEFFXXX | Yes    | IBAN OK                       | Foreign (Germany) — IBAN valid                                                                 | Pre-seed in DB for Demo                          |
| V004          | TOKYO TRADING KK      | JP      | JPY      |           |                | JP00TOKO0000000000000000 | ABCJPJPKXXX | Yes    | IBAN invalid (POC rule)       | IBAN begins JP but note: POC IBAN keep length; will set fail if 'ZZ'/len checks                | Pre-seed in DB for Demo                          |
| V005          | ALPHA CONSULTING      | GB      | GBP      | 404040    | 11112222       | GB12ABCD00112233445566   | ABCEGB2L    | Yes    | Failed                        | Account ends with even? (here even => pass normally — but use Name contains "Test" rule below) | Pre-seed in DB for Demo                          |
| V006          | TEST VENDOR LIMITED   | GB      | GBP      | 557799    | 99887766       | GB44TEST12340099887766   | TESTGB2L    | Yes    | Failed                        | Name contains "Test" → verification must FAIL per POC                                          | Pre-seed in DB for Demo                          |
| V007          | BRISTOL PRINT CO      | GB      | GBP      | 557700    | 11110001       | GB55BRST55770011110001   | BRSTGB2L    | Yes    | Failed (acct odd)             | Account ends with 1 (odd) → verification fails                                                 | Pre-seed in DB for Demo                          |
| V008          | SOUTH COAST LOGISTICS | GB      | GBP      | 309060    | 1112           | GB66SOUT30906000001112   | SOUTGB2L    | Yes    | Passed                        | Account ends even → pass                                                                       | Pre-seed in DB for Demo                          |
| V009          | MADRID EXPORT SL      | ES      | EUR      |           |                | ES9121000418450200051332 | CAIXESBBXXX | Yes    | IBAN OK                       | Foreign (Spain)                                                                                | Pre-seed in DB for Demo                          |
| V010          | DUBLIN TECH IE        | IE      | EUR      |           |                | IE29AIBK93115212345678   | AIBKIE2D    | Yes    | IBAN OK                       | Foreign (Ireland)                                                                              | Pre-seed in DB for Demo                          |
| V011          | DUPLICATE ACME        | GB      | GBP      | 112233    | 12345678       | GB29NWBK60161331926819   | NWBKGB2L    | Yes    | Passed                        | Exact same account as V001 — used to test Beneficiary duplicate detection                      | EXCLUDE - this will be created in the live demo. |
| V012          | INACTIVE OLD SUPPLIER | GB      | GBP      | 660000    | 22223334       | GB55OLDR66000022223334   | OLDRGB2L    | No     | Not Applicable                | Inactive — should be hidden from dropdowns                                                     | Pre-seed in DB for Demo                          |


## Payments Data
| PaymentRef | Source                  | ERP Ref  | BeneficiaryID | Amount       | Currency | Method          | Type     | PaymentDate | Initial Status | Expected Verification Result | Duplicate?     | Requires CFO? (>£500k) | Requires Dual Auth? | Expected Bank Receipt (for test) | Demo Scenario / Notes                                                            | DB Scipt Notes                               |
| ---------- | ----------------------- | -------- | ------------- | ------------ | -------- | --------------- | -------- | ----------- | -------------- | ---------------------------- | -------------- | ---------------------- | ------------------- | -------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------- |
| PMT-000101 | Manual captured payment |          | V001          | 25,000.00    | GBP      | Faster Payments | Domestic | 20/10/2025  | Submitted      | Passed                       | No             | No                     | No                  | ACCEPTED                         | Normal domestic payment — happy path                                             | Create in live demo                          |
| PMT-000102 | Manual captured payment |          | V002          | 1,500.00     | GBP      | BACS            | Domestic | 20/10/2025  | Submitted      | Inconclusive (Close)         | No             | No                     | No                  | ACCEPTED                         | CoP CLOSE — approver override demo                                               | Create in live demo                          |
| PMT-000103 | ERP                     | ERP-1001 | V003          | 8,500.00     | EUR      | SWIFT           | Foreign  | 19/10/2025  | Received       | IBAN OK                      | No             | No                     | Yes                 | ACCEPTED                         | Foreign payment — dual-approval happy path (ERP)                                 | Pre-seed in DB for Demo                      |
| PMT-000104 | Manual captured payment |          | V004          | 12,000.00    | JPY      | SWIFT           | Foreign  | 20/10/2025  | Submitted      | IBAN invalid (POC rule)      | No             | No                     | Yes                 | REJECTED                         | IBAN invalid → blocked; creates exception                                        | Pre-seed in DB for Demo                      |
| PMT-000105 | ERP                     | ERP-1002 | V005          | 1,500.00     | GBP      | BACS            | Domestic | 20/10/2025  | Received       | Passed                       | No             | No                     | No                  | REJECTED (CoP name mismatch)     | Simulate bank reject (e.g., account closed)                                      | Pre-seed in DB for Demo                      |
| PMT-000106 | Manual captured payment |          | V006          | 2,500.00     | GBP      | Faster Payments | Domestic | 20/10/2025  | Submitted      | Failed (Name contains Test)  | No             | No                     | No                  | N/A (blocked)                    | CoP must fail and block payment                                                  | Create in live demo                          |
| PMT-000107 | Manual captured payment |          | V007          | 510,000.00   | GBP      | CHAPS           | Domestic | 20/10/2025  | Submitted      | Failed (acct odd)            | No             | Yes                    | No                  | ACCEPTED                         | \>£500k → CFO required; acct odd causes verification fail—test override path     | Create in live demo                          |
| PMT-000108 | ERP                     | ERP-1003 | V008          | 1,200,000.00 | GBP      | Faster Payments | Domestic | 20/10/2025  | Received       | Passed                       | No             | Yes                    | No                  | ACCEPTED                         | Greater than anamaly detection threshold, show warning.                          | Pre-seed in DB for Demo                      |
| PMT-000109 | Manual captured payment |          | V009          | 30,000.00    | EUR      | SWIFT           | Foreign  | 18/10/2025  | Submitted      | IBAN OK                      | No             | No                     | Yes                 | PARTIAL                          | Receipt PARTIAL to test partial reconciliation                                   | Pre-seed as PARTIAL receipt                  |
| PMT-000110 | Manual captured payment |          | V010          | 20,000.00    | EUR      | SWIFT           | Foreign  | 20/10/2025  | Submitted      | IBAN OK                      | No             | No                     | Yes                 | UNMATCHED                        | Bank receipt missing → unmatched receipt scenario                                | Pre-seed as UNMATCHED receipt                |
| PMT-000111 | ERP                     | ERP-1004 | V001          | 25,000.00    | GBP      | Faster Payments | Domestic | 20/10/2025  | Received       | Passed                       | Yes            | No                     | No                  | ACCEPTED                         | Duplicate payment (same as PMT-000101) — should flag duplicate                   | Create in live demo                          |
| PMT-000112 | Manual captured payment |          | V011          | 25,000.00    | GBP      | Faster Payments | Domestic | 20/10/2025  | Submitted      | Passed                       | No (benef dup) | No                     | No                  | ACCEPTED                         | Beneficiary duplicate (V011 matches V001 acct) — tests beneficiary dup detection | Pre-seed in DB for Demo                      |
| PMT-000113 | Manual captured payment |          | V003          | 1,250,000.00 | EUR      | SWIFT           | Foreign  | 20/10/2025  | Submitted      | IBAN OK                      | No             | Yes (CFO)              | Yes                 | ACCEPTED (but flagged)           | Anomaly (>£1,000,000) — dashboard Out-of-Range                                   | Create in live demo                          |
| PMT-000114 | Manual captured payment |          | V002          | 600,000.00   | GBP      | CHAPS           | Domestic | 20/10/2025  | Submitted      | Inconclusive                 | No             | Yes                    | No                  | REJECTED                         | \>£500k → CFO; show CFO modal on approval                                        | Pre-seed to be in CFO Approval waiting state |
| PMT-000115 | ERP                     | ERP-1005 | V008          | 5,000.00     | GBP      | Faster Payments | Domestic | 20/10/2025  | Received       | Passed                       | No             | No                     | No                  | ACCEPTED                         | Small ERP item for normal processing                                             | Pre-seed in DB for Demo                      |

## ACK Receipts
| PaymentRef | Status                    | Notes                        |
| ---------- | ------------------------- | ---------------------------- |
| PMT-000101 | ACCEPTED                  |                              |
| PMT-000105 | REJECTED (ACCOUNT CLOSED) |                              |
| PMT-000109 | PARTIAL                   |                              |
| PMT-000110 |                           | No Receipt to show UNMATCHED |

# Proof of Concept Demo Screen/Popup Options

- Button that allows one to revert back to a known starting point in terms of data via REST API call.
- Button to simulate an incoming Bank Receipt via REST API call
- Button to simulate an incoming ERP payment via REST API call