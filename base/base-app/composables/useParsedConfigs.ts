import type { BaasConfigs } from '../../baases/src/common/Types';

export type ParsedBaasConfigs = {
  type: string;
  configs: BaasConfigs;
};

export type ParsedConfigs = {
  baas: ParsedBaasConfigs;
};

export function useParsedConfigs() {
  const validateString = (value: unknown): string => {
    if (typeof value !== 'string') {
      throw new Error('Invalid string');
    }

    return value;
  };

  const config = useRuntimeConfig();

  const baasConfigs: BaasConfigs = {
    endpointUrl: validateString(config.public.baasEndpointUrl),
    projectKey: validateString(config.public.baasProjectKey),
  };

  const parsedConfigs: ParsedConfigs = {
    baas: {
      type: validateString(config.public.baasType),
      configs: baasConfigs,
    },
  };

  return parsedConfigs;
}