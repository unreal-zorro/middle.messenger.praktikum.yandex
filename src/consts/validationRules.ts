interface ValidationRules {
  [key: string]: {
    regExp: RegExp;
    message: string;
  };
}

const REGEXPS = {
  NAME: /^([A-Z][(a-z)-]*)|^([А-Я][(а-я)-]*)/,
  LOGIN: /(?!^\d+$)^[a-zA-Z0-9_-]{3,20}$/,
  EMAIL: /^[\w-]+(?:\.[\w-]+)*@[\w-]+(?:\.[a-z]+)+$/,
  PASSWORD: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
  PHONE: /(^\++\d{9,15})|(^\d{10,15})/,
  MESSAGE: /^(?!\s*$).+/,
  IMAGE: /.*\.(jpe?g|png|gif|webp)$/i
};

export const VALIDATION_RULES: ValidationRules = {
  first_name: {
    regExp: REGEXPS.NAME,
    message:
      'Имя должно быть на латинице или кириллице, первая буква должна быть заглавной, ' +
      'без пробелов и без цифр, нет спецсимволов (допустим только дефис)'
  },
  second_name: {
    regExp: REGEXPS.NAME,
    message:
      'Фамилия должна быть на латинице или кириллице, первая буква должна быть заглавной, ' +
      'без пробелов и без цифр, нет спецсимволов (допустим только дефис)'
  },
  display_name: {
    regExp: REGEXPS.NAME,
    message:
      'Имя в чате должно быть на латинице или кириллице, первая буква должна быть заглавной, ' +
      'без пробелов и без цифр, нет спецсимволов (допустим только дефис)'
  },
  login: {
    regExp: REGEXPS.LOGIN,
    message:
      'Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, ' +
      'но не состоять из них, без пробелов, без спецсимволов ' +
      '(допустимы дефис и нижнее подчёркивание)'
  },
  email: {
    regExp: REGEXPS.EMAIL,
    message:
      'Email должен быть на латинице, может включать цифры и спецсимволы вроде дефиса, ' +
      'обязательно должна быть «собака» (@) и точка после неё, но перед точкой ' +
      'обязательно должны быть буквы'
  },
  password: {
    regExp: REGEXPS.PASSWORD,
    message:
      'Пароль должен содержать от 8 до 40 символов, обязательна хотя бы ' +
      'одна заглавная буква и цифра'
  },
  password_again: {
    regExp: REGEXPS.PASSWORD,
    message:
      'Пароль должен содержать от 8 до 40 символов, обязательна хотя бы ' +
      'одна заглавная буква и цифра'
  },
  oldPassword: {
    regExp: REGEXPS.PASSWORD,
    message:
      'Пароль должен содержать от 8 до 40 символов, обязательна хотя бы ' +
      'одна заглавная буква и цифра'
  },
  newPassword: {
    regExp: REGEXPS.PASSWORD,
    message:
      'Пароль должен содержать от 8 до 40 символов, обязательна хотя бы ' +
      'одна заглавная буква и цифра'
  },
  newPassword_again: {
    regExp: REGEXPS.PASSWORD,
    message:
      'Пароль должен содержать от 8 до 40 символов, обязательна хотя бы ' +
      'одна заглавная буква и цифра'
  },
  phone: {
    regExp: REGEXPS.PHONE,
    message:
      'Телефон должен содержать от 10 до 15 символов, состоять из цифр, ' +
      'может начинаться с плюса'
  },
  message: {
    regExp: REGEXPS.MESSAGE,
    message: 'Поле не должно быть пустым'
  },
  avatar: {
    regExp: REGEXPS.IMAGE,
    message: 'Нужно выбрать файл с изображением'
  },
  photo: {
    regExp: REGEXPS.MESSAGE,
    message: 'Нужно выбрать файл'
  },
  file: {
    regExp: REGEXPS.MESSAGE,
    message: 'Нужно выбрать файл'
  },
  location: {
    regExp: REGEXPS.MESSAGE,
    message: 'Нужно выбрать файл'
  },
  addUser: {
    regExp: REGEXPS.MESSAGE,
    message: 'Поле не должно быть пустым'
  },
  deleteUser: {
    regExp: REGEXPS.MESSAGE,
    message: 'Поле не должно быть пустым'
  },
  newChatTitle: {
    regExp: REGEXPS.MESSAGE,
    message: 'Поле не должно быть пустым'
  }
};
