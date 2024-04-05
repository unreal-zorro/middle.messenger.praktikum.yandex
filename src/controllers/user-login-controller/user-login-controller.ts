// import { SigninAPI, UserAPI } from '@/api';
// import { UserAPI } from '@/api';
// import { store } from '@/store';

interface LoginFormModel {
  email: string;
  password: string;
}

// const loginApi = new SigninAPI();
// const userLoginValidator = validateLoginFields(validateRules);

// function validate(target, key, descriptor) {
//   const originalMethod = descriptor.value;
//   const cache = {};
//   descriptor.value = function (n: number): number {
//     return cache[n] ? cache[n] : (cache[n] = originalMethod(n));
//   };
// }

export class UserLoginController {
  // private userAPI: Nullable<UserAPI> = null;

  constructor() {
    // this.userAPI = new UserAPI();
  }

  // public getUser() {
  //   if (this.userAPI) {
  //     this.userAPI.request().then((data) => store.set('user', data));
  //   }
  // }

  public async login(data: LoginFormModel) {
    try {
      // Запускаем крутилку
      console.log(data);

      // const validateData = userLoginValidator(data);

      // if (!validateData.isCorrect) {
      //   throw new Error(validateData);
      // }

      // const userID = loginApi.request(prepareDataToRequest(data));

      // RouteManagement.go('/chats');

      // Останавливаем крутилку
    } catch (error) {
      // Логика обработки ошибок
    }
  }
}

// class UserLoginController {
//   @validate(userLoginValidateRules)
//   @handleError(handler)
//   public async login(data: LoginFormModel) {
//     const userID = loginApi.request(prepareDataToRequest(data));
//     RouteManagement.go('/chats');
//   }
// }
