export const getRegisterPageData = () => ({
  id: 'register',
  header: 'Регистрация',
  controls: [
    {
      label: 'Почта',
      name: 'email',
      type: 'email',
      value: '',
      error: ''
    },
    {
      label: 'Логин',
      name: 'login',
      type: 'text',
      value: '',
      error: ''
    },
    {
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      value: '',
      error: ''
    },
    {
      label: 'Фамилия',
      name: 'second_name',
      type: 'text',
      value: '',
      error: ''
    },
    {
      label: 'Телефон',
      name: 'phone',
      type: 'tel',
      value: '',
      error: ''
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      value: '',
      error: ''
    },
    {
      label: 'Пароль (ещё раз)',
      name: 'password_again',
      type: 'password',
      value: '',
      error: ''
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
