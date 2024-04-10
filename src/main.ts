import './style.scss';
import { router } from './router';
import { errors } from './entities';
import {
  LoginPage,
  ErrorPage,
  getLoginPageData,
  getRegisterPageData,
  getErrorPageData,
  getProfilePageData,
  ProfilePage,
  withUser,
  getChatsPageData,
  ChatsPage
} from './pages';

const loginPageData = getLoginPageData();
const registerPageData = getRegisterPageData();
const profilePageData = getProfilePageData('view');
const profilePageEditData = getProfilePageData('edit');
const profilePagePasswordData = getProfilePageData('password');
const chatsPageData = getChatsPageData();
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
  .use('/settings', withUser(ProfilePage), {
    settings: {
      withInternalID: false
    },
    ...profilePageData
  })
  .use('/settings/data', withUser(ProfilePage), {
    settings: {
      withInternalID: false
    },
    ...profilePageEditData
  })
  .use('/settings/password', withUser(ProfilePage), {
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

router.start();

const clickHandler: (event: MouseEvent) => void = (event) => {
  const target = event.target as HTMLElement;
  const href = target.getAttribute('href');

  if (href) {
    event.preventDefault();
    router.go(href);
  }
};

document.body.addEventListener('click', (event: MouseEvent) => clickHandler(event));
