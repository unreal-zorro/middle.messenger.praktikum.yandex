const getChatsListPageData = (user, chats) => {
  return chats.map((chat) => {
    const isISendLastMessage = chat.message.sender === user.login;

    return {
      id: chat.id,
      avatar: chat.avatar,
      title: chat.title,
      date: chat.message.date,
      text: chat.message.text,
      sender: isISendLastMessage,
      count: chat.count
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
