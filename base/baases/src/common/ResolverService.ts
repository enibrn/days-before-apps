import type { IAuth } from '../auth/IAuth';
import type { BaasConfigs } from './Types';

import { getAuth } from '../auth/ResolverService';

const BaasTypeValues = <const>['appwrite', 'supabase', 'dummy'];
export type BaasType = typeof BaasTypeValues[number];


function getService(type: unknown, configs: BaasConfigs): { auth: IAuth } {
  const isABaasType = (type: unknown): type is BaasType => BaasTypeValues.some((x) => type === x);
  if (!isABaasType(type)) {
    throw new Error(`Invalid BaasType: ${type}`);
  }

  return {
    auth: getAuth(type, configs),
  };
}