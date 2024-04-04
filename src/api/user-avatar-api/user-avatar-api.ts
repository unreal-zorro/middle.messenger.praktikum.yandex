import { BaseAPI, HTTPTransport } from '@/base';
import { baseURL } from '@/consts';

const userAPIInstance = new HTTPTransport(`${baseURL}`);

export class UserAvatarAPI extends BaseAPI {
  // Change user avatar
  update(data: { avatar: FormData }) {
    return userAPIInstance.put('/user/profile/avatar', { data });
  }
}
