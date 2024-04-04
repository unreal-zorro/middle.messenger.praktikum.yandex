import { BaseAPI, HTTPTransport } from '@/base';
import { baseURL } from '@/consts';

const logoutAPIInstance = new HTTPTransport(`${baseURL}/auth`);

export class LogoutAPI extends BaseAPI {
  // Logout
  create() {
    return logoutAPIInstance.post('/logout');
  }
}
