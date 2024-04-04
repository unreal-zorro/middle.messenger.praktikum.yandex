import { BaseAPI, HTTPTransport } from '@/base';
import { baseURL } from '@/consts';

const userAPIInstance = new HTTPTransport(`${baseURL}`);

export class UserPasswordAPI extends BaseAPI {
  // Change user password
  update(data: { oldPassword: string; newPassword: string }) {
    return userAPIInstance.put('/user/password', { data });
  }
}
