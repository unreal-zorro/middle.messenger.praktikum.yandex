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
      error: '',
      text: ''
    },
    {
      label: 'Логин',
      name: 'login',
      type: 'text',
      value: '',
      error: '',
      text: ''
    },
    {
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      value: '',
      error: '',
      text: ''
    },
    {
      label: 'Фамилия',
      name: 'second_name',
      type: 'text',
      value: '',
      error: '',
      text: ''
    },
    {
      label: 'Телефон',
      name: 'phone',
      type: 'tel',
      value: '',
      error: '',
      text: ''
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      value: '',
      error: '',
      text: ''
    },
    {
      label: 'Пароль (ещё раз)',
      name: 'password_again',
      type: 'password',
      value: '',
      error: '',
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
