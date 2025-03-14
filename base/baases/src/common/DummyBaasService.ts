import { type BaasConfigs } from './Types';

export class DummyBaasService {
  public account: DummyAccountService;

  constructor(configs: BaasConfigs) {
    this.account = new DummyAccountService(configs.endpointUrl, configs.projectKey);
  }
}

//from now on I will simulate an sdk of a baas service
export type DummyUser = {
  id: string;
  email: string;
  password: string;
};

export type DummySession = {
  token: string;
};

const registeredUsers: DummyUser[] = [
  {
    id: crypto.randomUUID(),
    email: "1@b.in",
    password: "pass1"
  },
  {
    id: crypto.randomUUID(),
    email: "2@b.in",
    password: "pass2"
  },
  {
    id: crypto.randomUUID(),
    email: "3@b.in",
    password: "pass3"
  }
];

class DummyAccountService {
  private endpointUrl: string;
  private projectKey: string;

  private currentSession: DummySession | null = null;
  private currentUser: DummyUser | null = null;

  constructor(endpointUrl: string, projectKey: string) {
    this.endpointUrl = endpointUrl;
    this.projectKey = projectKey;

    this.initializeRandomly();
  }

  public async get(): Promise<{user: DummyUser, session: DummySession}>
  {
    if (this.currentUser && this.currentSession) {
      return { user: this.currentUser, session: this.currentSession };
    }
    throw new Error('User not authenticated');
  }

  public async login(email: string, password: string): Promise<{user: DummyUser, session: DummySession}> {
    const user = registeredUsers.find(user => user.email === email && user.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return { user, session: this.castDummySession(user) };
  }

  public async signup(email: string, password: string): Promise<{user: DummyUser, session: DummySession}> {
    const existingUser = registeredUsers.find((u) => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    const user = { id: crypto.randomUUID(), email, password };
    registeredUsers.push(user);
    return { user, session: this.castDummySession(user) };
  }

  public async logout(): Promise<void> {
    this.currentUser = null;
    this.currentSession = null;
  }

  public async updateEmail(newEmail: string, password: string): Promise<void> {
    const foundUser = registeredUsers.find(
      (u) => u.email === newEmail && u.password === password && u.id === this.currentUser?.id
    );
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }
    foundUser.email = newEmail;
  }

  public async updatePassword(newPassword: string, currentPassword: string): Promise<void> {
    const foundUser = registeredUsers.find(
      (u) => u.email === this.currentUser?.email && u.password === currentPassword
    );
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }
    foundUser.password = newPassword;
  }

  private async initializeRandomly(): Promise<void> {
   const random = Math.random();
   if (random < 0.5) return;

   const userIndex = Math.floor(Math.random() * registeredUsers.length);
   this.currentUser =  registeredUsers[userIndex];
   this.currentSession = this.castDummySession(registeredUsers[userIndex]);
 }

  private castDummySession(user: DummyUser): DummySession {
    return {
      token: `dummy-token-${this.endpointUrl}-${this.projectKey}-${user.id}`
    };
  }
}

