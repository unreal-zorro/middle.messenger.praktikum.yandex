import { AuthAPI } from '@/api';
import { router } from '@/router';
import type { LoginFormModel, RegisterFormModel } from '@/models';
import { validate } from '@/utils';
import { store } from '@/store';

export class AuthController {
  private authAPI: Nullable<AuthAPI> = null;

  constructor() {
    this.authAPI = new AuthAPI();
  }

  public async login(data: LoginFormModel): Promise<void> {
    try {
      const isValid = validate(data);

      if (this.authAPI && isValid) {
        await this.authAPI.signIn(data);
        router.go('/messenger');
      } else {
        const status = '400';
        const reason = 'Invalid form data';

        throw new Error(`status: ${status}, reason: ${reason}`);
      }
    } catch (error: unknown) {
      const { message } = error as Error;
      const status = message.slice(8, 11);

      if (status === '401') {
        console.log(message);
        router.go('/');
      } else if (status === '500') {
        console.log(message);
        router.go('/error500');
      } else {
        console.log(message);
      }
    }
  }

  public async register(data: RegisterFormModel): Promise<void> {
    try {
      const isValid = validate(data);

      if (this.authAPI && isValid) {
        await this.authAPI.signUp(data);
        router.go('/messenger');
      } else {
        const status = '400';
        const reason = 'Invalid form data';

        throw new Error(`status: ${status}, reason: ${reason}`);
      }
    } catch (error: unknown) {
      const { message } = error as Error;
      const status = message.slice(8, 11);

      if (status === '401') {
        console.log(message);
        router.go('/');
      } else if (status === '500') {
        console.log(message);
        router.go('/error500');
      } else {
        console.log(message);
      }
    }
  }

  public async logout(): Promise<void> {
    try {
      const emptyUser = {
        id: undefined,
        first_name: undefined,
        second_name: undefined,
        display_name: undefined,
        login: undefined,
        email: undefined,
        phone: undefined,
        avatar: undefined
      };

      if (this.authAPI) {
        await this.authAPI.logout();
        store.set('user', emptyUser);
        router.go('/messenger');
      }
    } catch (error: unknown) {
      const { message } = error as Error;
      const status = message.slice(8, 11);

      if (status === '401') {
        console.log(message);
        router.go('/');
      } else if (status === '500') {
        console.log(message);
        router.go('/error500');
      } else {
        console.log(message);
      }
    }
  }
}
