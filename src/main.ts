import './style.scss';
import { user, errors, chats, messages, currentChat } from './entities';
import { render } from './utils';
import {
  LoginPage,
  ErrorPage,
  getLoginPageData,
  getRegisterPageData,
  getErrorPageData,
  getProfilePageData,
  ProfilePage,
  getChatsPageData,
  ChatsPage
} from './pages';
import { Block } from './base';

const navigate: (page: Nullable<Block>) => void = (page) => {
  if (page) {
    render('#root', page);
  }
};

const contentLoadedHandler: () => void = () => {
  const { pathname } = window.location;
  let page: Nullable<Block> = null;

  switch (pathname) {
    case '/':
    case '/index.html': {
      const data = getLoginPageData();

      const loginPage = new LoginPage({
        settings: {
          withInternalID: false
        },
        ...data
      });

      page = loginPage;
      break;
    }
    case '/register': {
      const data = getRegisterPageData();

      const loginPage = new LoginPage({
        settings: {
          withInternalID: false
        },
        ...data
      });

      page = loginPage;
      break;
    }
    case '/error404': {
      const data = getErrorPageData(errors.error404);

      const errorPage = new ErrorPage({
        settings: {
          withInternalID: false
        },
        ...data
      });

      page = errorPage;
      break;
    }
    case '/error500': {
      const data = getErrorPageData(errors.error500);

      const errorPage = new ErrorPage({
        settings: {
          withInternalID: false
        },
        ...data
      });

      page = errorPage;
      break;
    }
    case '/profile': {
      const data = getProfilePageData(user, 'view');

      const profilePage = new ProfilePage({
        settings: {
          withInternalID: false
        },
        ...data
      });

      page = profilePage;
      break;
    }
    case '/profile/data': {
      const data = getProfilePageData(user, 'edit');

      const profilePage = new ProfilePage({
        settings: {
          withInternalID: false
        },
        ...data
      });

      page = profilePage;
      break;
    }
    case '/profile/password': {
      const data = getProfilePageData(user, 'password');

      const profilePage = new ProfilePage({
        settings: {
          withInternalID: false
        },
        ...data
      });

      page = profilePage;
      break;
    }
    case '/chats': {
      const data = getChatsPageData(user, chats, messages, currentChat);

      const chatsPage = new ChatsPage({
        settings: {
          withInternalID: false
        },
        id: data.id,
        search: data.search,
        list: data.list,
        content: data.content,
        newMessage: data.newMessage
      });

      page = chatsPage;
      break;
    }
    default:
      break;
  }

  navigate(page);
};

document.addEventListener('DOMContentLoaded', contentLoadedHandler);
