import { AuthService } from './AuthService';
import type { MyUser, MySession, BaasAuthResult } from './Types';

import type { BaasConfigs, OperationResult } from '../common/Types';

import { DummyBaasService, type DummyUser, type DummySession } from '../common/DummyBaasService';

export class DummyAuthService extends AuthService<DummyUser, DummySession> {
  private dummyService: DummyBaasService;

  constructor(configs: BaasConfigs) {
    super(configs);
    this.dummyService = new DummyBaasService(configs);
  }

  mapToMyUser(user: DummyUser): MyUser {
    return {
      id: user.id,
      email: user.email,
    };
  }

  mapToMySession(session: DummySession): MySession {
    return { token: session.token };
  }

  async performInit(): Promise<BaasAuthResult<DummyUser, DummySession>> {
    try {
      const { user, session } = await this.dummyService.account.get();
      return { data: { user, session }, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async performLogin(email: string, password: string): Promise<BaasAuthResult<DummyUser, DummySession>> {
    const { user, session } = await this.dummyService.account.login(email, password);
    return { data: { user, session }, error: null };
  }

  async performSignup(email: string, password: string): Promise<BaasAuthResult<DummyUser, DummySession>> {
    const { user, session } = await this.dummyService.account.signup(email, password);
    return { data: { user, session }, error: null };
  }

  async performLogout(): Promise<OperationResult> {
    await this.dummyService.account.logout();
    return { error: null };
  }

  async performUpdateEmail(newEmail: string, password: string): Promise<OperationResult> {
    await this.dummyService.account.updateEmail(newEmail, password);
    return { error: null };
  }

  async performUpdatePassword(newPassword: string, currentPassword: string): Promise<OperationResult> {
    await this.dummyService.account.updatePassword(newPassword, currentPassword);
    return { error: null };
  }
}
