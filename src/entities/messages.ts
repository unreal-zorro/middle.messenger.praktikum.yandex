export interface MessageContent {
  isText?: boolean;
  isImage?: boolean;
  data: string;
}

export interface Message {
  id: number;
  login: string;
  display_name: string;
  date: string;
  time: string;
  check: boolean;
  content: MessageContent[];
}

export interface CurrentChat {
  id: number;
  avatar: string;
  title: string;
}

export const messages: Message[] = [
  {
    id: 1,
    login: 'vadim',
    display_name: 'Вадим',
    date: '2024-06-19T11:56:00.000+03:00',
    time: '11:56',
    check: true,
    content: [
      {
        isText: true,
        data: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории.'
      },
      {
        isText: true,
        data: 'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так.'
      }
    ]
  },
  {
    id: 2,
    login: 'vadim',
    display_name: 'Вадим',
    date: '2024-06-19T11:56:00.000+03:00',
    time: '11:56',
    check: true,
    content: [
      {
        isImage: true,
        data: '/images/camera.png'
      }
    ]
  },
  {
    id: 3,
    login: 'ivanivanov',
    display_name: 'Иван',
    date: '2024-06-19T12:00:00.000+03:00',
    time: '12:00',
    check: true,
    content: [
      {
        isText: true,
        data: 'Круто!!!'
      }
    ]
  }
];

export const currentChat: CurrentChat = {
  id: 3,
  avatar: '',
  title: 'Вадим'
};
