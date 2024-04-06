type Mode = 'edit' | 'password' | 'view';

const getChangeAvatarModalData = () => {
  const header = 'Загрузите файл';

  const controls = [
    {
      label: 'Выбрать файл на компьютере',
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
      text: 'Поменять'
    }
  ];

  return {
    header,
    controls,
    buttons,
    visibleChangeAvatarModal: false
  };
};

export const getProfilePageData = (mode: Mode) => {
  let data = {};
  const changeAvatarModal = {
    ...getChangeAvatarModalData()
  };

  if (mode === 'edit') {
    data = {
      id: 'profile-edit',
      avatar: {
        imgSrc: ''
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
          value: '',
          error: false,
          text: ''
        },
        {
          label: 'Логин',
          name: 'login',
          type: 'text',
          disabled: false,
          value: '',
          error: false,
          text: ''
        },
        {
          label: 'Имя',
          name: 'first_name',
          type: 'text',
          disabled: false,
          value: '',
          error: false,
          text: ''
        },
        {
          label: 'Фамилия',
          name: 'second_name',
          type: 'text',
          disabled: false,
          value: '',
          error: false,
          text: ''
        },
        {
          label: 'Имя в чате',
          name: 'display_name',
          type: 'text',
          disabled: false,
          value: '',
          error: false,
          text: ''
        },
        {
          label: 'Телефон',
          name: 'phone',
          type: 'tel',
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
        href: '/settings'
      },
      changeAvatarModal
    };
  } else if (mode === 'password') {
    data = {
      id: 'profile-password',
      avatar: {
        imgSrc: ''
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
        href: '/settings'
      },
      changeAvatarModal
    };
  } else {
    data = {
      id: 'profile',
      avatar: {
        imgSrc: ''
      },
      header: {
        text: ''
      },
      controls: [
        {
          label: 'Почта',
          name: 'email',
          type: 'email',
          disabled: true,
          value: '',
          error: false,
          text: ''
        },
        {
          label: 'Логин',
          name: 'login',
          type: 'text',
          disabled: true,
          value: '',
          error: false,
          text: ''
        },
        {
          label: 'Имя',
          name: 'first_name',
          type: 'text',
          disabled: true,
          value: '',
          error: false,
          text: ''
        },
        {
          label: 'Фамилия',
          name: 'second_name',
          type: 'text',
          disabled: true,
          value: '',
          error: false,
          text: ''
        },
        {
          label: 'Имя в чате',
          name: 'display_name',
          type: 'text',
          disabled: true,
          value: '',
          error: false,
          text: ''
        },
        {
          label: 'Телефон',
          name: 'phone',
          type: 'tel',
          disabled: true,
          value: '',
          error: false,
          text: ''
        }
      ],
      buttons: [],
      navButtons: [
        {
          type: 'button',
          text: 'Изменить данные',
          href: '/settings/data'
        },
        {
          type: 'button',
          text: 'Изменить пароль',
          href: '/settings/password'
        }
      ],
      link: {
        text: 'Выйти',
        href: '/'
      },
      navLink: {
        text: 'Назад к чатам',
        href: '/messenger'
      },
      changeAvatarModal
    };
  }

  return data;
};
