import './style.scss';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
  login: [Pages.LoginPage],
  register: [Pages.RegisterPage]
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page) {
  const [source, args] = pages[page];
  const template = Handlebars.compile(source);
  const root = document.querySelector('#root');
  root.innerHTML = template(args);
}

const contentLoadedHandler = () => {
  const pathname = window.location.pathname;
  let page = 'login';

  switch (pathname) {
    case '/':
    case '/index.html':
      break;
    case '/register':
      page = 'register';
      break;
    default:
      break;
  }

  navigate(page);
};

document.addEventListener('DOMContentLoaded', contentLoadedHandler);
