import type { IAuthService } from '../../baases/src/auth/AuthService';

declare module '#app' {
  interface NuxtApp {
    $authService: IAuthService;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $authService: IAuthService;
  }
}

export {}