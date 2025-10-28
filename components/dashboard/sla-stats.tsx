import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import type { DashboardItemsRead } from '@/lib/types/api';

interface SlaStatsProps {
  stats: DashboardItemsRead['NearSLA'];
}

export function SlaStats({ stats }: SlaStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Near SLA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Within 30 Minutes
            </span>
            <span className="text-lg font-semibold text-red-600">
              {stats.Within30Minutes}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Within 1 Hour</span>
            <span className="text-lg font-semibold text-yellow-600">
              {stats.Within1Hour}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Within 2 Hours</span>
            <span className="text-lg font-semibold text-blue-600">
              {stats.Within2Hours}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
