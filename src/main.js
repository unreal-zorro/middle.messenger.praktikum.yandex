import './style.scss';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Modules from './modules';
import * as Pages from './pages';

const pages = {
  login: [Pages.LoginPage],
  register: [Pages.LoginPage],
  error404: [Pages.ErrorPage],
  error500: [Pages.ErrorPage],
  profile: [Pages.ProfilePage],
  chats: [Pages.ChatsPage]
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

Object.entries(Modules).forEach(([name, module]) => {
  Handlebars.registerPartial(name, module);
});

const user = {
  id: 1,
  email: 'pochta@yandex.ru',
  login: 'ivanivanov',
  first_name: 'Иван',
  second_name: 'Иванов',
  chat_name: 'Иван',
  phone: '+7 (909) 967-30-30',
  password: '1234567891011121',
  avatar: '/images/avatar.png'
};

const errors = {
  error404: {
    status: 404,
    message: 'Страница не найдена'
  },
  error500: {
    status: 500,
    message: 'Внутренняя ошибка сервера'
  }
};

const getErrorPageData = (error) => {
  const id = `error${error.status}`;

  return {
    id,
    header: error.status,
    text: error.message,
    link: {
      text: 'Назад к чатам',
      href: '/chats'
    }
  };
};

const chats = [
  {
    id: 1,
    avatar: '/images/avatar.png',
    title: 'Андрей',
    message: {
      date: '10:49',
      sender: 'andrew',
      text: 'Изображение'
    },
    count: 2
  },
  {
    id: 2,
    avatar: '/images/avatar.png',
    title: 'Киноклуб',
    message: {
      date: '12:00',
      sender: 'ivanivanov',
      text: 'стикер'
    },
    count: ''
  },
  {
    id: 3,
    avatar: '',
    title: 'Вадим',
    message: {
      date: 'Пт',
      sender: 'ivanivanov',
      text: 'Круто!!!'
    },
    count: ''
  }
];

const getChatsListPageData = (user, chats) => {
  return chats.map(chat => {
    const isISendLastMessage = chat.message.sender === user.login;

    return {
      id: chat.id,
      avatar: chat.avatar,
      title: chat.title,
      date: chat.message.date,
      text: chat.message.text,
      sender: isISendLastMessage,
      count: chat.count
    };
  });
};

const messages = [
  {
    id: 1,
    login: 'vadim',
    display_name: 'Вадим',
    date: '19 июня',
    time: '11:56',
    check: true,
    content: [
      {
        type: 'text',
        data: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.'
      },
      {
        type: 'text',
        data: 'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.'
      }
    ]
  },
  {
    id: 2,
    login: 'vadim',
    display_name: 'Вадим',
    date: '19 июня',
    time: '11:56',
    check: true,
    content: [
      {
        type: 'image',
        data: '/images/camera.png'
      }
    ]
  },
  {
    id: 3,
    login: 'ivanivanov',
    display_name: 'Иван',
    date: '19 июня',
    time: '12:00',
    check: true,
    content: [
      {
        type: 'text',
        data: 'Круто!!!'
      }
    ]
  }
];

const currentChat = {
  id: 1,
  avatar: '/images/avatar.png',
  title: 'Андрей',
};

const getChatsContentPageData = (user, messagesArray, currentChat) => {
  const messages = messagesArray.map(message => {
    const isISendMessage = message.login === user.login;

    return {
      id: message.id,
      name: message.display_name,
      date: message.date,
      time: message.time,
      check: isISendMessage,
      content: message.content
    };
  });

  const date = messages[0].date;

  const chat = currentChat.id ? currentChat : null;

  return {
    date,
    messages,
    chat
  };
};

const getChatsPageData = (user, chats, messages) => {
  return {
    id: 'chats',
    search: {
      navLink: {
        text: 'Профиль >',
        href: '/profile'
      },
      controls: [
        {
          label: '',
          name: 'search',
          type: 'text',
          disabled: '',
          placeholder: 'Поиск',
          value: '',
          error: ''
        }
      ]
    },
    list: {
      chats: getChatsListPageData(user, chats)
    },
    content: getChatsContentPageData(user, messages, currentChat),
    newMessage: {
      control: {
        name: 'message',
        type: 'text',
        placeholder: 'Введите сообщение',
        error: ''
      },
      attachButton: {
        type: 'button',
      },
      sendButton: {
        type: 'submit',
      }
    }
  };
};

const getLoginPageData = (user) => {
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

const getRegisterPageData = (user) => {
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

const getProfilePageData = (user, mode) => {
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
          placeholder: '',
          value: user.email,
          error: ''
        },
        {
          label: 'Логин',
          name: 'login',
          type: 'text',
          disabled: false,
          placeholder: '',
          value: user.login,
          error: ''
        },
        {
          label: 'Имя',
          name: 'first_name',
          type: 'text',
          disabled: false,
          placeholder: '',
          value: user.first_name,
          error: ''
        },
        {
          label: 'Фамилия',
          name: 'second_name',
          type: 'text',
          disabled: false,
          placeholder: '',
          value: user.second_name,
          error: ''
        },
        {
          label: 'Имя в чате',
          name: 'display_name',
          type: 'text',
          disabled: false,
          placeholder: '',
          value: user.chat_name,
          error: ''
        },
        {
          label: 'Телефон',
          name: 'phone',
          type: 'tel',
          disabled: false,
          placeholder: '',
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
          placeholder: '',
          value: user.password,
          error: ''
        },
        {
          label: 'Новый пароль',
          name: 'new_password',
          type: 'password',
          disabled: false,
          placeholder: '',
          value: '1234567891011121',
          error: ''
        },
        {
          label: 'Повторите пароль ещё раз',
          name: 'password_again',
          type: 'password',
          disabled: false,
          placeholder: '',
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
          placeholder: '',
          value: user.email,
          error: ''
        },
        {
          label: 'Логин',
          name: 'login',
          type: 'text',
          disabled: true,
          placeholder: '',
          value: user.login,
          error: ''
        },
        {
          label: 'Имя',
          name: 'first_name',
          type: 'text',
          disabled: true,
          placeholder: '',
          value: user.first_name,
          error: ''
        },
        {
          label: 'Фамилия',
          name: 'second_name',
          type: 'text',
          disabled: true,
          placeholder: '',
          value: user.second_name,
          error: ''
        },
        {
          label: 'Имя в чате',
          name: 'chat_name',
          type: 'text',
          disabled: true,
          placeholder: '',
          value: user.chat_name,
          error: ''
        },
        {
          label: 'Телефон',
          name: 'phone',
          type: 'tel',
          disabled: true,
          placeholder: '',
          value: user.phone,
          error: ''
        },
        {
          label: 'Старый пароль',
          name: 'password',
          type: 'password',
          disabled: true,
          placeholder: '',
          value: user.password,
          error: ''
        },
        {
          label: 'Новый пароль',
          name: 'new_password',
          type: 'password',
          disabled: true,
          placeholder: '',
          value: '1234567891011121',
          error: ''
        },
        {
          label: 'Повторите пароль ещё раз',
          name: 'password_again',
          type: 'password',
          disabled: true,
          placeholder: '',
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

function navigate(page, args = {}) {
  const [source] = pages[page];
  const template = Handlebars.compile(source);
  const root = document.querySelector('#root');
  root.innerHTML = template(args);
}

const contentLoadedHandler = () => {
  const pathname = window.location.pathname;
  let page = 'login';
  let data = {};

  switch (pathname) {
    case '/':
    case '/index.html': {
      data = getLoginPageData(user);
      page = 'register';
      break;
    }
    case '/register': {
      data = getRegisterPageData(user);
      page = 'register';
      break;
    }
    case '/error404': {
      data = getErrorPageData(errors.error404);
      page = 'error404';
      break;
    }
    case '/error500': {
      data = getErrorPageData(errors.error500);
      page = 'error500';
      break;
    }
    case '/profile': {
      data = getProfilePageData(user);
      page = 'profile';
      break;
    }
    case '/profile/data': {
      data = getProfilePageData(user, 'edit');
      page = 'profile';
      break;
    }
    case '/profile/password': {
      data = getProfilePageData(user, 'password');
      page = 'profile';
      break;
    }
    case '/chats': {
      data = getChatsPageData(user, chats, messages);
      page = 'chats';
      break;
    }
    default:
      break;
  }

  navigate(page, data);
};

document.addEventListener('DOMContentLoaded', contentLoadedHandler);
