import { ResolveAuth } from '../../baases/src/auth/ResolveAuth';
import { useParsedConfigs } from '../composables/useParsedConfigs';
import type { IAuthService } from '../../baases/src/auth/AuthService';

export default defineNuxtPlugin((nuxtApp) => {
  const configs = useParsedConfigs();
  const authService: IAuthService = ResolveAuth(configs.baas.type, configs.baas.configs);
  nuxtApp.provide('authService', authService);
});