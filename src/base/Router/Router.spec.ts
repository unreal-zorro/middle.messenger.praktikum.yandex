import { expect } from 'chai';
import { Router } from './Router';
import { Route } from '../Route';
import { Block } from '../Block';
import type { Props } from '../Block';

class LoginPage extends Block {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return '<main id="login">Login</main>';
  }
}

class RegisterPage extends Block {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return '<main id="register">Register</main>';
  }
}

describe('Router tests', () => {
  let router: Router;

  before(() => {
    router = new Router('#root');
  });

  it('should add one route', () => {
    router.use('/', LoginPage, {});
    const route = router.getRoute('/');

    expect(route).to.be.an.instanceof(Route);
  });

  it('should add two routes', () => {
    router.use('/sign-up', RegisterPage, {});
    const route = router.getRoute('/sign-up');

    expect(route).to.be.an.instanceof(Route);
  });

  it('should render route', async () => {
    window.location.pathname = '/';
    await router.start();
    const page = document.querySelector('#login');
    const pageText = page?.textContent;

    expect(pageText).to.be.equal('Login');
  });

  it('should change route', async () => {
    window.location.pathname = '/';
    await router.go('/sign-up');
    const page = document.querySelector('#register');
    const pageText = page?.textContent;

    expect(pageText).to.be.equal('Register');
  });
});
