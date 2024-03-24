export const getRegisterPageData = () => ({
  id: 'register',
  header: {
    text: 'Регистрация'
  },
  controls: [
    {
      label: 'Почта',
      name: 'email',
      type: 'email',
      value: '',
      error: false,
      text: ''
    },
    {
      label: 'Логин',
      name: 'login',
      type: 'text',
      value: '',
      error: false,
      text: ''
    },
    {
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      value: '',
      error: false,
      text: ''
    },
    {
      label: 'Фамилия',
      name: 'second_name',
      type: 'text',
      value: '',
      error: false,
      text: ''
    },
    {
      label: 'Телефон',
      name: 'phone',
      type: 'tel',
      value: '',
      error: false,
      text: ''
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      value: '',
      error: false,
      text: ''
    },
    {
      label: 'Пароль (ещё раз)',
      name: 'password_again',
      type: 'password',
      value: '',
      error: false,
      text: ''
    }
  ],
  buttons: [
    {
      type: 'submit',
      text: 'Зарегистрироваться'
    }
  ],
  link: {
    text: 'Войти',
    href: '/'
  }
});
