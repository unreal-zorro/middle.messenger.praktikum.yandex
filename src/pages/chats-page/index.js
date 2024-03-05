import Handlebars from 'handlebars';
import './chats-page.scss';
export { default as ChatsPage } from './chats-page.hbs?raw';
import { Search } from './modules/search';

Handlebars.registerPartial("Search", Search);
