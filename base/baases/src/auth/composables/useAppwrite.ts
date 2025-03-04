import { ref, computed } from 'vue';
import type { AuthComposable } from './authComposable';
import type { MyUser, MySession } from '../types/authTypes';
import { Client, Account } from 'appwrite';

export function useAppwrite(): AuthComposable {
  const client = new Client()
    .setEndpoint('https://[HOSTNAME_OR_IP]/v1')
    .setProject('PROJECT_ID');

  const account = new Account(client);
  const user = ref<MyUser | null>(null);
  const currentSession = ref<MySession | null>(null);

  const isAuthenticated = computed(() => user.value !== null);

  async function login(email: string, password: string) {
    try {
      const session = await account.createSession(email, password);
      currentSession.value = {
        token: session.$id,
      };

      const accountData = await account.get();
      user.value = {
        id: accountData.$id,
        email: accountData.email,
      };
    } catch (error) {
      console.error('Errore durante il login:', error);
    }
  }

  async function logout() {
    try {
      await account.deleteSession('current');

      user.value = null;
      currentSession.value = null;
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  }

  async function register(email: string, password: string) {
    try {
      await account.create('unique()', email, password);
      await login(email, password);
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
    }
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
