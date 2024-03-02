import './style.scss';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
  'login': [ Pages.LoginPage ]
};

Object.entries(Components).forEach(([ name, component ]) =>{
  Handlebars.registerPartial(name, component);
});

function navigate(page) {
  const [ source, args ] = pages[page];
  const template = Handlebars.compile(source);
  const root = document.querySelector('#root');
  root.innerHTML = template(args);
}

const contentLoadedHandler = () => {
  navigate('login');
}

document.addEventListener('DOMContentLoaded', contentLoadedHandler);
