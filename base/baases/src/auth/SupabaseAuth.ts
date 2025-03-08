import { ref, computed } from 'vue';
import { createClient, type User, type Session } from '@supabase/supabase-js';

import type { IAuth } from './IAuth';
import type { MyUser, MySession } from './Types';

import type { BaasConfigs } from '../common/Types';
import { SupabaseService } from '../common/SupabaseService';

export function SupabaseAuth(configs: BaasConfigs): IAuth {
  const supabase = new SupabaseService(configs);

  const user = ref<MyUser | null>(null);
  const currentSession = ref<MySession | null>(null);
  const isAuthenticated = computed(() => user.value !== null);

  async function init(): Promise<boolean> {
    throw new Error('Not implemented');
  }

  async function login(email: string, password: string) {
    const { data, error } = await supabase.client.auth.signInWithPassword({ email, password });
    const { user: loggedInUser, session } = data || {};
    if (error || !loggedInUser || !session) {
      console.error('Errore durante il login:', error);
      return;
    }

    if (!loggedInUser.email) {
      throw new Error('Email è obbligatoria');
    }

    user.value = {
      id: loggedInUser.id,
      email: loggedInUser.email,
    };
    currentSession.value = {
      token: session.access_token,
    };
  }

  async function logout() {
    const { error } = await supabase.client.auth.signOut();
    if (error) {
      console.error('Errore durante il logout:', error);
      return;
    }
    user.value = null;
    currentSession.value = null;
  }

  async function signin(email: string, password: string) {
    const { data, error } = await supabase.client.auth.signUp({ email, password });
    const { user: registeredUser, session } = data;

    if (error || !registeredUser || !session) {
      console.error('Errore durante la registrazione:', error);
      return;
    }

    if (!registeredUser.email) {
      throw new Error('Email è obbligatoria');
    }
    
    user.value = {
      id: registeredUser.id,
      email: registeredUser.email,
    };
    currentSession.value = {
      token: session.access_token,
    };
  }

  async function updateEmail(email: string, password: string) {
    throw new Error('Not implemented');
  }

  async function updatePassword(newPassword: string, currentPassword: string) {
    throw new Error('Not implemented');
  }

  return {
    user,
    currentSession,
    isAuthenticated,
    init,
    login,
    logout,
    signin,
    updateEmail,
    updatePassword,
  };
}
