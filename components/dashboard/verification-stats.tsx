import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DashboardItemsRead } from '@/lib/types/api';

interface VerificationStatsProps {
  stats: DashboardItemsRead['AccountVerificationStatistics'];
}

export function VerificationStats({ stats }: VerificationStatsProps) {
  const categories = [
    { label: 'Passed', data: stats.Passed, color: 'text-green-600' },
    { label: 'Outstanding', data: stats.Outstanding, color: 'text-yellow-600' },
    { label: 'Failed', data: stats.Failed, color: 'text-red-600' },
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Account Verification Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.label}>
              <div className="flex items-center justify-between mb-2">
                <span className={`font-medium ${category.color}`}>
                  {category.label}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Last Week</div>
                  <div className="text-lg font-semibold">
                    {category.data.LastWeek}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Last Month</div>
                  <div className="text-lg font-semibold">
                    {category.data.LastMonth}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Last Year</div>
                  <div className="text-lg font-semibold">
                    {category.data.LastYear}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
