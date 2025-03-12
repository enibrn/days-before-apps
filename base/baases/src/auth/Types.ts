import type { OperationResult } from '../common/Types';

export type MyUser = {
  id: string;
  email: string;
}

export type MySession  = {
  token: string;
}

export type BaasOperationResult = {
  error: unknown;
}

export type BaasAuthResult<ABaaSUser, ABaaSSession> = {
  data: BaasAuthData<ABaaSUser, ABaaSSession> | null;
} & BaasOperationResult;

export type BaasAuthData<ABaaSUser, ABaaSSession> = {
  user: ABaaSUser;
  session: ABaaSSession;
}

export type AuthenticationResult = {
  data: AuthenticationData | null;
} & OperationResult;

export type AuthenticationData = {
  user: MyUser;
  session: MySession;
}