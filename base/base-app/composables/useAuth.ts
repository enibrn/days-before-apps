import type { MyUser, MySession } from '../../baases/src/auth/Types';
import type { IAuthService } from '../../baases/src/auth/AuthService';

export function useAuth() {
  const user = ref<MyUser | null>(null);
  const currentSession = ref<MySession | null>(null);
  const isAuthenticated = computed(() => user.value !== null);

  async function init(): Promise<boolean> {
    throw new Error('Not implemented');
  }

  async function login(email: string, password: string) {
    throw new Error('Not implemented');
  }

  async function logout() {
    throw new Error('Not implemented');
  }

  async function signup(email: string, password: string) {
    throw new Error('Not implemented');
  }

  async function updateEmail(email: string, password: string) {
    throw new Error('Not implemented');
  }

  async function updatePassword(newPassword: string, currentPassword: string) {
    throw new Error('Not implemented');
  }

  return {
    user,
    currentSession,
    isAuthenticated,
    init,
    login,
    logout,
    signup,
    updateEmail,
    updatePassword,
  };
}

