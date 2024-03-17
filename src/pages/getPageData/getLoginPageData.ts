import { User } from "@/entities";

export const getLoginPageData = (user: User) => ({
  id: 'login',
  header: 'Вход',
  controls: [
    {
      label: 'Логин',
      name: 'login',
      type: 'text',
      value: user.login,
      error: ''
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      value: user.password,
      error: ''
    }
  ],
  buttons: [
    {
      type: 'submit',
      text: 'Войти',
      href: '/chats'
    }
  ],
  link: {
    text: 'Зарегистрироваться',
    href: '/register'
  }
});
