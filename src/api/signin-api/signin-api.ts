import { BaseAPI, HTTPTransport } from '@/base';
import { baseURL } from '@/consts';

const signinAPIInstance = new HTTPTransport(`${baseURL}/auth`);

export class SigninAPI extends BaseAPI {
  // Sign in
  create(data: { login: string; password: string }) {
    return signinAPIInstance.post('/signin', { data });
  }
}
