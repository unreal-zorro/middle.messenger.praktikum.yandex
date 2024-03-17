export interface User {
  id: number;
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  password: string;
  avatar: string;
}

export const user: User = {
  id: 1,
  email: 'pochta@yandex.ru',
  login: 'ivanivanov',
  first_name: 'Иван',
  second_name: 'Иванов',
  display_name: 'Иван',
  phone: '+7 (909) 967-30-30',
  password: '1234567891011121',
  avatar: ''
};
