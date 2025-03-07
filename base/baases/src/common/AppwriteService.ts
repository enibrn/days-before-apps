import { Client, Databases, Account } from 'appwrite';
import { type BaasConfigs } from './Types';

class AppwriteService {
  public account: Account;
  public databases: Databases;

  constructor(configs: BaasConfigs) {
    const client = new Client();
    client
      .setEndpoint(configs.endpoint,)
      .setProject(configs.project);

    this.account = new Account(client);
    this.databases = new Databases(client);
  }

  // async getFile(bucketId, fileId) {
  //   return await this.storage.getFileDownload(bucketId, fileId);
  // }
}

export default AppwriteService;
