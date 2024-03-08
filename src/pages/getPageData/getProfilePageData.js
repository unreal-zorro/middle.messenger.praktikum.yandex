export const getProfilePageData = (user, mode) => {
  let data = {};

  if (mode === 'edit') {
    data = {
      id: 'profile-edit',
      avatar: user.avatar,
      header: user.chat_name,
      controls: [
        {
          label: 'Почта',
          name: 'email',
          type: 'email',
          disabled: false,
          value: user.email,
          error: ''
        },
        {
          label: 'Логин',
          name: 'login',
          type: 'text',
          disabled: false,
          value: user.login,
          error: ''
        },
        {
          label: 'Имя',
          name: 'first_name',
          type: 'text',
          disabled: false,
          value: user.first_name,
          error: ''
        },
        {
          label: 'Фамилия',
          name: 'second_name',
          type: 'text',
          disabled: false,
          value: user.second_name,
          error: ''
        },
        {
          label: 'Имя в чате',
          name: 'display_name',
          type: 'text',
          disabled: false,
          value: user.chat_name,
          error: ''
        },
        {
          label: 'Телефон',
          name: 'phone',
          type: 'tel',
          disabled: false,
          value: user.phone,
          error: ''
        }
      ],
      buttons: [
        {
          type: 'submit',
          text: 'Сохранить',
          href: '/profile'
        }
      ],
      link: {},
      navLink: {
        text: 'Назад в профиль',
        href: '/profile'
      }
    };
  } else if (mode === 'password') {
    data = {
      id: 'profile-password',
      avatar: user.avatar,
      controls: [
        {
          label: 'Старый пароль',
          name: 'password',
          type: 'password',
          disabled: false,
          value: user.password,
          error: ''
        },
        {
          label: 'Новый пароль',
          name: 'new_password',
          type: 'password',
          disabled: false,
          value: '1234567891011121',
          error: ''
        },
        {
          label: 'Повторите пароль ещё раз',
          name: 'password_again',
          type: 'password',
          disabled: false,
          value: '1234567891011122',
          error: ''
        }
      ],
      buttons: [
        {
          type: 'submit',
          text: 'Сохранить',
          href: '/profile'
        }
      ],
      link: {},
      navLink: {
        text: 'Назад в профиль',
        href: '/profile'
      }
    };
  } else {
    data = {
      id: 'profile',
      avatar: user.avatar,
      header: user.chat_name,
      controls: [
        {
          label: 'Почта',
          name: 'email',
          type: 'email',
          disabled: true,
          value: user.email,
          error: ''
        },
        {
          label: 'Логин',
          name: 'login',
          type: 'text',
          disabled: true,
          value: user.login,
          error: ''
        },
        {
          label: 'Имя',
          name: 'first_name',
          type: 'text',
          disabled: true,
          value: user.first_name,
          error: ''
        },
        {
          label: 'Фамилия',
          name: 'second_name',
          type: 'text',
          disabled: true,
          value: user.second_name,
          error: ''
        },
        {
          label: 'Имя в чате',
          name: 'chat_name',
          type: 'text',
          disabled: true,
          value: user.chat_name,
          error: ''
        },
        {
          label: 'Телефон',
          name: 'phone',
          type: 'tel',
          disabled: true,
          value: user.phone,
          error: ''
        },
        {
          label: 'Старый пароль',
          name: 'password',
          type: 'password',
          disabled: true,
          value: user.password,
          error: ''
        },
        {
          label: 'Новый пароль',
          name: 'new_password',
          type: 'password',
          disabled: true,
          value: '1234567891011121',
          error: ''
        },
        {
          label: 'Повторите пароль ещё раз',
          name: 'password_again',
          type: 'password',
          disabled: true,
          value: '1234567891011122',
          error: ''
        }
      ],
      buttons: [
        {
          type: 'button',
          text: 'Изменить данные',
          href: '/profile/data'
        },
        {
          type: 'button',
          text: 'Изменить пароль',
          href: '/profile/password'
        }
      ],
      link: {
        text: 'Выйти',
        href: '/'
      },
      navLink: {
        text: 'Назад к чатам',
        href: '/chats'
      }
    };
  }

  return data;
};