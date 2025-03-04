import { ref, computed } from 'vue';
import type { AuthComposable } from './authComposable';
import type { MyUser, MySession } from '../types/authTypes';

const registeredUsers = [
  { id: '1', email: 'q@w.e', password: 'password' }
];

export function useDummyAuth(): AuthComposable {
  const user = ref<MyUser | null>(null);
  const currentSession = ref<MySession | null>(null);

  const isAuthenticated = computed(() => user.value !== null);

  async function login(email: string, password: string): Promise<void> {
    const foundUser = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      user.value = { id: foundUser.id, email: foundUser.email };
      currentSession.value = { token: `dummy-token-${foundUser.id}` };
    } else {
      throw new Error('Credenziali non valide');
    }
  }

  async function logout(): Promise<void> {
    user.value = null;
    currentSession.value = null;
  }

  async function register(email: string, password: string): Promise<void> {
    const existingUser = registeredUsers.find((u) => u.email === email);
    if (existingUser) {
      throw new Error('Utente già registrato');
    }
    const newUser = { id: `${Date.now()}`, email, password };
    registeredUsers.push(newUser);
    user.value = { id: newUser.id, email: newUser.email };
    currentSession.value = { token: `dummy-token-${newUser.id}` };
  }

  return {
    user,
    currentSession,
    isAuthenticated,
    login,
    logout,
    register,
  };
}
