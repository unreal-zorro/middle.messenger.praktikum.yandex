import { AuthAPI, UserAPI } from '@/api';
import { store } from '@/store';
import { router } from '@/router';
import type { PasswordModel, UserModel } from '@/models';
import { validate } from '@/utils';

export class UserController {
  private authAPI: Nullable<AuthAPI> = null;

  private userAPI: Nullable<UserAPI> = null;

  constructor() {
    this.authAPI = new AuthAPI();
    this.userAPI = new UserAPI();
  }

  public async getUser(): Promise<UserModel | undefined> {
    let data;

    if (this.authAPI) {
      try {
        store.set('isLoading', true);

        data = await this.authAPI.request();
        store.set('user', data);

        store.set('isLoading', false);
      } catch (error: unknown) {
        store.set('isLoading', false);
        console.log((error as Error).message);

        if ((error as Error).message.startsWith('status: 401')) {
          router.go('/');
        }
      }
    }

    return data;
  }

  public async updateProfile(data: UserModel): Promise<UserModel | undefined> {
    const userData = {
      first_name: data.first_name,
      second_name: data.second_name,
      display_name: data.display_name,
      login: data.login,
      email: data.email,
      phone: data.phone
    };

    const isValid = validate(userData);

    let newUserData: UserModel | undefined;

    if (this.userAPI && isValid) {
      try {
        store.set('isLoading', true);

        newUserData = (await this.userAPI.updateProfile(userData)) as UserModel;
        store.set('user', newUserData);

        store.set('isLoading', false);
        router.go('/settings');
      } catch (error: unknown) {
        store.set('isLoading', false);
        console.log(error);
      }
    } else {
      console.log('Invalid user form data');
    }

    return newUserData;
  }

  public async updateAvatar(avatar: File) {
    const avatarFileName = avatar.name;
    const isValid = validate({ avatar: avatarFileName });

    const data = new FormData();
    data.append('avatar', avatar);

    let newUserData: UserModel | undefined;

    if (this.userAPI && isValid) {
      try {
        store.set('isLoading', true);

        newUserData = (await this.userAPI.updateAvatar(data)) as UserModel;
        store.set('user', newUserData);

        store.set('isLoading', false);
        router.go('/settings');
      } catch (error: unknown) {
        store.set('isLoading', false);
        console.log(error);
      }
    } else {
      console.log('Invalid avatar form data');
    }

    return newUserData;
  }

  public async updatePassword(data: PasswordModel) {
    const isValid = validate(data);

    if (this.userAPI && isValid) {
      try {
        store.set('isLoading', true);

        await this.userAPI.updatePassword(data);

        store.set('isLoading', false);
        router.go('/settings');
      } catch (error: unknown) {
        store.set('isLoading', false);
        console.log(error);
      }
    } else {
      console.log('Invalid password form data');
    }
  }
}
