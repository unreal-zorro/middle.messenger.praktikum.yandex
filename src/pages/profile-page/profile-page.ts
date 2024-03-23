import './profile-page.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Avatar, Button, Header, Link } from '@/components';
import type { Listener } from '@/base/EventBus';
import { ProfileForm } from './modules';
import template from './profile-page.hbs?raw';

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
  buttons?: ProfilePageButton[];
  link?: ProfilePageLink;
  navLink?: ProfilePageLink;
}

export class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super(props);

    const submitHandler: (...args: Record<string, string>[]) => void = (formData) => {
      console.log(`${this.props.id}: `, formData);
    };

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
      submitHandler,
      settings: {
        withInternalID: false
      },
      events: {
        submit: (() => submitHandler.call(this)) as Listener
      }
    });

    if (!this.props.buttons || !(this.props.buttons as ProfilePageButton[])?.length) {
      this.children.changeDataButtonChild = new Button({
        className: 'profile__button',
        type: 'button',
        text: 'Изменить данные',
        settings: {
          withInternalID: false
        }
      });

      this.children.changePasswordButtonChild = new Button({
        className: 'profile__button',
        type: 'button',
        text: 'Изменить пароль',
        settings: {
          withInternalID: false
        }
      });
    }

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

  render(): string {
    return template;
  }
}
