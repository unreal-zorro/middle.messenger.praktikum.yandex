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
        data = await this.authAPI.request();
        store.set('user', data as UserModel);
      } catch (error: unknown) {
        console.log((error as Error).message);
        if ((error as Error).message.startsWith('status: 401')) {
          router.go('/');
        }
      }
    }

    return data;
  }

  public updateProfile(data: UserModel): void {
    const userData = {
      first_name: data.first_name,
      second_name: data.second_name,
      display_name: data.display_name,
      login: data.login,
      email: data.email,
      phone: data.phone
    };

    const isValid = validate(userData);

    if (this.userAPI && isValid) {
      this.userAPI
        .updateProfile(userData)
        .then(() => router.go('/settings'))
        .then((newData) => newData)
        .catch((error) => console.log(error));
    } else {
      console.log('Invalid user form data');
    }
  }

  public updateAvatar(avatar: File) {
    const avatarFileName = avatar.name;
    const isValid = validate({ avatar: avatarFileName });

    const data = new FormData();
    data.append('avatar', avatar);

    console.log(data);

    if (this.userAPI && isValid) {
      this.userAPI
        .updateAvatar(data)
        .then(() => router.go('/settings'))
        .then((newData) => newData)
        .catch((error) => console.log(error));
    } else {
      console.log('Invalid avatar form data');
    }
  }

  public updatePassword(data: PasswordModel) {
    const isValid = validate(data);

    if (this.userAPI && isValid) {
      this.userAPI
        .updatePassword(data)
        .then(() => router.go('/settings'))
        .then((newData) => newData)
        .catch((error) => console.log(error));
    } else {
      console.log('Invalid password form data');
    }
  }
}
