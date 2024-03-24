import { Error } from '@/entities';

export const getErrorPageData = (error: Error) => {
  const id = `error${error.status}`;

  return {
    id,
    header: {
      text: String(error.status)
    },
    text: {
      text: error.message
    },
    link: {
      text: 'Назад к чатам',
      href: '/chats'
    }
  };
};
