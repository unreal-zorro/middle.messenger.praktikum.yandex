import './profile-page.scss';
import { Block, Listener } from '@/base';
import type { Props } from '@/base';
import { Avatar, Button, Header, Link } from '@/components';
import type { AvatarProps, ButtonProps, HeaderProps, LinkProps } from '@/components';
import { VALIDATION_RULES } from '@/consts';
import { ProfileForm } from './modules';
import type { ProfileFormProps } from './modules';
import template from './profile-page.hbs?raw';

interface ProfilePageProps extends Props {
  id?: string;
  avatar?: string;
  header?: string;
  controls?: ProfileFormProps[];
  buttons?: ButtonProps[];
  link?: LinkProps;
  navLink?: LinkProps;
}

export class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super(props);

    const submitHandler: (...args: Record<string, string>[]) => void = (formData) => {
      let isValid = true;

      Object.entries(formData).forEach(([key, value]) => {
        const { regExp } = VALIDATION_RULES[key];
        isValid = isValid && regExp.test(value);
      });

      if (isValid) {
        console.log(formData);
      } else {
        console.log('Invalid form data');
      }
    };

    this.children.avatarChild = new Avatar({
      className: 'avatar_big profile__avatar',
      imgSrc: (this.props.avatar as AvatarProps)?.imgSrc as string,
      settings: {
        withInternalID: false
      }
    });

    this.children.headerChild = new Header({
      className: 'profile__header',
      text: (this.props.header as HeaderProps)?.text as string,
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
      controls: this.props.controls as ProfileFormProps[],
      buttons: this.props.buttons as ButtonProps[],
      submitHandler,
      settings: {
        withInternalID: false
      },
      events: {
        submit: (() => submitHandler.call(this)) as Listener
      }
    });

    if (!this.props.buttons || !(this.props.buttons as ButtonProps[])?.length) {
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
      href: (this.props.link as LinkProps)?.href as string,
      text: (this.props.link as LinkProps)?.text as string,
      settings: {
        withInternalID: false
      }
    });

    this.children.navLinkChild = new Link({
      className: 'profile__nav',
      href: (this.props.navLink as LinkProps)?.href as string,
      text: (this.props.navLink as LinkProps)?.text as string,
      settings: {
        withInternalID: false
      }
    });
  }

  render(): string {
    return template;
  }
}
