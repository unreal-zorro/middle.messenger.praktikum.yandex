import { BaseAPI, HTTPTransport } from '@/base';
import { baseURL } from '@/consts';

const userAPIInstance = new HTTPTransport(`${baseURL}`);

export class UserAPI extends BaseAPI {
  // Search for user by login (max 10)
  create(data: { login: string }) {
    return userAPIInstance.post('/user/search', { data });
  }

  // Get user info
  request() {
    return userAPIInstance.get('/auth/user');
  }

  // Change user profile
  update(data: {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
  }) {
    return userAPIInstance.put('/user/profile', { data });
  }
}
