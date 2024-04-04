import { BaseAPI, HTTPTransport } from '@/base';
import { baseURL } from '@/consts';

const signupAPIInstance = new HTTPTransport(`${baseURL}/auth`);

export class SignupAPI extends BaseAPI {
  // Sign up (create user)
  create(data: {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
  }) {
    return signupAPIInstance.post('/signup', { data });
  }
}
