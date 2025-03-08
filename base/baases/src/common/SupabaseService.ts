import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { type BaasConfigs } from './Types';

export class SupabaseService {
  public client: SupabaseClient;

  constructor(configs: BaasConfigs) {
    this.client = createClient(configs.endpointUrl, configs.projectKey);
  }
}