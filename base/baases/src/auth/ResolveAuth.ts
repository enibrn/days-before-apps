import { type BaasType, ValidateBaasType } from '../common/BaasType';

import type { BaasConfigs } from '../common/Types';
import type { IAuth } from './IAuth';

import { AppwriteAuth } from './AppwriteAuth';
import { SupabaseAuth } from './SupabaseAuth';
import { DummyAuth } from './DummyAuth';

export function ResolveAuth(type: unknown, configs: BaasConfigs): IAuth {
  const safeType = ValidateBaasType(type);
  
  const getDictionary = (configs: BaasConfigs): Record<BaasType, IAuth> => {
    return {
      appwrite: AppwriteAuth(configs),
      supabase: SupabaseAuth(configs),
      dummy: DummyAuth(configs),
    };
  }

  const dictionary = getDictionary(configs);
  return dictionary[safeType];
}
