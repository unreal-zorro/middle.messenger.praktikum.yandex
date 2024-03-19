import { user, errors, chats, messages, currentChat } from './entities';
import './style.scss';
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

  const clickHandler = () => {
    console.log('click');
  };

  switch (pathname) {
    case '/':
    case '/index.html': {
      const data = getLoginPageData(user);

      const loginPage = new LoginPage({
        settings: {
          withInternalID: false
        },
        events: {
          click: clickHandler
        },
        ...data
      });

      page = loginPage;
      break;
    }
    case '/register': {
      const data = getRegisterPageData(user);

      const loginPage = new LoginPage({
        settings: {
          withInternalID: false
        },
        events: {
          click: clickHandler
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
        events: {
          click: clickHandler
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
        events: {
          click: clickHandler
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
        events: {
          click: clickHandler
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
        events: {
          click: clickHandler
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
        events: {
          click: clickHandler
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
        events: {
          click: clickHandler
        },
        id: data.id,
        controlsSearch: data.search.controls,
        navLinkSearch: data.search.navLink,
        chats: data.list.chats,
        chatMenuItems: data.list.chatMenu.items,
        controlNewMessage: data.newMessage.control,
        attachButtonNewMessage: data.newMessage.attachButton,
        sendButtonNewMessage: data.newMessage.sendButton
      });

      page = chatsPage;
      break;
    }
    default:
      break;
  }

  navigate(page);

  if (pathname === '/test') {
    // const clickHandler = () => {
    //   console.log('click');
    // };

    // const button = new Button({
    //   className: 'my-btn',
    //   cancel: false,
    //   type: 'button',
    //   text: 'This is button',
    //   settings: {
    //     withInternalID: false
    //   },
    //   events: {
    //     click: clickHandler
    //   }
    // });

    // setTimeout(() => {
    //   button.setProps({ text: 'Bye-bye' });
    // }, 3000);

    // const error = new Error({
    //   className: '',
    //   error: false,
    //   text: 'Error',
    //   settings: {
    //     withInternalID: false
    //   },
    //   events: {
    //     click: clickHandler
    //   }
    // });

    // setTimeout(() => {
    //   error.setProps({ error: true });
    // }, 3000);

    // const label = new Label({
    //   className: 'my-label',
    //   for: 'user_name',
    //   text: 'Имя пользователя',
    //   settings: {
    //     withInternalID: false
    //   },
    //   events: {
    //     click: clickHandler
    //   }
    // });

    // const input = new Input({
    //   className: 'my-input',
    //   error: false,
    //   type: 'text',
    //   name: 'user_name',
    //   value: 'Name',
    //   placeholder: '',
    //   disabled: false,
    //   settings: {
    //     withInternalID: false
    //   },
    //   events: {
    //     click: clickHandler
    //   }
    // });

    // setTimeout(() => {
    //   input.setProps({ error: true });
    // }, 3000);

    // const inputField = new InputField({
    //   className: 'my-input-field',
    //   classNameLabel: 'my-input-field-label',
    //   classNameInput: 'my-input-field-input',
    //   classNameError: 'my-input-field-error',
    //   name: 'user_name',
    //   label: 'Имя пользователя',
    //   type: 'text',
    //   value: 'User',
    //   placeholder: '',
    //   disabled: false,
    //   error: false,
    //   text: 'Введите имя пользователя',
    //   settings: {
    //     withInternalID: false
    //   },
    //   events: {
    //     click: clickHandler
    //   }
    // });

    // setTimeout(() => {
    //   inputField.setProps({ error: true });
    // }, 3000);

    const data = getLoginPageData(user);

    const loginPage = new LoginPage({
      settings: {
        withInternalID: false
      },
      events: {
        click: clickHandler
      },
      ...data
    });

    page = loginPage;

    render('#root', loginPage);
  }
};

document.addEventListener('DOMContentLoaded', contentLoadedHandler);
