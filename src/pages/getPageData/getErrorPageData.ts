import { Error } from "@/entities";

export const getErrorPageData = (error: Error) => {
  const id = `error${error.status}`;

  return {
    id,
    header: String(error.status),
    text: error.message,
    link: {
      text: 'Назад к чатам',
      href: '/chats'
    }
  };
};
