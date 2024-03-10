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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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

  for (const [date, message] of Object.entries(result)) {
    messages.push({
      date,
      message
    });
  }

  const chat = currentChat.id ? currentChat : null;

  return {
    messages,
    chat
  };
};

export const getChatsPageData = (user, chats, messages, currentChat) => {
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
      chats: getChatsListPageData(user, chats)
    },
    content: getChatsContentPageData(user, messages, currentChat),
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
