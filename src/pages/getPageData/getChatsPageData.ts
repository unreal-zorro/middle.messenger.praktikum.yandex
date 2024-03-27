import type { MessageContent, Chat, CurrentChat, Message, User } from '@/entities';
import { MessageProps } from '../chats-page/modules/content';

const getChatMenuData = () => {
  const items = [
    {
      type: 'button',
      href: '#icon-rename',
      text: 'Переименовать чат'
    },
    {
      type: 'button',
      href: '#icon-avatar',
      text: 'Изменить аватар чата'
    },
    {
      type: 'button',
      href: '#icon-delete',
      text: 'Удалить чат'
    }
  ];

  return {
    items
  };
};

const getChatsListPageData = (user: User, chats: Chat[]) => {
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
      text: 'Фото или видео'
    },
    {
      type: 'button',
      href: '#icon-file',
      text: 'Файл'
    },
    {
      type: 'button',
      href: '#icon-location',
      text: 'Локация'
    }
  ];

  return {
    items
  };
};

const getContentMenuData = () => {
  const items = [
    {
      type: 'button',
      href: '#icon-add',
      text: 'Добавить пользователя'
    },
    {
      type: 'button',
      href: '#icon-delete',
      text: 'Удалить пользователя'
    }
  ];

  return {
    items
  };
};

export const getChatsContentPageData = (
  user: User,
  messagesArray: Message[],
  currentChat: CurrentChat
) => {
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

const getUserDeleteModalData = () => {
  const title = 'Вы уверены?';

  const buttons = [
    {
      type: 'submit',
      cancel: false,
      text: 'Да'
    },
    {
      type: 'button',
      cancel: true,
      text: 'Нет'
    }
  ];

  return {
    title,
    buttons
  };
};

export const getChatsPageData = (
  user: User,
  chats: Chat[],
  messages: Message[],
  currentChat: CurrentChat
) => {
  const chatMenu = getChatMenuData();

  const attachMenu = getAttachMenuData();
  const contentMenu = getContentMenuData();
  const userDeleteModal = {
    ...getUserDeleteModalData()
  };

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
          disabled: false,
          placeholder: 'Поиск',
          value: '',
          error: false,
          text: ''
        }
      ]
    },
    list: {
      chats: getChatsListPageData(user, chats),
      chatMenu
    },
    content: {
      ...getChatsContentPageData(user, messages, currentChat),
      contentMenu,
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
      attachMenu
    }
  };
};
