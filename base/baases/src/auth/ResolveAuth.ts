import { type BaasType, ValidateBaasType } from '../common/BaasType';

import type { BaasConfigs } from '../common/Types';
import type { IAuthService } from './IAuthService';

import { AppwriteAuthService } from './AppwriteAuthService';
import { SupabaseAuthService } from './SupabaseAuthService';
import { DummyAuthService } from './DummyAuthService';

export function ResolveAuth(type: unknown, configs: BaasConfigs): IAuthService {
  const safeType = ValidateBaasType(type);
  
  const getDictionary = (configs: BaasConfigs): Record<BaasType, IAuthService> => {
    return {
      appwrite: AppwriteAuthService(configs),
      supabase: SupabaseAuthService(configs),
      dummy: DummyAuthService(configs),
    };
  }

  const dictionary = getDictionary(configs);
  return dictionary[safeType];
}
