const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3005;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helper functions
function readDB() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return {
      beneficiaries: [],
      payments: [],
      approvals: [],
      releaseQueue: [],
      bankReceipts: [],
      configurations: []
    };
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing database:', error);
    return false;
  }
}

function getNextId(collection) {
  if (!collection || collection.length === 0) return 1;
  return Math.max(...collection.map(item => item.Id || 0)) + 1;
}

// Account verification simulation (POC rules)
function verifyAccount(data) {
  const { BeneficiaryName, Currency, SortCode, AccountNumber, IBAN, SwiftCode } = data;

  // CoP check for UK (contains "test" fails)
  if (Currency === 'GBP' && BeneficiaryName && BeneficiaryName.toLowerCase().includes('test')) {
    return {
      VerificationStatus: 'Failed',
      VerificationMessage: 'CoP check failed - name contains "test"'
    };
  }

  // Sort code check (ends with "00" fails)
  if (SortCode && SortCode.replace(/-/g, '').endsWith('00')) {
    return {
      VerificationStatus: 'Failed',
      VerificationMessage: 'Sort code validation failed'
    };
  }

  // Account number check (odd last digit fails)
  if (AccountNumber && parseInt(AccountNumber.slice(-1)) % 2 !== 0) {
    return {
      VerificationStatus: 'Failed',
      VerificationMessage: 'Account number validation failed'
    };
  }

  // IBAN check (starts with "ZZ" or length < 22 fails)
  if (IBAN) {
    if (IBAN.startsWith('ZZ') || IBAN.length < 22) {
      return {
        VerificationStatus: 'Failed',
        VerificationMessage: 'IBAN validation failed'
      };
    }
  }

  return {
    VerificationStatus: 'Passed',
    VerificationMessage: 'Account verification successful'
  };
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mock API is running' });
});

// ===== BENEFICIARY ENDPOINTS =====

// GET /beneficiaries
app.get('/beneficiaries', (req, res) => {
  const db = readDB();
  let beneficiaries = db.beneficiaries || [];

  // Filter by IsActive if provided
  if (req.query.IsActive !== undefined) {
    const isActive = req.query.IsActive === 'true';
    beneficiaries = beneficiaries.filter(b => b.IsActive === isActive);
  }

  res.json(beneficiaries);
});

// GET /beneficiaries/:id
app.get('/beneficiaries/:id', (req, res) => {
  const db = readDB();
  const beneficiary = db.beneficiaries.find(b => b.Id === parseInt(req.params.id));

  if (!beneficiary) {
    return res.status(404).json({ Code: 'NOT_FOUND', Message: 'Beneficiary not found' });
  }

  res.json(beneficiary);
});

// POST /beneficiaries
app.post('/beneficiaries', (req, res) => {
  const db = readDB();
  const newBeneficiary = {
    Id: getNextId(db.beneficiaries),
    ...req.body,
    IsActive: req.body.IsActive !== undefined ? req.body.IsActive : true,
    LastChangedBy: req.headers['incominguser'] || 'system',
    LastChangedDate: new Date().toISOString(),
    ValidFrom: new Date().toISOString(),
    ValidTo: '9999-12-31T23:59:59Z'
  };

  db.beneficiaries.push(newBeneficiary);
  writeDB(db);

  res.json({ Id: newBeneficiary.Id });
});

// PUT /beneficiaries/:id
app.put('/beneficiaries/:id', (req, res) => {
  const db = readDB();
  const index = db.beneficiaries.findIndex(b => b.Id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ Code: 'NOT_FOUND', Message: 'Beneficiary not found' });
  }

  db.beneficiaries[index] = {
    ...db.beneficiaries[index],
    ...req.body,
    Id: parseInt(req.params.id),
    LastChangedBy: req.headers['incominguser'] || 'system',
    LastChangedDate: new Date().toISOString()
  };

  writeDB(db);
  res.json({ message: 'Updated' });
});

// DELETE /beneficiaries/:id
app.delete('/beneficiaries/:id', (req, res) => {
  const db = readDB();
  const index = db.beneficiaries.findIndex(b => b.Id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ Code: 'NOT_FOUND', Message: 'Beneficiary not found' });
  }

  db.beneficiaries.splice(index, 1);
  writeDB(db);
  res.json({ message: 'Deleted' });
});

// GET /beneficiaries/duplicate-check
app.get('/beneficiaries/duplicate-check', (req, res) => {
  const db = readDB();
  const { AccountNumber, IBAN, SwiftCode } = req.query;

  const duplicate = db.beneficiaries.find(b =>
    (AccountNumber && b.AccountNumber === AccountNumber) ||
    (IBAN && b.IBAN === IBAN) ||
    (SwiftCode && b.SwiftCode === SwiftCode)
  );

  res.json({ IsDuplicate: !!duplicate });
});

// GET /beneficiaries/account-verification
app.get('/beneficiaries/account-verification', (req, res) => {
  const verification = verifyAccount(req.query);
  res.json(verification);
});

// ===== PAYMENT ENDPOINTS =====

// GET /payments
app.get('/payments', (req, res) => {
  const db = readDB();
  let payments = db.payments || [];

  // Filter by query parameters
  if (req.query.PaymentType) {
    payments = payments.filter(p => p.PaymentType === req.query.PaymentType);
  }
  if (req.query.Reference) {
    payments = payments.filter(p => p.Reference === req.query.Reference);
  }
  if (req.query.IsERP !== undefined) {
    const isERP = req.query.IsERP === 'true';
    payments = payments.filter(p => p.IsERP === isERP);
  }
  if (req.query.Status) {
    payments = payments.filter(p => p.Status === req.query.Status);
  }
  if (req.query.CreatedBy) {
    payments = payments.filter(p => p.CreatedBy === req.query.CreatedBy);
  }

  res.json(payments);
});

// GET /payments/:id
app.get('/payments/:id', (req, res) => {
  const db = readDB();
  const payment = db.payments.find(p => p.Id === parseInt(req.params.id));

  if (!payment) {
    return res.status(404).json({ Code: 'NOT_FOUND', Message: 'Payment not found' });
  }

  res.json(payment);
});

// POST /payments
app.post('/payments', (req, res) => {
  const db = readDB();
  const newPayment = {
    Id: getNextId(db.payments),
    Reference: req.body.Reference || `PMT-${String(getNextId(db.payments)).padStart(6, '0')}`,
    ...req.body,
    Status: 'Draft',
    IsDuplicate: false,
    ValidFrom: new Date().toISOString(),
    ValidTo: '9999-12-31T23:59:59Z',
    CreatedBy: req.headers['incominguser'] || 'system',
    CreatedDate: new Date().toISOString()
  };

  db.payments.push(newPayment);
  writeDB(db);

  res.json({ Id: newPayment.Id });
});

// PUT /payments/:id
app.put('/payments/:id', (req, res) => {
  const db = readDB();
  const index = db.payments.findIndex(p => p.Id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ Code: 'NOT_FOUND', Message: 'Payment not found' });
  }

  db.payments[index] = {
    ...db.payments[index],
    ...req.body,
    Id: parseInt(req.params.id)
  };

  writeDB(db);
  res.json({ message: 'Updated' });
});

// POST /payments/:id/submit-for-approval
app.post('/payments/:id/submit-for-approval', (req, res) => {
  const db = readDB();
  const payment = db.payments.find(p => p.Id === parseInt(req.params.id));

  if (!payment) {
    return res.status(404).json({ Code: 'NOT_FOUND', Message: 'Payment not found' });
  }

  // Update payment status
  payment.Status = 'Pending Approval';

  // Create approval record
  const newApproval = {
    Id: getNextId(db.approvals),
    Status: 'Pending',
    CreatedBy: payment.CreatedBy,
    CreatedDate: new Date().toISOString(),
    IsDuplicate: payment.IsDuplicate,
    IsOutOfRange: payment.Amount > 1000000,
    IsEscalated: false,
    Comments: '',
    Approver1: null,
    Approver2: null,
    Deadline: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    VerificationStatus: 'Pending',
    VerificationNote: '',
    PaymentRef: payment.Reference,
    BeneficiaryName: payment.BeneficiaryName,
    Amount: payment.Amount,
    Currency: payment.Currency,
    PaymentType: payment.PaymentType,
    ApprovalCount: 0,
    CfoApprovalRequired: payment.Amount >= 500000,
    CfoApproved: false,
    ApprovedCount: 0,
    ValidFrom: new Date().toISOString(),
    ValidTo: '9999-12-31T23:59:59Z'
  };

  db.approvals.push(newApproval);
  writeDB(db);

  res.json({ ApprovalId: newApproval.Id });
});

// POST /payments/:id/import-receipts
app.post('/payments/:id/import-receipts', (req, res) => {
  const db = readDB();
  const payment = db.payments.find(p => p.Id === parseInt(req.params.id));

  if (!payment) {
    return res.status(404).json({ Code: 'NOT_FOUND', Message: 'Payment not found' });
  }

  // Create mock bank receipt
  const newReceipt = {
    Id: getNextId(db.bankReceipts),
    BankRef: `BNK-${String(getNextId(db.bankReceipts)).padStart(6, '0')}`,
    MatchedPaymentId: payment.Id,
    PaymentRef: payment.Reference,
    BeneficiaryName: payment.BeneficiaryName,
    Amount: payment.Amount,
    Currency: payment.Currency,
    Method: payment.PaymentMethod,
    Status: 'ACCEPTED',
    StatusReason: '',
    ValueDate: new Date().toISOString().split('T')[0],
    ReceivedDate: new Date().toISOString(),
    MatchStatus: 'Matched',
    AckStatus: 'Accepted',
    ValidFrom: new Date().toISOString(),
    ValidTo: '9999-12-31T23:59:59Z'
  };

  db.bankReceipts.push(newReceipt);
  payment.Status = 'Settled';
  writeDB(db);

  res.json({ message: 'Receipt imported' });
});

// GET /payments/duplicate-check
app.get('/payments/duplicate-check', (req, res) => {
  const db = readDB();
  const { BeneficiaryId, InvoiceNumber, Amount, Date } = req.query;

  const duplicate = db.payments.find(p =>
    (InvoiceNumber && p.InvoiceNumber === InvoiceNumber) ||
    (BeneficiaryId && Amount && Date &&
     p.BeneficiaryId === parseInt(BeneficiaryId) &&
     p.Amount === parseFloat(Amount) &&
     p.PaymentDate === Date)
  );

  res.json({ IsDuplicate: !!duplicate });
});

// GET /payments/dashboard-items
app.get('/payments/dashboard-items', (req, res) => {
  const db = readDB();

  // Calculate dashboard metrics
  const readyToRelease = db.releaseQueue.filter(r => r.ReleaseStatus === 'Pending').length;
  const approvalRequired = db.approvals.filter(a => a.Status === 'Pending').length;
  const bankReceipts = db.bankReceipts.length;

  const dashboardData = {
    ReadyToRelease: readyToRelease,
    ApprovalRequired: approvalRequired,
    BankReceipts: bankReceipts,
    AccountVerificationStatistics: {
      Passed: { LastWeek: 145, LastMonth: 580, LastYear: 7200 },
      Outstanding: { LastWeek: 23, LastMonth: 92, LastYear: 1150 },
      Failed: { LastWeek: 8, LastMonth: 32, LastYear: 380 }
    },
    AnomaliesDetected: db.approvals.filter(a => a.IsOutOfRange).length,
    EscalationsTriggered: db.approvals.filter(a => a.IsEscalated).length,
    NearSLA: {
      Within30Minutes: 5,
      Within1Hour: 8,
      Within2Hours: 12
    }
  };

  res.json(dashboardData);
});

// ===== APPROVAL ENDPOINTS =====

// GET /approvals
app.get('/approvals', (req, res) => {
  const db = readDB();
  let approvals = db.approvals || [];

  // Filter by query parameters
  if (req.query.Status) {
    approvals = approvals.filter(a => a.Status === req.query.Status);
  }
  if (req.query.CFOHighValuePayments === 'true') {
    approvals = approvals.filter(a => a.CfoApprovalRequired);
  }
  if (req.query.PaymentType) {
    approvals = approvals.filter(a => a.PaymentType === req.query.PaymentType);
  }
  if (req.query.IsOverdue === 'true') {
    approvals = approvals.filter(a => new Date(a.Deadline) < new Date());
  }

  res.json(approvals);
});

// GET /approvals/:id
app.get('/approvals/:id', (req, res) => {
  const db = readDB();
  const approval = db.approvals.find(a => a.Id === parseInt(req.params.id));

  if (!approval) {
    return res.status(404).json({ Code: 'NOT_FOUND', Message: 'Approval not found' });
  }

  res.json(approval);
});

// POST /approvals/approve
app.post('/approvals/approve', (req, res) => {
  const db = readDB();
  const { ApprovalIds } = req.body;
  const user = req.headers['incominguser'] || 'system';

  ApprovalIds.forEach(id => {
    const approval = db.approvals.find(a => a.Id === id);
    if (approval) {
      approval.Status = 'Approved';
      approval.ApprovedCount += 1;
      if (!approval.Approver1) {
        approval.Approver1 = user;
      } else if (!approval.Approver2) {
        approval.Approver2 = user;
      }

      // Move to release queue
      const releaseItem = {
        Id: getNextId(db.releaseQueue),
        ApprovalStatus: 'Approved',
        ReleaseStatus: 'Pending',
        ReleasedBy: null,
        ReleasedDate: null,
        BatchId: null,
        PaymentRef: approval.PaymentRef,
        BeneficiaryName: approval.BeneficiaryName,
        Amount: approval.Amount,
        Currency: approval.Currency,
        PaymentType: approval.PaymentType,
        CreatedBy: approval.CreatedBy,
        CreatedDate: approval.CreatedDate,
        VerificationStatus: approval.VerificationStatus,
        DuplicateFlag: approval.IsDuplicate,
        OutOfRangeFlag: approval.IsOutOfRange,
        ValidFrom: new Date().toISOString(),
        ValidTo: '9999-12-31T23:59:59Z',
        Comments: approval.Comments,
        Deadline: approval.Deadline
      };
      db.releaseQueue.push(releaseItem);

      // Update payment status
      const payment = db.payments.find(p => p.Reference === approval.PaymentRef);
      if (payment) {
        payment.Status = 'Approved';
      }
    }
  });

  writeDB(db);
  res.json({ message: 'Approved' });
});

// POST /approvals/reject
app.post('/approvals/reject', (req, res) => {
  const db = readDB();
  const { ApprovalIds } = req.body;

  ApprovalIds.forEach(id => {
    const approval = db.approvals.find(a => a.Id === id);
    if (approval) {
      approval.Status = 'Rejected';

      // Update payment status
      const payment = db.payments.find(p => p.Reference === approval.PaymentRef);
      if (payment) {
        payment.Status = 'Rejected';
      }
    }
  });

  writeDB(db);
  res.json({ message: 'Rejected' });
});

// ===== RELEASE QUEUE ENDPOINTS =====

// GET /release-queue
app.get('/release-queue', (req, res) => {
  const db = readDB();
  let releaseQueue = db.releaseQueue || [];

  // Filter by query parameters
  if (req.query.PaymentType) {
    releaseQueue = releaseQueue.filter(r => r.PaymentType === req.query.PaymentType);
  }
  if (req.query.Status) {
    releaseQueue = releaseQueue.filter(r => r.ReleaseStatus === req.query.Status);
  }

  res.json(releaseQueue);
});

// GET /release-queue/:id
app.get('/release-queue/:id', (req, res) => {
  const db = readDB();
  const item = db.releaseQueue.find(r => r.Id === parseInt(req.params.id));

  if (!item) {
    return res.status(404).json({ Code: 'NOT_FOUND', Message: 'Release queue item not found' });
  }

  res.json(item);
});

// POST /release-queue/release
app.post('/release-queue/release', (req, res) => {
  const db = readDB();
  const { ReleaseQueueIds } = req.body;
  const user = req.headers['incominguser'] || 'system';
  const batchId = `BATCH-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;

  let totalAmount = 0;
  let count = 0;

  ReleaseQueueIds.forEach(id => {
    const item = db.releaseQueue.find(r => r.Id === id);
    if (item) {
      item.ReleaseStatus = 'Released';
      item.ReleasedBy = user;
      item.ReleasedDate = new Date().toISOString();
      item.BatchId = batchId;
      totalAmount += item.Amount;
      count++;

      // Update payment status
      const payment = db.payments.find(p => p.Reference === item.PaymentRef);
      if (payment) {
        payment.Status = 'Released';
      }
    }
  });

  writeDB(db);
  res.json({ BatchId: batchId, Count: count, TotalAmount: totalAmount });
});

// POST /release-queue/reject
app.post('/release-queue/reject', (req, res) => {
  const db = readDB();
  const { ReleaseQueueIds } = req.body;

  ReleaseQueueIds.forEach(id => {
    const item = db.releaseQueue.find(r => r.Id === id);
    if (item) {
      item.ReleaseStatus = 'Rejected';

      // Update payment status
      const payment = db.payments.find(p => p.Reference === item.PaymentRef);
      if (payment) {
        payment.Status = 'Rejected';
      }
    }
  });

  writeDB(db);
  res.json({ message: 'Rejected' });
});

// ===== BANK RECEIPT ENDPOINTS =====

// GET /bank-receipts
app.get('/bank-receipts', (req, res) => {
  const db = readDB();
  res.json(db.bankReceipts || []);
});

// ===== CONFIGURATION ENDPOINTS =====

// GET /configurations
app.get('/configurations', (req, res) => {
  const db = readDB();
  res.json(db.configurations || []);
});

// PUT /configurations/:id
app.put('/configurations/:id', (req, res) => {
  const db = readDB();
  const index = db.configurations.findIndex(c => c.Id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ Code: 'NOT_FOUND', Message: 'Configuration not found' });
  }

  db.configurations[index].Value = req.body.Value;
  writeDB(db);
  res.json({ message: 'Updated' });
});

// ===== DEMO ADMINISTRATION ENDPOINTS =====

// POST /demo/reset-demo
app.post('/demo/reset-demo', (req, res) => {
  // Reset to initial seed data
  const initialData = {
    beneficiaries: [
      {
        Id: 1,
        BeneficiaryName: "ACME LIMITED",
        SortCode: "12-34-56",
        AccountNumber: "87654320",
        IBAN: "",
        SwiftCode: "",
        Currency: "GBP",
        Country: "GB",
        IsActive: true,
        AddressLine1: "123 High Street",
        City: "London",
        PostalCode: "EC1A 1BB",
        VerificationStatus: "Passed",
        VerificationNote: "",
        LastChangedBy: "system",
        LastChangedDate: new Date().toISOString(),
        ValidFrom: new Date().toISOString(),
        ValidTo: "9999-12-31T23:59:59Z"
      }
    ],
    payments: [],
    approvals: [],
    releaseQueue: [],
    bankReceipts: [],
    configurations: [
      { Id: 1, Key: "CFO_APPROVAL_THRESHOLD", DataType: "number", Value: "500000" },
      { Id: 2, Key: "ANOMALY_DETECTION_THRESHOLD", DataType: "number", Value: "1000000" },
      { Id: 3, Key: "ESCALATION_TIME_LIMIT_HOURS", DataType: "number", Value: "2" },
      { Id: 4, Key: "COP_ACCOUNT_VERIFICATION_ENABLED", DataType: "boolean", Value: "true" },
      { Id: 5, Key: "DUAL_AUTH_FOREIGN_PAYMENTS", DataType: "boolean", Value: "true" }
    ]
  };

  writeDB(initialData);
  res.json({ message: 'Demo data reset successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Mock API server running on http://localhost:${PORT}`);
  console.log(`  Health check: http://localhost:${PORT}/health`);
});
