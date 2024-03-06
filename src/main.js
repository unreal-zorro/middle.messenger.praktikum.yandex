import './style.scss';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Modules from './modules';
import * as Pages from './pages';

const pages = {
  login: [Pages.LoginPage],
  register: [Pages.LoginPage],
  page404: [Pages.Page404],
  page500: [Pages.Page500],
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

const chats = [
  {
    id: 1,
    avatar: '/images/avatar.png',
    title: 'Приятель',
    message: {
      date: '15:07',
      sender: 'jack',
      text: 'Привет.'
    },
    count: 1
  },
  {
    id: 2,
    avatar: undefined,
    title: 'Знакомый',
    message: {
      date: '07 Фев 2024',
      sender: 'ivanivanov',
      text: 'Как дела?'
    },
    count: 0
  },
  {
    id: 3,
    avatar: '/images/avatar.png',
    title: 'Знакомый',
    message: {
      date: 'Пт',
      sender: 'jack',
      text: 'Всё хорошо?'
    },
    count: 177
  }
];

const getChatsListPageData = (chats, user) => {
  return chats.forEach(chat => {
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
    avatar: '/images/avatar.png',
    title: 'Приятель',
    message: {
      date: '15:07',
      sender: 'jack',
      text: 'Привет.'
    },
    count: 1
  },
  {
    id: 2,
    avatar: undefined,
    title: 'Знакомый',
    message: {
      date: '07 Фев 2024',
      sender: 'ivanivanov',
      text: 'Как дела?'
    },
    count: 0
  },
  {
    id: 3,
    avatar: '/images/avatar.png',
    title: 'Знакомый',
    message: {
      date: 'Пт',
      sender: 'jack',
      text: 'Всё хорошо?'
    },
    count: 177
  }
];

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

const getError500PageData = (error) => {
  return {
    id: 'error500',
    header: error.status,
    text: error.message,
    link: {
      text: 'Назад к чатам',
      href: '/chats'
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

const getProfilePageData = (user) => {
  return {
    id: 'profile',
    header: user.chat_name,
    avatar: user.avatar,
    controls: [
      {
        label: 'Почта',
        name: 'email',
        type: 'email',
        disabled: true,
        placeholder: '',
        value: user.email,
        error: 'Неверная почта'
      },
      {
        label: 'Логин',
        name: 'login',
        type: 'text',
        disabled: true,
        placeholder: '',
        value: user.login,
        error: 'Неверный логин'
      },
      {
        label: 'Имя',
        name: 'first_name',
        type: 'text',
        disabled: true,
        placeholder: '',
        value: user.first_name,
        error: 'Неверное имя'
      },
      {
        label: 'Фамилия',
        name: 'second_name',
        type: 'text',
        disabled: true,
        placeholder: '',
        value: user.first_name,
        error: 'Неверная фамилия'
      },
      {
        label: 'Имя в чате',
        name: 'chat_name',
        type: 'text',
        disabled: true,
        placeholder: '',
        value: user.chat_name,
        error: 'Неверное имя в чате'
      },
      {
        label: 'Телефон',
        name: 'phone',
        type: 'tel',
        disabled: '',
        placeholder: '',
        value: user.first_name,
        error: 'Неверный телефон'
      },
      {
        label: 'Старый пароль',
        name: 'password',
        type: 'password',
        disabled: true,
        placeholder: '',
        value: user.password,
        error: 'Неверный пароль'
      },
      {
        label: 'Новый пароль',
        name: 'new_password',
        type: 'password',
        disabled: true,
        placeholder: '',
        value: '1234567891011121',
        error: 'Пароли не совпадают'
      },
      {
        label: 'Повторите пароль ещё раз',
        name: 'password_again',
        type: 'password',
        disabled: true,
        placeholder: '',
        value: '1234567891011122',
        error: 'Пароли не совпадают'
      }
    ],
    buttons: [
      {
        type: 'button',
        text: 'Изменить данные',
        href: '/profile/edit-data'
      },
      {
        type: 'button',
        text: 'Изменить пароль',
        href: '/profile/edit-password'
      }
    ],
    link: {
      text: 'Выйти',
      href: '/'
    }
  };
};

function navigate(page, args = {}) {
  const [source] = pages[page];
  const template = Handlebars.compile(source);
  const root = document.querySelector('#root');

  console.log('args: ', args);

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
      break;
    }
    case '/register': {
      data = getRegisterPageData(user);
      page = 'register';
      break;
    }
    case '/page404':
      page = 'page404';
      break;
    case '/page500':
      page = 'page500';
      break;
    case '/profile':
      page = 'profile';
      break;
    case '/chats':
      page = 'chats';
      break;
    default:
      break;
  }

  navigate(page, data);
};

document.addEventListener('DOMContentLoaded', contentLoadedHandler);
