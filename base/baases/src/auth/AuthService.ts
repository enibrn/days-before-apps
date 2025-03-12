import type { MyUser, MySession, AuthenticationResult, BaasAuthResult, BaasAuthData, BaasOperationResult } from './Types';
import type { OperationResult, BaasConfigs } from '../common/Types';
import { ErrorsUtils, ParsedError } from '../common/Errors';

export interface IAuthService {
  init(): Promise<AuthenticationResult>;
  login(email: string, password: string): Promise<AuthenticationResult>;
  signup(email: string, password: string): Promise<AuthenticationResult>;
  logout(): Promise<OperationResult>;
  updateEmail(newEmail: string, password: string): Promise<OperationResult>;
  updatePassword(newPassword: string, currentPassword: string): Promise<OperationResult>;
};

export abstract class AuthService<ABaaSUser, ABaaSSession> {
  protected configs: BaasConfigs;

  constructor(configs: BaasConfigs) {
    this.configs = configs;
  }

  async init(): Promise<AuthenticationResult>
  {
    try {
      const { data, error } = await this.performInit();
      if (error) return this.errorResponse(error);
      if (!data) return this.notSignedInResponse(); //not an error, just not signed in

      return this.successResponse(data);
    } catch (error) {
      return this.errorResponse(error);
    }
  }
  
  async login(email: string, password: string): Promise<AuthenticationResult> {
    try {
      const { data, error } = await this.performLogin(email, password);
      if (error) return this.errorResponse(error);
      if (!data) throw new Error('No data returned from login');

      return this.successResponse(data);
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  async signup(email: string, password: string): Promise<AuthenticationResult>{
    try {
      const { data, error } = await this.performSignup(email, password);
      if (error) return this.errorResponse(error);
      if (!data) throw new Error('No data returned from signup');

      return this.successResponse(data);
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  async logout(): Promise<OperationResult> {
    try {
      const { error } = await this.performLogout();
      if (error) return { error: ErrorsUtils.parseError(error) };

      return { error: null };
    } catch (error) {
      return { error: ErrorsUtils.parseError(error) };
    }
  }

  async updateEmail(newEmail: string, password: string): Promise<OperationResult> {
    try {
      const { error } = await this.performUpdateEmail(newEmail, password);
      if (error) return { error: ErrorsUtils.parseError(error) };

      return { error: null };
    } catch (error) {
      return { error: ErrorsUtils.parseError(error) };
    }
  }

  async updatePassword(newPassword: string, currentPassword: string): Promise<OperationResult> {
    try {
      const { error } = await this.performUpdatePassword(newPassword, currentPassword);
      if (error) return { error: ErrorsUtils.parseError(error) };

      return { error: null };
    } catch (error) {
      return { error: ErrorsUtils.parseError(error) };
    }
  }

  protected abstract mapToMyUser(user: ABaaSUser): MyUser;
  protected abstract mapToMySession(session: ABaaSSession): MySession;

  //some baas services may return both session and user in one call
  protected abstract performInit(): Promise<BaasAuthResult<ABaaSUser, ABaaSSession>>;
  protected abstract performLogin(email: string, password: string): Promise<BaasAuthResult<ABaaSUser, ABaaSSession>>;
  protected abstract performSignup(email: string, password: string): Promise<BaasAuthResult<ABaaSUser, ABaaSSession>>;

  protected abstract performLogout(): Promise<BaasOperationResult>;
  protected abstract performUpdateEmail(newEmail: string, password: string): Promise<BaasOperationResult>;
  protected abstract performUpdatePassword(newPassword: string, currentPassword: string): Promise<BaasOperationResult>;

  private successResponse(data: BaasAuthData<ABaaSUser, ABaaSSession>): AuthenticationResult {
    const session = this.mapToMySession(data.session);
    const user = this.mapToMyUser(data.user);

    return {
      data: { user, session },
      error: null
    };
  }

  private errorResponse(error: unknown): AuthenticationResult {
    return {
      data: null,
      error: ErrorsUtils.parseError(error)
    };
  }

  private notSignedInResponse(): AuthenticationResult {
    return {
      data: null,
      error: null
    };
  }
}
