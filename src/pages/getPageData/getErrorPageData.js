export const getErrorPageData = (error) => {
  const id = `error${error.status}`;

  return {
    id,
    header: error.status,
    text: error.message,
    link: {
      text: 'Назад к чатам',
      href: '/chats'
    }
  };
};
