import { ref, computed } from 'vue';
import type { IAuth } from './IAuth';
import type { MyUser, MySession } from './Types';

const registeredUsers = [
  {
    id: "1",
    email: "dummy1@example.com",
    password: "password1"
  },
  {
    id: "2",
    email: "dummy2@example.com",
    password: "password2"
  },
  {
    id: "3",
    email: "dummy3@example.com",
    password: "password3"
  }
];

export function DummyAuth(): IAuth {
  const user = ref<MyUser | null>(null);
  const currentSession = ref<MySession | null>(null);
  const isAuthenticated = computed(() => user.value !== null);

  async function init(): Promise<boolean> {
    //randomly decide if the user is authenticated or not
    const random = Math.random();
    if (random > 0.5) {
      //randomly select a user
      const userIndex = Math.floor(Math.random() * registeredUsers.length);
      user.value = { id: registeredUsers[userIndex].id, email: registeredUsers[userIndex].email };
      currentSession.value = { token: `dummy-token-${registeredUsers[userIndex].id}` };
      return true;
    } else {
      return false;
    }
  }

  async function login(email: string, password: string): Promise<void> {
    const foundUser = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      user.value = { id: foundUser.id, email: foundUser.email };
      currentSession.value = { token: `dummy-token-${foundUser.id}` };
    } else {
      throw new Error('Credenziali non valide');
    }
  }

  async function logout(): Promise<void> {
    user.value = null;
    currentSession.value = null;
  }

  async function signin(email: string, password: string): Promise<void> {
    const existingUser = registeredUsers.find((u) => u.email === email);
    if (existingUser) {
      throw new Error('Utente già registrato');
    }
    const newUser = { id: `${Date.now()}`, email, password };
    registeredUsers.push(newUser);
    user.value = { id: newUser.id, email: newUser.email };
    currentSession.value = { token: `dummy-token-${newUser.id}` };
  }

  async function updateEmail(email: string, password: string) {
    if (!user.value) return;
    const foundUser = registeredUsers.find(
      (u) => u.email === user.value?.email && u.password === password
    );
    if (!foundUser) {
      throw new Error('Password non valida');
    }
    foundUser.email = email;
    user.value.email = email;
  }

  async function updatePassword(newPassword: string, currentPassword: string) {
    if (!user.value) return;
    const foundUser = registeredUsers.find(
      (u) => u.email === user.value?.email && u.password === currentPassword
    );
    if (!foundUser) {
      throw new Error('Password corrente non valida');
    }
    foundUser.password = newPassword;
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
