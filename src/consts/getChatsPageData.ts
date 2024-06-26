import type { MessageContent, Chat, CurrentChat, Message, User, MessageProps } from '@/entities';
import { CHAT_MENU_ITEMS, ATTACH_MENU_ITEMS, CONTENT_MENU_ITEMS } from './menuItems';

const getChatMenuData = () => {
  const items = [
    {
      type: 'button',
      href: '#icon-rename',
      text: CHAT_MENU_ITEMS.rename,
      dataButton: 'renameChatButton',
      dataSvg: 'renameChatSvg'
    },
    {
      type: 'button',
      href: '#icon-avatar',
      text: CHAT_MENU_ITEMS.changeAvatar,
      dataButton: 'changeChatAvatarButton',
      dataSvg: 'changeChatAvatarSvg'
    },
    {
      type: 'button',
      href: '#icon-delete',
      text: CHAT_MENU_ITEMS.delete,
      dataButton: 'deleteChatButton',
      dataSvg: 'deleteChatSvg'
    }
  ];

  return {
    items
  };
};

const getChatsListPageData = (user: User = {}, chats: Chat[] = []) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();

  const dateFormatter = new Intl.DateTimeFormat('ru', {
    month: 'long',
    day: 'numeric'
  });

  const shortDateFormatter = new Intl.DateTimeFormat('ru', {
    weekday: 'short'
  });

  const longDateFormatter = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const timeFormatter = new Intl.DateTimeFormat('ru', {
    hour: 'numeric',
    minute: 'numeric'
  });

  const weekDaysInMs = 7 * 24 * 60 * 60 * 1000;

  const capitalizeFirstLetter: (string: string) => string = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return chats.map((chat) => {
    const isISendLastMessage = chat.message.sender === user.login;

    const chatMessageDate = new Date(chat.message.date);

    let formatter = dateFormatter;

    const chatMessageYear = chatMessageDate.getFullYear();

    if (currentYear !== chatMessageYear) {
      formatter = longDateFormatter;
    }

    const dateDifference = new Date(currentDate.getTime() - chatMessageDate.getTime());

    if (dateDifference.getTime() < weekDaysInMs) {
      formatter = shortDateFormatter;

      const chatMessageDay = chatMessageDate.getDate();

      if (currentDay === chatMessageDay) {
        formatter = timeFormatter;
      }
    }

    let date = capitalizeFirstLetter(formatter.format(chatMessageDate));

    if (formatter === longDateFormatter) {
      date = date.slice(0, -3);
    }

    return {
      id: String(chat.id),
      avatar: chat.avatar,
      title: chat.title,
      date,
      text: chat.message.text,
      sender: isISendLastMessage,
      count: chat.count,
      active: chat.active
    };
  });
};

const getAttachMenuData = () => {
  const items = [
    {
      type: 'button',
      href: '#icon-photo',
      text: ATTACH_MENU_ITEMS.photo
    },
    {
      type: 'button',
      href: '#icon-file',
      text: ATTACH_MENU_ITEMS.file
    },
    {
      type: 'button',
      href: '#icon-location',
      text: ATTACH_MENU_ITEMS.location
    }
  ];

  return {
    items
  };
};

const getAttachPhotoModalData = () => {
  const header = 'Загрузите фото или видео';

  const controls = [
    {
      label: 'Выбрать файл на компьютере',
      name: 'photo',
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
    visibleAttachModal: false
  };
};

const getAttachFileModalData = () => {
  const header = 'Загрузите файл';

  const controls = [
    {
      label: 'Выбрать файл на компьютере',
      name: 'file',
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
    visibleAttachModal: false
  };
};

const getAttachLocationModalData = () => {
  const header = 'Загрузите локацию';

  const controls = [
    {
      label: 'Выбрать файл на компьютере',
      name: 'location',
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
    visibleAttachModal: false
  };
};

const getContentMenuData = () => {
  const items = [
    {
      type: 'button',
      href: '#icon-add',
      text: CONTENT_MENU_ITEMS.add
    },
    {
      type: 'button',
      href: '#icon-delete',
      text: CONTENT_MENU_ITEMS.delete
    }
  ];

  return {
    items
  };
};

const getAddNewChatModalData = () => {
  const header = 'Создать новый чат';

  const controls = [
    {
      label: 'Введите заголовок чата',
      name: 'newChatTitle',
      type: 'text',
      disabled: false,
      value: '',
      error: false,
      text: ''
    }
  ];

  const buttons = [
    {
      type: 'submit',
      text: 'Создать'
    }
  ];

  return {
    header,
    controls,
    buttons,
    visibleAttachModal: false
  };
};

export const getChatsContentPageData = (
  user: User = {},
  messagesArray: Message[] = [],
  currentChat: CurrentChat = {}
) => {
  if (!user || !messagesArray || !currentChat) {
    return {
      dates: [],
      messages: [],
      messageContent: [],
      currentChat: {}
    };
  }

  const dateArray: Set<string> = new Set();
  const messageArray: MessageProps[] = [];
  const messageContentArray: MessageContent[] = [];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  let dateFormatter = new Intl.DateTimeFormat('ru', {
    month: 'long',
    day: 'numeric'
  });

  const timeFormatter = new Intl.DateTimeFormat('ru', {
    hour: 'numeric',
    minute: 'numeric'
  });

  messagesArray.forEach((message) => {
    const messageDate = new Date(message.date);
    const messageYear = messageDate.getFullYear();

    const isISendMessage = message.login === user.login;

    if (currentYear !== messageYear) {
      dateFormatter = new Intl.DateTimeFormat('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    const date = dateFormatter.format(messageDate);
    const time = timeFormatter.format(messageDate);

    const resultMessage: MessageProps = {
      id: message.id,
      name: message.display_name,
      date,
      time,
      check: isISendMessage
    };

    dateArray.add(date);
    messageArray.push(resultMessage);
    messageContentArray.push(...message.content);
  });

  const chat = currentChat.id ? currentChat : undefined;

  return {
    dates: Array.from(dateArray),
    messages: messageArray,
    messageContent: messageContentArray,
    currentChat: chat
  };
};

const getUserAddModalData = () => {
  const header = 'Добавить пользователя';

  const controls = [
    {
      label: 'Id пользователя',
      name: 'addUser',
      type: 'text',
      disabled: false,
      value: '',
      error: false,
      text: ''
    }
  ];

  const buttons = [
    {
      type: 'submit',
      text: 'Добавить'
    }
  ];

  const listHeader = 'Список пользователей';
  const listTitle = 'Id --- Имя в чате';

  return {
    header,
    controls,
    buttons,
    listHeader,
    listTitle,
    list: [],
    visible: false
  };
};

const getUserDeleteModalData = () => {
  const header = 'Удалить пользователя';

  const controls = [
    {
      label: 'Id пользователя',
      name: 'deleteUser',
      type: 'text',
      disabled: false,
      value: '',
      error: false,
      text: ''
    }
  ];

  const buttons = [
    {
      type: 'submit',
      text: 'Удалить'
    }
  ];

  const listHeader = 'Список пользователей';
  const listTitle = 'Id --- Имя в чате';

  return {
    header,
    controls,
    buttons,
    listHeader,
    listTitle,
    list: [],
    visible: false
  };
};

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

export const getChatsPageData = () => {
  const chatMenu = getChatMenuData();

  const attachMenu = getAttachMenuData();
  const contentMenu = getContentMenuData();
  const userAddModal = {
    ...getUserAddModalData()
  };
  const userDeleteModal = {
    ...getUserDeleteModalData()
  };
  const attachPhotoModal = {
    ...getAttachPhotoModalData()
  };
  const attachFileModal = {
    ...getAttachFileModalData()
  };
  const attachLocationModal = {
    ...getAttachLocationModalData()
  };
  const addNewChatModal = {
    ...getAddNewChatModalData()
  };
  const changeAvatarModal = {
    ...getChangeAvatarModalData()
  };

  return {
    id: 'chats',
    search: {
      navLink: {
        text: 'Профиль >',
        href: '/settings'
      },
      searchForm: {
        input: {
          type: 'text',
          name: 'search',
          placeholder: 'Поиск',
          value: '',
          error: false
        }
      },
      button: {
        type: 'button',
        text: 'Создать новый чат'
      },
      addNewChatModal
    },
    list: {
      chats: getChatsListPageData(),
      chatMenu
    },
    content: {
      ...getChatsContentPageData(),
      contentMenu,
      userAddModal,
      userDeleteModal
    },
    newMessage: {
      newMessageForm: {
        input: {
          type: 'text',
          name: 'message',
          placeholder: 'Введите сообщение',
          error: false
        },
        error: {
          error: false,
          text: ''
        },
        attachButton: {
          type: 'button'
        },
        sendButton: {
          type: 'submit'
        }
      },
      attachMenu,
      attachPhotoModal,
      attachFileModal,
      attachLocationModal
    },
    changeAvatarModal
  };
};
