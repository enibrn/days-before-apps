import { type BaasType, resolveBaasType } from '../common/ResolverService';

import type { BaasConfigs } from '../common/Types';
import type { IAuth } from './IAuth';

import { AppwriteAuth } from './AppwriteAuth';
import { SupabaseAuth } from './SupabaseAuth';
import { DummyAuth } from './DummyAuth';

export function resolveAuth(type: unknown, configs: BaasConfigs): IAuth {
  const safeType = resolveBaasType(type);
  
  const getDictionary = (configs: BaasConfigs): Record<BaasType, IAuth> => {
    return {
      appwrite: AppwriteAuth(configs),
      supabase: SupabaseAuth(),
      dummy: DummyAuth(),
    };
  }

  const dictionary = getDictionary(configs);
  return dictionary[safeType];
}
