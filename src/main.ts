import './style.scss';
import { user, errors, chats, messages, currentChat } from './entities';
// import { render } from './utils';
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
// import { Block, Router } from './base';
import { Router } from './base';

const router = new Router('#root');
const loginPageData = getLoginPageData();
const registerPageData = getRegisterPageData();
const profilePageData = getProfilePageData(user, 'view');
const chatsPageData = getChatsPageData(user, chats, messages, currentChat);
const error404PageData = getErrorPageData(errors.error404);
const error500PageData = getErrorPageData(errors.error500);

router
  .use('/', LoginPage, {
    settings: {
      withInternalID: false
    },
    ...loginPageData
  })
  .use('/sign-up', LoginPage, {
    settings: {
      withInternalID: false
    },
    ...registerPageData
  })
  .use('/settings', ProfilePage, {
    settings: {
      withInternalID: false
    },
    ...profilePageData
  })
  .use('/messenger', ChatsPage, {
    settings: {
      withInternalID: false
    },
    id: chatsPageData.id,
    search: chatsPageData.search,
    list: chatsPageData.list,
    content: chatsPageData.content,
    newMessage: chatsPageData.newMessage
  })
  .use('/error404', ErrorPage, {
    settings: {
      withInternalID: false
    },
    ...error404PageData
  })
  .use('/error500', ErrorPage, {
    settings: {
      withInternalID: false
    },
    ...error500PageData
  })
  .start();

setTimeout(() => {
  router.go('/');
}, 1000);

setTimeout(() => {
  router.go('/sign-up');
}, 2000);

setTimeout(() => {
  router.go('/settings');
}, 3000);

setTimeout(() => {
  router.go('/messenger');
}, 4000);

setTimeout(() => {
  router.back();
}, 5000);

setTimeout(() => {
  router.back();
}, 6000);

setTimeout(() => {
  router.back();
}, 7000);

setTimeout(() => {
  router.back();
}, 8000);

// const navigate: (page: Nullable<Block>) => void = (page) => {
//   if (page) {
//     render('#root', page);
//   }
// };

// const contentLoadedHandler: () => void = () => {
//   const { pathname } = window.location;
//   let page: Nullable<Block> = null;

//   switch (pathname) {
//     case '/':
//     case '/index.html': {
//       const data = getLoginPageData();

//       const loginPage = new LoginPage({
//         settings: {
//           withInternalID: false
//         },
//         ...data
//       });

//       page = loginPage;
//       break;
//     }
//     case '/register': {
//       const data = getRegisterPageData();

//       const loginPage = new LoginPage({
//         settings: {
//           withInternalID: false
//         },
//         ...data
//       });

//       page = loginPage;
//       break;
//     }
//     case '/error404': {
//       const data = getErrorPageData(errors.error404);

//       const errorPage = new ErrorPage({
//         settings: {
//           withInternalID: false
//         },
//         ...data
//       });

//       page = errorPage;
//       break;
//     }
//     case '/error500': {
//       const data = getErrorPageData(errors.error500);

//       const errorPage = new ErrorPage({
//         settings: {
//           withInternalID: false
//         },
//         ...data
//       });

//       page = errorPage;
//       break;
//     }
//     case '/profile': {
//       const data = getProfilePageData(user, 'view');

//       const profilePage = new ProfilePage({
//         settings: {
//           withInternalID: false
//         },
//         ...data
//       });

//       page = profilePage;
//       break;
//     }
//     case '/profile/data': {
//       const data = getProfilePageData(user, 'edit');

//       const profilePage = new ProfilePage({
//         settings: {
//           withInternalID: false
//         },
//         ...data
//       });

//       page = profilePage;
//       break;
//     }
//     case '/profile/password': {
//       const data = getProfilePageData(user, 'password');

//       const profilePage = new ProfilePage({
//         settings: {
//           withInternalID: false
//         },
//         ...data
//       });

//       page = profilePage;
//       break;
//     }
//     case '/chats': {
//       const data = getChatsPageData(user, chats, messages, currentChat);

//       const chatsPage = new ChatsPage({
//         settings: {
//           withInternalID: false
//         },
//         id: data.id,
//         search: data.search,
//         list: data.list,
//         content: data.content,
//         newMessage: data.newMessage
//       });

//       page = chatsPage;
//       break;
//     }
//     default:
//       break;
//   }

//   navigate(page);
// };

// document.addEventListener('DOMContentLoaded', contentLoadedHandler);
