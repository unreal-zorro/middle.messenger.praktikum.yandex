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

  return items;
};

const getChatsListPageData = (user, chats) => {
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

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

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
      id: chat.id,
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

  return items;
};

const getUserMenuData = () => {
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

  return items;
};

export const getChatsContentPageData = (user, messagesArray, currentChat) => {
  const result = {};

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

    const resultMessage = {
      id: message.id,
      name: message.display_name,
      time,
      check: isISendMessage,
      content: message.content
    };

    const resultMessagesArray = result[date] || [];
    resultMessagesArray.push(resultMessage);

    result[date] = resultMessagesArray;
  });

  const messages = [];

  Object.entries(result).forEach((item) => {
    messages.push({
      date: item[0],
      message: item[1]
    });
  });

  const chat = currentChat.id ? currentChat : null;

  return {
    messages,
    chat
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

export const getChatsPageData = (user, chats, messages, currentChat) => {
  const chatMenu = {
    items: getChatMenuData()
  };

  const attachMenu = {
    items: getAttachMenuData()
  };

  const userMenu = {
    items: getUserMenuData()
  };

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
          disabled: '',
          placeholder: 'Поиск',
          value: '',
          error: ''
        }
      ]
    },
    list: {
      chats: getChatsListPageData(user, chats),
      chatMenu
    },
    content: {
      ...getChatsContentPageData(user, messages, currentChat),
      attachMenu,
      userMenu,
      userDeleteModal
    },
    newMessage: {
      control: {
        name: 'message',
        type: 'text',
        placeholder: 'Введите сообщение',
        error: ''
      },
      attachButton: {
        type: 'button'
      },
      sendButton: {
        type: 'submit'
      }
    }
  };
};
