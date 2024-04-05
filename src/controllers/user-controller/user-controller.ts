import { AuthAPI } from '@/api';
import { store } from '@/store';
import type { UserModel } from '@/models';

export class UserController {
  private authAPI: Nullable<AuthAPI> = null;

  constructor() {
    this.authAPI = new AuthAPI();
  }

  public getUser(): void {
    if (this.authAPI) {
      this.authAPI
        .request()
        .then((data) => store.set('user', data as UserModel))
        .catch((error) => console.log(error));
    }
  }
}
