import type { Ref, ComputedRef } from 'vue';
import type { MyUser, MySession } from '../types/authTypes';

export interface AuthComposable {
  user: Ref<MyUser | null>;
  currentSession: Ref<MySession | null>;
  isAuthenticated: ComputedRef<boolean>;
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  register(email: string, password: string): Promise<void>;
}