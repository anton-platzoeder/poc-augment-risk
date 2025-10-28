/**
 * App Store - General application state management
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // UI State
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;

  // Filters and Preferences
  defaultDateRange: {
    fromDate: string;
    toDate: string;
  };
  setDefaultDateRange: (fromDate: string, toDate: string) => void;

  // Demo mode
  isDemoMode: boolean;
  setDemoMode: (enabled: boolean) => void;
}

/**
 * Get default date range (last 30 days)
 */
const getDefaultDateRange = () => {
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 30);

  return {
    fromDate: fromDate.toISOString().split('T')[0],
    toDate: toDate.toISOString().split('T')[0],
  };
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // UI State
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // Theme
      theme: 'light',
      setTheme: (theme) => set({ theme }),

      // Date Range
      defaultDateRange: getDefaultDateRange(),
      setDefaultDateRange: (fromDate, toDate) =>
        set({ defaultDateRange: { fromDate, toDate } }),

      // Demo mode
      isDemoMode: true,
      setDemoMode: (enabled) => set({ isDemoMode: enabled }),
    }),
    {
      name: 'augmentrisk-app-storage',
    }
  )
);
