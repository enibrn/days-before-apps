import type { MyUser, MySession, IAuthService } from 'baases';
import { ParsedError, ResolveAuth } from 'baases';

export function useAuth() {
  const user = ref<MyUser | null>(null);
  const currentSession = ref<MySession | null>(null);
  const isAuthenticated = computed(() => user.value !== null);

  const configs = useParsedConfigs();
  const authService: IAuthService = ResolveAuth(configs.baas.type, configs.baas.configs);

  async function init(): Promise<ParsedError | boolean> {
    const result = await authService.init();
    if (result.error) {
      return result.error;
    }

    //not an error, just not signed in
    if (!result.data) {
      return false;
    }

    user.value = result.data.user;
    currentSession.value = result.data.session;
    return true;
  }

  async function login(email: string, password: string): Promise<ParsedError | void> {
    const result = await authService.login(email, password);
    if (result.error) {
      return result.error;
    }

    if (!result.data) {
      //refactor to have exclusively error or data with types (see supabase)
      return ParsedError.createWithOtherErrorMessage('Unexpected error occurred while logging in'); 
    }

    user.value = result.data.user;
    currentSession.value = result.data.session;
  }

  async function logout(): Promise<ParsedError | void> {
    const result = await authService.logout();
    if (result.error) {
      return result.error;
    }

    user.value = null;
    currentSession.value = null;
  }

  async function signup(email: string, password: string): Promise<ParsedError | void> {
    const result = await authService.signup(email, password);
    if (result.error) {
      return result.error;
    }

    if (!result.data) {
      return ParsedError.createWithOtherErrorMessage('Unexpected error occurred while signing up');
    }

    user.value = result.data.user;
    currentSession.value = result.data.session;
  }

  async function updateEmail(email: string, password: string): Promise<ParsedError | void> {
    const result = await authService.updateEmail(email, password);
    if (result.error) {
      return result.error;
    }

    if (!user.value)
      return ParsedError.createWithOtherErrorMessage('Unexpected error occurred while updating email');

    user.value.email = email;
  }

  async function updatePassword(newPassword: string, currentPassword: string): Promise<ParsedError | void> {
    const result = await authService.updatePassword(newPassword, currentPassword);
    if (result.error) {
      return result.error;
    }
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

