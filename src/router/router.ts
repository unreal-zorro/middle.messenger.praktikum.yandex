import { user, errors, chats, messages, currentChat } from '@/entities';
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
} from '@/pages';
import { Router } from '@/base';

const router = new Router('#root');
const loginPageData = getLoginPageData();
const registerPageData = getRegisterPageData();
const profilePageData = getProfilePageData(user, 'view');
const profilePageEditData = getProfilePageData(user, 'edit');
const profilePagePasswordData = getProfilePageData(user, 'password');
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
  .use('/settings/data', ProfilePage, {
    settings: {
      withInternalID: false
    },
    ...profilePageEditData
  })
  .use('/settings/password', ProfilePage, {
    settings: {
      withInternalID: false
    },
    ...profilePagePasswordData
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
  });

export default router;
