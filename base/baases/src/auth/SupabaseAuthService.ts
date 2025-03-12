import { ref, computed } from 'vue';
import { createClient, type User, type Session, isAuthSessionMissingError } from '@supabase/supabase-js';

import { AuthService } from './AuthService';
import type { MyUser, MySession, BaasAuthResult } from './Types';

import type { BaasConfigs } from '../common/Types';
import { SupabaseService } from '../common/SupabaseService';

export class SupabaseAuthService extends AuthService<User, Session> {
  private supabase: SupabaseService;

  constructor(configs: BaasConfigs) {
    super(configs);
    this.supabase = new SupabaseService(configs);
  }

  mapToMySession(session: Session): MySession {
    return { token: session.access_token };
  }

  mapToMyUser(user: User): MyUser {
    if (!user.email) {
      throw new Error('Email è obbligatoria');
    }

    return {
      id: user.id,
      email: user.email,
    };
  }

  async performInit(): Promise<BaasAuthResult<User, Session>> {
    const userResp = await this.supabase.client.auth.getUser();

    if (userResp.error) {
      if (isAuthSessionMissingError(userResp.error))
        return { data: null, error: null }; //this is not an error, just not signed in

      return { data: null, error: userResp.error };
    }

    const sessionResp = await this.supabase.client.auth.getSession();

    if (sessionResp.error)
      return { data: null, error: sessionResp.error };

    // should never happen because if getUser returns a user, getSession should return a session
    if (!sessionResp.data.session)
      return { data: null, error: new Error('Sessione non trovata') };

    return {
      data: {
        user: userResp.data.user,
        session: sessionResp.data.session
      },
      error: null
    };
  }

  async performLogin(email: string, password: string): Promise<BaasAuthResult<User, Session>> {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({ email, password });

    if (error || !data?.user || !data.session) {
      return { data: null, error };
    }

    return { data, error: null };
  }

  async performSignup(email: string, password: string): Promise<BaasAuthResult<User, Session>> {
    const { data, error } = await this.supabase.client.auth.signUp({ email, password });

    if (error || !data?.user || !data.session) {
      return { data: null, error };
    }

    return { data: {user: data.user, session: data.session}, error: null };
  }

  async performLogout(): Promise<BaasAuthResult<User, Session>> {
    const { error } = await this.supabase.client.auth.signOut();

    if (error) {
      return { data: null, error };
    }

    return { data: null, error: null };
  }

  async performUpdateEmail(newEmail: string, password: string): Promise<BaasAuthResult<User, Session>> {
    throw new Error('Not implemented');
  }

  async performUpdatePassword(newPassword: string, currentPassword: string): Promise<BaasAuthResult<User, Session>> {
    throw new Error('Not implemented');
  }
}