import './profile-page.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Avatar, Header, Link } from '@/components';
import template from './profile-page.hbs?raw';

interface ProfilePageFormControl extends Record<string, string | boolean | undefined> {
  label?: string;
  name?: string;
  type?: string;
  disabled?: boolean;
  value?: string;
  error?: string;
}

interface ProfilePageLink extends Record<string, string | undefined> {
  text?: string;
  href?: string;
}

interface ProfilePageProps extends Props {
  id?: string;
  avatar?: string;
  header?: string;
  controls?: ProfilePageFormControl[];
  link?: ProfilePageLink;
  navLink?: ProfilePageLink;
}

export class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super(props);

    this.children.avatarChild = new Avatar({
      className: 'avatar_big profile__avatar',
      imgSrc: this.props.avatar as string,
      settings: {
        withInternalID: false
      }
    });

    this.children.headerChild = new Header({
      className: 'profile__header',
      text: this.props.header as string,
      settings: {
        withInternalID: false
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
      className: 'profile__footer',
      href: (this.props.link as ProfilePageLink)?.href as string,
      text: (this.props.link as ProfilePageLink)?.text as string,
      settings: {
        withInternalID: false
      }
    });

    this.children.navLinkChild = new Link({
      className: 'profile__nav',
      href: (this.props.navLink as ProfilePageLink)?.href as string,
      text: (this.props.navLink as ProfilePageLink)?.text as string,
      settings: {
        withInternalID: false
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
