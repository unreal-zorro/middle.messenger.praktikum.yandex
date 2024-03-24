export interface Error {
  status: number;
  message: string;
}

export type Errors = Record<string, Error>;

export const errors: Errors = {
  error404: {
    status: 404,
    message: 'Страница не найдена'
  },
  error500: {
    status: 500,
    message: 'Внутренняя ошибка сервера'
  }
};
