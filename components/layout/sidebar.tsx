'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  CheckSquare,
  Send,
  Receipt,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Beneficiaries',
    href: '/beneficiaries',
    icon: Users,
  },
  {
    title: 'Payments',
    href: '/payments',
    icon: CreditCard,
  },
  {
    title: 'Approvals',
    href: '/approvals',
    icon: CheckSquare,
  },
  {
    title: 'Release Queue',
    href: '/release-queue',
    icon: Send,
  },
  {
    title: 'Bank Receipts',
    href: '/bank-receipts',
    icon: Receipt,
  },
  {
    title: 'Configuration',
    href: '/configuration',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r bg-white transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    sidebarCollapsed && 'justify-center px-2'
                  )}
                  title={sidebarCollapsed ? item.title : undefined}
                >
                  <Icon className="h-5 w-5" />
                  {!sidebarCollapsed && (
                    <span className="ml-3">{item.title}</span>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={toggleSidebar}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span className="ml-2">Collapse</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
}
