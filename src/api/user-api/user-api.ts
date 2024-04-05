import { BaseAPI } from '@/base';

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  // Search for user by login (max 10)
  searchByLogin(data: { login: string }) {
    return this.transport.post('/search', { data });
  }

  // Change user profile
  updateProfile(data: {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
  }) {
    return  this.transport.put('/profile', { data });
  }

  // Change user avatar
  updateAvatar(data: { avatar: FormData }) {
    return this.transport.put('/profile/avatar', { data });
  }

  // Change user password
  updatePassword(data: { oldPassword: string; newPassword: string }) {
    return this.transport.put('/password', { data });
  }
}
