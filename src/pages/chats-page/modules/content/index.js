import Handlebars from 'handlebars';
import './content.scss';
import * as Modules from './modules';

Object.entries(Modules).forEach(([name, module]) => {
  Handlebars.registerPartial(name, module);
});

export { default as Content } from './content.hbs?raw';
