import { BaseAPI } from '@/base';

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  // Get user info
  request() {
    return this.transport.get('/user');
  }

  // Sign in
  signIn(data: { login: string; password: string }) {
    return this.transport.post('/signin', { data });
  }

  // Sign up (create user)
  signUp(data: {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
  }) {
    return this.transport.post('/signup', { data });
  }

  // Logout
  logout() {
    return this.transport.post('/logout');
  }
}
