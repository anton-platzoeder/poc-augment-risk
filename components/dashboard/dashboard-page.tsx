'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { paymentService } from '@/lib/services';
import type { DashboardItemsRead } from '@/lib/types/api';
import { KpiCard } from './kpi-card';
import { VerificationStats } from './verification-stats';
import { SlaStats } from './sla-stats';
import { Button } from '@/components/ui/button';
import {
  Send,
  CheckSquare,
  Receipt,
  AlertTriangle,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';

export function DashboardPage() {
  const { defaultDateRange } = useAppStore();
  const [dashboard, setDashboard] = useState<DashboardItemsRead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await paymentService.getDashboard({
        FromDate: defaultDateRange.fromDate,
        ToDate: defaultDateRange.toDate,
      });
      setDashboard(data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [defaultDateRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
          <p className="text-red-600 mb-4">{error || 'Failed to load data'}</p>
          <Button onClick={fetchDashboard}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Payment processing overview and KPIs
          </p>
        </div>
        <Button onClick={fetchDashboard} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          title="Ready to Release"
          value={dashboard.ReadyToRelease}
          icon={Send}
          variant="success"
        />
        <KpiCard
          title="Approval Required"
          value={dashboard.ApprovalRequired}
          icon={CheckSquare}
          variant="warning"
        />
        <KpiCard
          title="Bank Receipts"
          value={dashboard.BankReceipts}
          icon={Receipt}
        />
        <KpiCard
          title="Anomalies Detected"
          value={dashboard.AnomaliesDetected}
          icon={AlertTriangle}
          variant={dashboard.AnomaliesDetected > 0 ? 'danger' : 'default'}
        />
        <KpiCard
          title="Escalations Triggered"
          value={dashboard.EscalationsTriggered}
          icon={TrendingUp}
          variant={dashboard.EscalationsTriggered > 0 ? 'warning' : 'default'}
        />
      </div>

      {/* Verification Statistics and SLA */}
      <div className="grid gap-4 md:grid-cols-3">
        <VerificationStats stats={dashboard.AccountVerificationStatistics} />
        <SlaStats stats={dashboard.NearSLA} />
      </div>
    </div>
  );
}
