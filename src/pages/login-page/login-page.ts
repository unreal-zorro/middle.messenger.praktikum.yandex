import './login-page.scss';
import { Block, Listener } from '@/base/';
import type { Props } from '@/base/';
import { Header, Link } from '@/components';
import type { ButtonProps, HeaderProps, LinkProps } from '@/components';
import { AuthController } from '@/controllers';
import { LoginFormModel, RegisterFormModel } from '@/models';
import { isEqual } from '@/utils';
import { LoginForm } from './modules';
import type { LoginFormProps } from './modules';
import template from './login-page.hbs?raw';

interface LoginPageProps extends Props {
  id?: string;
  header?: HeaderProps;
  controls?: LoginFormProps[];
  buttons?: ButtonProps[];
  link?: LinkProps;
}

export class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super(props);

    const controller = new AuthController();

    const submitHandler: (...args: Record<string, string>[]) => void = (formData) => {
      try {
        if (this.props.id === 'login') {
          controller.login(formData as LoginFormModel);
        } else if (this.props.id === 'register') {
          controller.register(formData as RegisterFormModel);
        }
      } catch (error: unknown) {
        console.log((error as Error).message);
      }
    };

    this.children.headerChild = new Header({
      className: 'login__header',
      text: (this.props.header as HeaderProps)?.text as string,
      settings: {
        withInternalID: true
      }
    });

    this.children.formChild = new LoginForm({
      className: 'login__form',
      classNameFormControls: 'login__form-controls',
      classNameFormControl: 'login__form-control',
      classNameInputField: 'login__input-field',
      classNameLabel: 'login__label',
      classNameInput: 'login__input',
      classNameError: 'login__error',
      classNameButton: 'login__button',
      classNameLink: 'login__link',
      controls: this.props.controls as LoginFormProps[],
      buttons: this.props.buttons as ButtonProps[],
      submitHandler,
      settings: {
        withInternalID: false
      },
      events: {
        submit: (() => submitHandler.call(this)) as Listener
      }
    });

    this.children.linkChild = new Link({
      className: 'login__footer',
      href: (this.props.link as LinkProps)?.href as string,
      text: (this.props.link as LinkProps)?.text as string,
      settings: {
        withInternalID: true
      }
    });
  }

  componentDidUpdate(oldProps: LoginPageProps, newProps: LoginPageProps): boolean {
    if (!isEqual(oldProps as Indexed<unknown>, newProps as Indexed<unknown>)) {
      return true;
    }

    return false;
  }

  render(): string {
    return template;
  }
}
