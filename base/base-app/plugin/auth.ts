import { ResolveAuth } from '../../baases/src/auth/ResolveAuth';
import { useParsedConfigs } from '../composables/useParsedConfigs';

export default defineNuxtPlugin((nuxtApp) => {
  const configs = useParsedConfigs();
  const auth = ResolveAuth(configs.baas.type, configs.baas.configs);
  nuxtApp.provide('auth', auth);
});