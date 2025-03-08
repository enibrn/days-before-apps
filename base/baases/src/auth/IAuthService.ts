import type { Ref, ComputedRef } from 'vue';
import type { MyUser, MySession } from './Types';

export interface IAuthService {
  user: Ref<MyUser | null>;
  currentSession: Ref<MySession | null>;
  isAuthenticated: ComputedRef<boolean>;

  init(): Promise<boolean>;
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  signin(email: string, password: string): Promise<void>;
  updateEmail(email: string, password: string): Promise<void>;
  updatePassword(newPassword: string, currentPassword: string): Promise<void>;
}