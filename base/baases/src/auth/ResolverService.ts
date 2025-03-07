import type { BaasType } from '../common/ResolverService';
import type { BaasConfigs } from '../common/Types';
import type { IAuth } from './IAuth';

import { AppwriteAuth } from './AppwriteAuth';
import { SupabaseAuth } from './SupabaseAuth';
import { DummyAuth } from './DummyAuth';

export function getAuth(type: BaasType, configs: BaasConfigs): IAuth {
  const getDictionary = (configs: BaasConfigs): Record<BaasType, IAuth> => {
    return {
      appwrite: AppwriteAuth(configs),
      supabase: SupabaseAuth(),
      dummy: DummyAuth(),
    };
  }

  const dictionary = getDictionary(configs);
  return dictionary[type];
}