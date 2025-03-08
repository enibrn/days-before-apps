import { Client, Databases, Account } from 'appwrite';
import { type BaasConfigs } from './Types';

export class AppwriteService {
  public account: Account;
  public databases: Databases;

  constructor(configs: BaasConfigs) {
    const client = new Client();
    client
      .setEndpoint(configs.endpointUrl,)
      .setProject(configs.projectKey);

    this.account = new Account(client);
    this.databases = new Databases(client);
  }
}