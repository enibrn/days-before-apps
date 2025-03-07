const BaasTypeValues = <const>['appwrite', 'supabase', 'dummy'];
export type BaasType = typeof BaasTypeValues[number];

export function resolveBaasType(type: unknown): BaasType {
  const isABaasType = (type: unknown): type is BaasType => BaasTypeValues.some((x) => type === x);
  if (!isABaasType(type)) {
    throw new Error(`Invalid BaasType: ${type}`);
  }

  return type;
}