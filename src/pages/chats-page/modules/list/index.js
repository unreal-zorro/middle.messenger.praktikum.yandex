import Handlebars from 'handlebars';
import './list.scss';
import * as Modules from './modules';

Object.entries(Modules).forEach(([name, module]) => {
  Handlebars.registerPartial(name, module);
});

export { default as List } from './list.hbs?raw';
