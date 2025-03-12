import { ID, type Models } from 'appwrite';

import { AuthService } from './AuthService';
import type { MyUser, MySession, BaasAuthResult } from './Types';

import type { BaasConfigs, OperationResult } from '../common/Types';
import { AppwriteService } from '../common/AppwriteService';
import { ErrorsUtils } from '../common/Errors';

export class AppwriteAuthService
extends AuthService<Models.User<Models.Preferences>, Models.Session> {
  private appwrite: AppwriteService;

  constructor(configs: BaasConfigs) {
    super(configs);
    this.appwrite = new AppwriteService(configs);
  }

  mapToMyUser(user: Models.User<Models.Preferences>): MyUser {
    return {
      id: user.$id,
      email: user.email,
    };
  }

  mapToMySession(session: Models.Session): MySession {
    return { token: session.$id };
  }

  async performInit(): Promise<BaasAuthResult<Models.User<Models.Preferences>, Models.Session>> {
    try {
      const user = await this.appwrite.account.get();
      const session = await this.appwrite.account.getSession('current');
      return { data: { user, session }, error: null };
    } catch (error) { //todo: may need to handle different errors, maybe try getsession first
      return { data: null, error };
    }
  }

  async performLogin(email: string, password: string): Promise<BaasAuthResult<Models.User<Models.Preferences>, Models.Session>> {
    const user = await this.appwrite.account.get();
    const session = await this.appwrite.account.createEmailPasswordSession(email, password);
    
    return { data: { user, session }, error: null };
  }

  async performSignup(email: string, password: string): Promise<BaasAuthResult<Models.User<Models.Preferences>, Models.Session>> {
    await this.appwrite.account.create(ID.unique(), email, password);

    return await this.performLogin(email, password);
  }

  async performLogout(): Promise<OperationResult> {
    await this.appwrite.account.deleteSession('current');
    return { error: null };
  }

  async performUpdateEmail(newEmail: string, password: string): Promise<OperationResult> {
    await this.appwrite.account.updateEmail(newEmail, password);
    return { error: null };
  }

  async performUpdatePassword(newPassword: string, currentPassword: string): Promise<OperationResult> {
    await this.appwrite.account.updatePassword(newPassword, currentPassword);
    return { error: null };
  }
}
