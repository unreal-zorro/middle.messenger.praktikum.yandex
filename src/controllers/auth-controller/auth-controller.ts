import { AuthAPI } from '@/api';
import { router } from '@/router';
import type { LoginFormModel, RegisterFormModel } from '@/models';
import { VALIDATION_RULES } from '@/consts';

export class AuthController {
  private authAPI: Nullable<AuthAPI> = null;

  constructor() {
    this.authAPI = new AuthAPI();
  }

  public validate(formData: LoginFormModel | RegisterFormModel) {
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      const { regExp } = VALIDATION_RULES[key];
      isValid = isValid && regExp.test(value);
    });

    return isValid;
  }

  public login(data: LoginFormModel): void {
    const isValid = this.validate(data);

    if (this.authAPI && isValid) {
      this.authAPI
        .signIn(data)
        .then(() => router.go('/messenger'))
        .catch((error) => console.log(error));
    } else {
      console.log('Invalid form data');
    }
  }

  public register(data: RegisterFormModel): void {
    const isValid = this.validate(data);

    if (this.authAPI && isValid) {
      this.authAPI
        .signUp(data)
        .then(() => router.go('/messenger'))
        .catch((error) => console.log(error));
    } else {
      console.log('Invalid form data');
    }
  }

  public logout(): void {
    if (this.authAPI) {
      this.authAPI
        .logout()
        .then(() => router.go('/'))
        .catch((error) => console.log(error));
    }
  }
}
