export const getRegisterPageData = (user) => {
  return {
    id: 'register',
    header: 'Регистрация',
    controls: [
      {
        label: 'Почта',
        name: 'email',
        type: 'email',
        disabled: '',
        placeholder: '',
        value: user.email,
        error: ''
      },
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
        label: 'Имя',
        name: 'first_name',
        type: 'text',
        disabled: '',
        placeholder: '',
        value: user.first_name,
        error: ''
      },
      {
        label: 'Фамилия',
        name: 'second_name',
        type: 'text',
        disabled: '',
        placeholder: '',
        value: user.first_name,
        error: ''
      },
      {
        label: 'Телефон',
        name: 'phone',
        type: 'tel',
        disabled: '',
        placeholder: '',
        value: user.phone,
        error: ''
      },
      {
        label: 'Пароль',
        name: 'password',
        type: 'password',
        disabled: '',
        placeholder: '',
        value: user.password,
        error: 'Пароли не совпадают'
      },
      {
        label: 'Пароль (ещё раз)',
        name: 'password_again',
        type: 'password',
        disabled: '',
        placeholder: '',
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
  };
};
