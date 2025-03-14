import type { MyUser, MySession, IAuthService } from 'baases';
import { ParsedError, ResolveAuth } from 'baases';

export function useAuth() {
  const user = ref<MyUser | null>(null);
  const currentSession = ref<MySession | null>(null);
  const isAuthenticated = computed(() => user.value !== null);

  const configs = useParsedConfigs();
  const authService: IAuthService = ResolveAuth(configs.baas.type, configs.baas.configs);

  async function init(): Promise<boolean> {
    const result = await authService.init();
    if (result.error) {
      alertError(result.error);
      return false;
    }

    //not an error, just not signed in
    if (!result.data) {
      return false;
    }

    user.value = result.data.user;
    currentSession.value = result.data.session;
    return true;
  }

  async function login(email: string, password: string) {
    const result = await authService.login(email, password);
    if (result.error) {
      alertError(result.error);
      return;
    }

    if (!result.data) {
      return; //refactor to have exclusively error or data with types (see supabase)
    }

    user.value = result.data.user;
    currentSession.value = result.data.session;
  }

  async function logout() {
    const result = await authService.logout();
    if (result.error) {
      alertError(result.error);
      return;
    }

    user.value = null;
    currentSession.value = null;
  }

  async function signup(email: string, password: string) {
    const result = await authService.signup(email, password);
    if (result.error) {
      alertError(result.error);
      return;
    }

    if (!result.data) {
      return; //refactor to have exclusively error or data with types (see supabase)
    }

    user.value = result.data.user;
    currentSession.value = result.data.session;
  }

  async function updateEmail(email: string, password: string) {
    const result = await authService.updateEmail(email, password);
    if (result.error) {
      alertError(result.error);
      return;
    }
    if (!user.value) return;
    user.value.email = email;
  }

  async function updatePassword(newPassword: string, currentPassword: string) {
    const result = await authService.updatePassword(newPassword, currentPassword);
    if (result.error) {
      alertError(result.error);
      return;
    }
  }

  function alertError(error: ParsedError) {
    alert(error.printErrors());
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

