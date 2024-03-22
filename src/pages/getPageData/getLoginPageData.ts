export const getLoginPageData = () => ({
  id: 'login',
  header: 'Вход',
  controls: [
    {
      label: 'Логин',
      name: 'login',
      type: 'text',
      value: '',
      error: ''
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      value: '',
      error: ''
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
