import { User } from "@/entities";

export const getRegisterPageData = (user: User) => ({
  id: 'register',
  header: 'Регистрация',
  controls: [
    {
      label: 'Почта',
      name: 'email',
      type: 'email',
      value: user.email,
      error: ''
    },
    {
      label: 'Логин',
      name: 'login',
      type: 'text',
      value: user.login,
      error: ''
    },
    {
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      value: user.first_name,
      error: ''
    },
    {
      label: 'Фамилия',
      name: 'second_name',
      type: 'text',
      value: user.first_name,
      error: ''
    },
    {
      label: 'Телефон',
      name: 'phone',
      type: 'tel',
      value: user.phone,
      error: ''
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      value: user.password,
      error: 'Пароли не совпадают'
    },
    {
      label: 'Пароль (ещё раз)',
      name: 'password_again',
      type: 'password',
      value: user.password,
      error: 'Пароли не совпадают'
    }
  ],
  buttons: [
    {
      type: 'submit',
      text: 'Зарегистрироваться',
      href: '/chats'
    }
  ],
  link: {
    text: 'Войти',
    href: '/'
  }
});
