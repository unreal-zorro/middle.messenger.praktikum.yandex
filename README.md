# Web messenger

## Описание

Веб-мессенджер — это приложение для общения через веб-интерфейс.

## Установка и запуск

- `npm install` — установка всех зависимостей;
- `npm run start` — сборка проекта и запуск локального сервера (http://localhost:3000/);
- `npm run build` — сборка проекта;
- `npm run dev` — запуск сервера для разработки (http://localhost:5173/).

## Технологии в проекте

Исходный код приложения написан на языке JavaScript. Для создания шаблонов страниц использован шаблонизатор Handlebars. Для написания стилей применён препроцессор SCSS.

## Ссылка на шаблоны страниц в Figma

https://www.figma.com/file/ztRVwTa1FVh3I42YLFFOyE/Web-messenger?type=design&node-id=0%3A1&mode=design&t=0G3GbYznBYrYK8db-1

## Работа с ветками

При разработке проекта используются следующие ветки в git:
- `main` - стабильная ветка;
- `sprint_i`, где i - номер спринта - ветка для разработки;
- `deploy` - ветка для деплоя на хостинг в интернете.

Разработка ведётся в ветке sprint_i, где i - номер спринта. Она регулярно мёрджится в ветку deploy для проверки работы на реальном хостинге. После завершения работы в спринте ветка sprint_i, где i - номер спринта, пуллреквестится в ветку main. При принятии пуллреквеста ветка sprint_i, где i - номер спринта, мёрджится в ветку main.

## Хостинг в интернете

https://cool-web-messenger.netlify.app - готовый проект на бесплатном хостинге Netlify

## Ссылки на все страницы

### Ссылки на все страницы в dev сборке на сервере для разработки:

- http://localhost:5173 или http://localhost:5173/index.html — страница логина;
- http://localhost:5173/register — страница регистрации;
- http://localhost:5173/chats — страница чатов;
- http://localhost:5173/profile — страница профиля;
- http://localhost:5173/profile/data — страница изменения данных пользователя;
- http://localhost:5173/profile/password — страница изменения пароля;
- http://localhost:5173/error404 - страница 404;
- http://localhost:5173/error500 - страница 500.

### Ссылки на все страницы на локальном сервере:

- http://localhost:3000 или http://localhost:3000/index.html — страница логина;
- http://localhost:3000/register — страница регистрации;
- http://localhost:3000/chats — страница чатов;
- http://localhost:3000/profile — страница профиля;
- http://localhost:3000/profile/data — страница изменения данных пользователя;
- http://localhost:3000/profile/password — страница изменения пароля;
- http://localhost:3000/error404 - страница 404;
- http://localhost:3000/error500 - страница 500.

### Ссылки на все страницы на хостинге Netlify:

- https://cool-web-messenger.netlify.app или https://cool-web-messenger.netlify.app/index.html — страница логина;
- https://cool-web-messenger.netlify.app/register — страница регистрации;
- https://cool-web-messenger.netlify.app/chats — страница чатов;
- https://cool-web-messenger.netlify.app/profile — страница профиля;
- https://cool-web-messenger.netlify.app/profile/data — страница изменения данных пользователя;
- https://cool-web-messenger.netlify.app/profile/password — страница изменения пароля;
- https://cool-web-messenger.netlify.app/error404 - страница 404;
- https://cool-web-messenger.netlify.app/error500 - страница 500.

## **Примеры использования**

1. Страница логина:
![Страница логина](./docs/login-page.png)

2. Страница регистрации:
![Страница регистрации](./docs/register-page.png)

3. Страница чатов:
![Страница чатов](./docs/chats-page.png)

4. Страница профиля:
![Страница профиля](./docs/profile-page.png)

5. Страница изменения данных пользователя:
![Страница изменения данных пользователя](./docs/profile-data-page.png)

6. Страница изменения пароля:
![Страница изменения пароля](./docs/profile-password-page.png)

7. Страница 404:
![Страница 404](./docs/error404-page.png)

8. Страница 500:
![Страница 500](./docs/error500-page.png)
