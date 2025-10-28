/**
 * User Store - Manages current user context for API operations
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole =
  | 'PI' // Payment Initiator
  | 'A1' // Approver 1
  | 'A2' // Approver 2
  | 'CFO' // CFO
  | 'RO' // Release Officer
  | 'CONFIG' // Configurator
  | 'SUPER'; // Super User

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
}

interface UserState {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  clearUser: () => void;
}

/**
 * User store with localStorage persistence
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: null,

      setCurrentUser: (user) => set({ currentUser: user }),

      clearUser: () => set({ currentUser: null }),
    }),
    {
      name: 'augmentrisk-user-storage',
    }
  )
);
