import { User } from '@/entities';

type Mode = 'edit' | 'password' | 'view';

export const getProfilePageData = (user: User, mode: Mode) => {
  let data = {};

  if (mode === 'edit') {
    data = {
      id: 'profile-edit',
      avatar: user.avatar,
      header: '',
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
          value: user.display_name,
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
          text: 'Сохранить'
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
          name: 'oldPassword',
          type: 'password',
          disabled: false,
          value: '',
          error: ''
        },
        {
          label: 'Новый пароль',
          name: 'newPassword',
          type: 'password',
          disabled: false,
          value: '',
          error: ''
        },
        {
          label: 'Повторите пароль ещё раз',
          name: 'newPassword_again',
          type: 'password',
          disabled: false,
          value: '',
          error: ''
        }
      ],
      buttons: [
        {
          type: 'submit',
          text: 'Сохранить'
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
      header: user.display_name,
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
          name: 'display_name',
          type: 'text',
          disabled: true,
          value: user.display_name,
          error: ''
        },
        {
          label: 'Телефон',
          name: 'phone',
          type: 'tel',
          disabled: true,
          value: user.phone,
          error: ''
        }
      ],
      buttons: [],
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
