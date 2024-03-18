import './profile-page.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Header, Link } from '@/components';
import template from './profile-page.hbs?raw';

interface ProfilePageProps extends Props {
  id?: string;
  header?: string;
  controls?: LoginPageFormControl[];
  buttons?: LoginPageButton[];
  link?: LoginPageLink;
}

export class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super(props);

    this.children.headerChild = new Header({
      className: 'login__header',
      text: this.props.header as string,
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
      controls: this.props.controls as LoginPageFormControl[],
      buttons: this.props.buttons as LoginPageButton[],
      settings: {
        withInternalID: false
      }
    });

    this.children.linkChild = new Link({
      className: 'login__footer',
      href: (this.props.link as LoginPageLink)?.href as string,
      text: (this.props.link as LoginPageLink)?.text as string,
      settings: {
        withInternalID: true
      }
    });
  }

  // componentDidUpdate(oldProps: LoginPageProps, newProps: LoginPageProps): boolean {
  //   if (oldProps.value !== newProps.value) {
  //     this.children.inputChild.setProps({ value: newProps.value });
  //   }

  //   if (oldProps.disabled !== newProps.disabled) {
  //     this.children.inputChild.setProps({ disabled: newProps.disabled });
  //   }

  //   if (oldProps.error !== newProps.error) {
  //     this.children.inputChild.setProps({ error: newProps.error });
  //     this.children.errorChild.setProps({ error: newProps.error });
  //   }

  //   if (oldProps.text !== newProps.text) {
  //     this.children.errorChild.setProps({ text: newProps.text });
  //   }

  //   return true;
  // }

  render(): string {
    return template;
  }
}
