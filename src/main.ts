import './style.scss';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Modules from './modules';
import * as Pages from './pages';
import { user, errors, chats, messages, currentChat } from './entities';

import {
  getErrorPageData,
  getChatsPageData,
  getLoginPageData,
  getRegisterPageData,
  getProfilePageData
} from './pages';

const pages: Record<string, string[]> = {
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

const navigate = (page: string, args = {}) => {
  const [source] = pages[page];
  const template = Handlebars.compile(source);
  const root = document.querySelector('#root');
  if (root) {
    root.innerHTML = template(args);
  }
};

const contentLoadedHandler = () => {
  const { pathname } = window.location;
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
      data = getChatsPageData(user, chats, messages, currentChat);
      page = 'chats';
      break;
    }
    default:
      break;
  }

  navigate(page, data);
};

document.addEventListener('DOMContentLoaded', contentLoadedHandler);
