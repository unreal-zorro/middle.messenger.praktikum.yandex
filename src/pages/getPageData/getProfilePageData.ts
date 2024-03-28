import { User } from '@/entities';

type Mode = 'edit' | 'password' | 'view';

const getChangeAvatarModalData = () => {
  const header = 'Изменить аватар';

  const controls = [
    {
      label: '',
      name: 'avatar',
      type: 'file',
      disabled: false,
      value: '',
      error: false,
      text: ''
    }
  ];

  const buttons = [
    {
      type: 'submit',
      text: 'Изменить'
    }
  ]

  return {
    header,
    controls,
    buttons
  };
};

export const getProfilePageData = (user: User, mode: Mode) => {
  let data = {};
  const changeAvatarModal = {
    ...getChangeAvatarModalData()
  };

  if (mode === 'edit') {
    data = {
      id: 'profile-edit',
      avatar: {
        imgSrc: user.avatar
      },
      header: {
        text: ''
      },
      controls: [
        {
          label: 'Почта',
          name: 'email',
          type: 'email',
          disabled: false,
          value: user.email,
          error: false,
          text: ''
        },
        {
          label: 'Логин',
          name: 'login',
          type: 'text',
          disabled: false,
          value: user.login,
          error: false,
          text: ''
        },
        {
          label: 'Имя',
          name: 'first_name',
          type: 'text',
          disabled: false,
          value: user.first_name,
          error: false,
          text: ''
        },
        {
          label: 'Фамилия',
          name: 'second_name',
          type: 'text',
          disabled: false,
          value: user.second_name,
          error: false,
          text: ''
        },
        {
          label: 'Имя в чате',
          name: 'display_name',
          type: 'text',
          disabled: false,
          value: user.display_name,
          error: false,
          text: ''
        },
        {
          label: 'Телефон',
          name: 'phone',
          type: 'tel',
          disabled: false,
          value: user.phone,
          error: false,
          text: ''
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
      },
      changeAvatarModal
    };
  } else if (mode === 'password') {
    data = {
      id: 'profile-password',
      avatar: {
        imgSrc: user.avatar
      },
      header: {
        text: ''
      },
      controls: [
        {
          label: 'Старый пароль',
          name: 'oldPassword',
          type: 'password',
          disabled: false,
          value: '',
          error: false,
          text: ''
        },
        {
          label: 'Новый пароль',
          name: 'newPassword',
          type: 'password',
          disabled: false,
          value: '',
          error: false,
          text: ''
        },
        {
          label: 'Повторите пароль ещё раз',
          name: 'newPassword_again',
          type: 'password',
          disabled: false,
          value: '',
          error: false,
          text: ''
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
      },
      changeAvatarModal
    };
  } else {
    data = {
      id: 'profile',
      avatar: {
        imgSrc: user.avatar
      },
      header: {
        text: user.display_name
      },
      controls: [
        {
          label: 'Почта',
          name: 'email',
          type: 'email',
          disabled: true,
          value: user.email,
          error: false,
          text: ''
        },
        {
          label: 'Логин',
          name: 'login',
          type: 'text',
          disabled: true,
          value: user.login,
          error: false,
          text: ''
        },
        {
          label: 'Имя',
          name: 'first_name',
          type: 'text',
          disabled: true,
          value: user.first_name,
          error: false,
          text: ''
        },
        {
          label: 'Фамилия',
          name: 'second_name',
          type: 'text',
          disabled: true,
          value: user.second_name,
          error: false,
          text: ''
        },
        {
          label: 'Имя в чате',
          name: 'display_name',
          type: 'text',
          disabled: true,
          value: user.display_name,
          error: false,
          text: ''
        },
        {
          label: 'Телефон',
          name: 'phone',
          type: 'tel',
          disabled: true,
          value: user.phone,
          error: false,
          text: ''
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
      },
      changeAvatarModal
    };
  }

  return data;
};
