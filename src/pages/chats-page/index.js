import Handlebars from 'handlebars';
import './chats-page.scss';
import * as Modules from './modules';

Object.entries(Modules).forEach(([name, module]) => {
  Handlebars.registerPartial(name, module);
});

export { default as ChatsPage } from './chats-page.hbs?raw';
