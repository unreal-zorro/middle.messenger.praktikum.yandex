export const getLoginPageData = () => ({
  id: 'login',
  header: {
    text: 'Вход'
  },
  controls: [
    {
      label: 'Логин',
      name: 'login',
      type: 'text',
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
    }
  ],
  buttons: [
    {
      type: 'submit',
      text: 'Войти'
    }
  ],
  link: {
    text: 'Зарегистрироваться',
    href: '/register'
  }
});
