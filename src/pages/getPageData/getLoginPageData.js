export const getLoginPageData = (user) => {
  return {
    id: 'login',
    header: 'Вход',
    controls: [
      {
        label: 'Логин',
        name: 'login',
        type: 'text',
        disabled: '',
        placeholder: '',
        value: user.login,
        error: ''
      },
      {
        label: 'Пароль',
        name: 'password',
        type: 'password',
        disabled: '',
        placeholder: '',
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
  };
};
