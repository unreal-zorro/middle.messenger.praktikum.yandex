import './profile-page.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Avatar, Header, Link } from '@/components';
import template from './profile-page.hbs?raw';
import { ProfileForm } from './modules';

interface ProfilePageFormControl extends Record<string, string | boolean | undefined> {
  label?: string;
  name?: string;
  type?: string;
  disabled?: boolean;
  value?: string;
  error?: string;
}

interface ProfilePageButton extends Record<string, string | undefined> {
  type?: string;
  text?: string;
  href?: string;
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

    this.children.formChild = new ProfileForm({
      className: 'profile__form',
      classNameFormControls: 'profile__form-controls',
      classNameFormControl: 'profile__form-control',
      classNameInputField: 'profile__input-field',
      classNameLabel: 'profile__label',
      classNameInput: 'profile__input',
      classNameError: 'profile__error',
      classNameFormButtons: 'profile__buttons',
      classNameButton: 'profile__button',
      classNameLink: 'profile__link',
      controls: this.props.controls as ProfilePageFormControl[],
      buttons: this.props.buttons as ProfilePageButton[],
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
