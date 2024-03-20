export interface MessageContent extends Record<string, string | boolean | undefined> {
  messageId?: string;
  isText?: boolean;
  isImage?: boolean;
  data?: string;
}

export interface Message {
  id: string;
  login: string;
  display_name: string;
  date: string;
  check: boolean;
  content: MessageContent[];
}

export interface CurrentChat {
  id: string;
  avatar: string;
  title: string;
}

export const messages: Message[] = [
  {
    id: '1',
    login: 'vadim',
    display_name: 'Вадим',
    date: '2024-06-19T11:56:00.000+03:00',
    check: true,
    content: [
      {
        messageId: '1',
        isText: true,
        data: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории.'
      },
      {
        messageId: '1',
        isText: true,
        data: 'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так.'
      }
    ]
  },
  {
    id: '2',
    login: 'vadim',
    display_name: 'Вадим',
    date: '2024-06-19T11:56:00.000+03:00',
    check: true,
    content: [
      {
        messageId: '2',
        isImage: true,
        data: '/images/camera.png'
      }
    ]
  },
  {
    id: '3',
    login: 'ivanivanov',
    display_name: 'Иван',
    date: '2024-06-19T12:00:00.000+03:00',
    check: true,
    content: [
      {
        messageId: '3',
        isText: true,
        data: 'Круто!!!'
      }
    ]
  }
];

export const currentChat: CurrentChat = {
  id: '3',
  avatar: '',
  title: 'Вадим'
};
