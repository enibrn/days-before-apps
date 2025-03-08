import { ref, computed } from 'vue';
import { ID, type Models } from 'appwrite';

import type { IAuthService } from './IAuthService';
import type { MyUser, MySession } from './Types';

import type { BaasConfigs } from '../common/Types';
import { AppwriteService } from '../common/AppwriteService';

export function AppwriteAuthService(configs: BaasConfigs): IAuthService {
  const appwrite = new AppwriteService(configs);

  const user = ref<MyUser | null>(null);
  const currentSession = ref<MySession | null>(null);
  const isAuthenticated = computed(() => user.value !== null);

  async function init(): Promise<boolean> {
    try {
      const session: Models.Session = await appwrite.account.getSession('current');
      currentSession.value = mapToMySession(session);

      const accountData: Models.User<Models.Preferences> = await appwrite.account.get();
      user.value = mapToMyUser(accountData);

      return true;
    } catch (error) {
      return false;
    }
  }

  async function login(email: string, password: string) {
    try {
      const session = await appwrite.account.createEmailPasswordSession(email, password);
      currentSession.value = mapToMySession(session);

      const accountData = await appwrite.account.get();
      user.value = mapToMyUser(accountData);
    } catch (error) {
      console.error('Errore durante il login:', error);
    }
  }

  async function logout() {
    try {
      await appwrite.account.deleteSession('current');

      user.value = null;
      currentSession.value = null;
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  }

  async function signin(email: string, password: string) {
    try {
      //await appwrite.account.create('unique()', email, password);
      await appwrite.account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
    }
  }

  async function updateEmail(email: string, password: string) {
    await appwrite.account.updateEmail(email, password);
    if (!user.value) return;
    user.value.email = email;
  }

  async function updatePassword(newPassword: string, currentPassword: string) {
    await appwrite.account.updatePassword(newPassword, currentPassword);
  }

  function mapToMySession(session: Models.Session): MySession {
    return {
      token: session.$id,
    };
  }

  function mapToMyUser(accountData: Models.User<Models.Preferences>): MyUser {
    return {
      id: accountData.$id,
      email: accountData.email,
    };
  }

  return {
    user,
    currentSession,
    isAuthenticated,
    init,
    login,
    logout,
    signin,
    updateEmail,
    updatePassword,
  };
}
