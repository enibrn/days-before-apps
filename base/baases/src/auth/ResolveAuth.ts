import { type BaasType, ValidateBaasType } from '../common/BaasType';

import type { BaasConfigs } from '../common/Types';
import type { IAuthService } from './AuthService';

import { AppwriteAuthService } from './AppwriteAuthService';
import { SupabaseAuthService } from './SupabaseAuthService';
import { DummyAuthService } from './DummyAuthService';

export function ResolveAuth(type: unknown, configs: BaasConfigs): IAuthService {
  const safeType = ValidateBaasType(type);
  
  const authProviderMap: Record<BaasType, (configs: BaasConfigs) => IAuthService> = {
    appwrite: (configs: BaasConfigs) => new AppwriteAuthService(configs),
    supabase: (configs: BaasConfigs) => new SupabaseAuthService(configs),
    dummy: (configs: BaasConfigs) => new DummyAuthService(configs),
  };

  const authProviderFactory = authProviderMap[safeType];
  return authProviderFactory(configs);
}
