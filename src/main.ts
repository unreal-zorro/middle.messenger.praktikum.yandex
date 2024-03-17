import './style.scss';
// import Handlebars from 'handlebars';
// import * as Components from '@/components';
// import * as Modules from '@/modules';
// import * as Pages from '@/pages';
// import { user, errors, chats, messages, currentChat } from '@/entities';
import { Button, Error, Input, Label } from './components';
import { InputField } from './modules';
import { render } from './utils';

// import {
//   getErrorPageData,
//   getChatsPageData,
//   getLoginPageData,
//   getRegisterPageData,
//   getProfilePageData
// } from '@/pages';

// const pages: Record<string, string[]> = {
//   login: [Pages.LoginPage],
//   register: [Pages.LoginPage],
//   error404: [Pages.ErrorPage],
//   error500: [Pages.ErrorPage],
//   profile: [Pages.ProfilePage],
//   chats: [Pages.ChatsPage]
// };

// Object.entries(Components).forEach(([name, component]) => {
//   Handlebars.registerPartial(name, component);
// });

// Object.entries(Modules).forEach(([name, module]) => {
//   Handlebars.registerPartial(name, module);
// });

// const navigate = (page: string, args = {}) => {
//   const [source] = pages[page];
//   const template = Handlebars.compile(source);
//   const root = document.querySelector('#root');
//   if (root) {
//     root.innerHTML = template(args);
//   }
// };

const contentLoadedHandler = () => {
  const { pathname } = window.location;
  // let page = 'login';
  // let data = {};

  // switch (pathname) {
  //   case '/':
  //   case '/index.html': {
  //     data = getLoginPageData(user);
  //     page = 'register';
  //     break;
  //   }
  //   case '/register': {
  //     data = getRegisterPageData(user);
  //     page = 'register';
  //     break;
  //   }
  //   case '/error404': {
  //     data = getErrorPageData(errors.error404);
  //     page = 'error404';
  //     break;
  //   }
  //   case '/error500': {
  //     data = getErrorPageData(errors.error500);
  //     page = 'error500';
  //     break;
  //   }
  //   case '/profile': {
  //     data = getProfilePageData(user);
  //     page = 'profile';
  //     break;
  //   }
  //   case '/profile/data': {
  //     data = getProfilePageData(user, 'edit');
  //     page = 'profile';
  //     break;
  //   }
  //   case '/profile/password': {
  //     data = getProfilePageData(user, 'password');
  //     page = 'profile';
  //     break;
  //   }
  //   case '/chats': {
  //     data = getChatsPageData(user, chats, messages, currentChat);
  //     page = 'chats';
  //     break;
  //   }
  //   default:
  //     break;
  // }

  if (pathname === '/test') {
    const clickHandler = () => {
      console.log('click');
    };

    const button = new Button({
      className: 'my-btn',
      cancel: false,
      type: 'button',
      text: 'This is button',
      settings: {
        withInternalID: false
      },
      events: {
        click: clickHandler
      }
    });

    setTimeout(() => {
      button.setProps({ text: 'Bye-bye' });
    }, 3000);

    const error = new Error({
      className: '',
      error: false,
      text: 'Error',
      settings: {
        withInternalID: false
      },
      events: {
        click: clickHandler
      }
    });

    setTimeout(() => {
      error.setProps({ error: true });
    }, 3000);

    const label = new Label({
      className: 'my-label',
      for: 'user_name',
      text: 'Имя пользователя',
      settings: {
        withInternalID: false
      },
      events: {
        click: clickHandler
      }
    });

    const input = new Input({
      className: 'my-input',
      error: false,
      type: 'text',
      name: 'user_name',
      value: 'Name',
      placeholder: '',
      disabled: false,
      settings: {
        withInternalID: false
      },
      events: {
        click: clickHandler
      }
    });

    setTimeout(() => {
      input.setProps({ error: true });
    }, 3000);

    const inputField = new InputField({
      className: 'my-input-field',
      classNameLabel: 'my-input-field-label',
      classNameInput: 'my-input-field-input',
      classNameError: 'my-input-field-error',
      name: 'user_name',
      label: 'Имя пользователя',
      type: 'text',
      value: 'User',
      placeholder: '',
      disabled: false,
      error: false,
      text: 'Введите имя пользователя',
      settings: {
        withInternalID: false
      },
      events: {
        click: clickHandler
      }
    });

    setTimeout(() => {
      inputField.setProps({ error: true });
    }, 3000);

    // render('#root', label);
    // render('#root', input);
    // render('#root', error);
    // render('#root', button);
    render('#root', inputField);
  } else {
    // navigate(page, data);
  }
};

document.addEventListener('DOMContentLoaded', contentLoadedHandler);
