import { BaseAPI } from '@/base';
import { LoginFormModel, RegisterFormModel, UserModel } from '@/models';

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  // Get user info
  request(): Promise<UserModel> {
    return this.transport.get('/user');
  }

  // Sign in
  signIn(data: Record<string, string>): Promise<LoginFormModel> {
    return this.transport.post('/signin', { data });
  }

  // Sign up (create user)
  signUp(data: Record<string, string>): Promise<RegisterFormModel> {
    return this.transport.post('/signup', { data });
  }

  // Logout
  logout(): Promise<XMLHttpRequest> {
    return this.transport.post('/logout');
  }
}
