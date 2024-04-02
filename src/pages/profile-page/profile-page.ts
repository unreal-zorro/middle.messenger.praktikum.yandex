import './profile-page.scss';
import { Block, Listener } from '@/base';
import type { Props } from '@/base';
import { Avatar, Button, Header, Link } from '@/components';
import type { AvatarProps, ButtonProps, HeaderProps, LinkProps } from '@/components';
import { VALIDATION_RULES } from '@/consts';
import { Modal } from '@/modules';
import type { ModalProps } from '@/modules';
import { ProfileForm } from './modules';
import type { ProfileFormProps } from './modules';
import template from './profile-page.hbs?raw';

interface ProfilePageProps extends Props {
  id?: string;
  avatar?: string;
  header?: string;
  controls?: ProfileFormProps[];
  buttons?: ButtonProps[];
  navButtons?: ButtonProps[];
  link?: LinkProps;
  navLink?: LinkProps;
  changeAvatarModal?: ModalProps;
  visibleChangeAvatarModal?: boolean;
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

    const submitChangeAvatarModalHandler: (...args: Record<string, string>[]) => void = (
      formData
    ) => {
      let isValid = true;

      Object.entries(formData).forEach(([key, value]) => {
        const { regExp } = VALIDATION_RULES[key];
        isValid = isValid && regExp.test(value);
      });

      if (isValid) {
        this.setProps({
          visibleChangeAvatarModal: false
        });

        console.log(formData);
      } else {
        console.log('Invalid form data');
      }
    };

    const avatarClickHandler: Listener = () => {
      this.setProps({
        visibleChangeAvatarModal: true
      });
    };

    const closeChangeAvatarModalHandler: Listener = () => {
      this.setProps({
        visibleChangeAvatarModal: false
      });
    };

    this.children.avatarChild = new Avatar({
      className: 'avatar_big profile__avatar',
      imgSrc: (this.props.avatar as AvatarProps)?.imgSrc as string,
      settings: {
        withInternalID: false
      },
      events: {
        click: (() => avatarClickHandler.call(this)) as Listener
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

    if (
      (!this.props.buttons || !(this.props.buttons as ButtonProps[])?.length) &&
      this.props.navButtons
    ) {
      this.children.navButtons = (this.props.navButtons as ButtonProps[])?.map(
        (navButton) =>
          new Button({
            className: 'profile__button',
            type: navButton.type,
            settings: {
              withInternalID: false
            },
            buttonChild: new Link({
              className: 'profile__link',
              href: navButton.href as string,
              text: navButton.text,
              settings: {
                withInternalID: false
              }
            })
          })
      );
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

    this.children.changeAvatarModal = new Modal({
      className: '',
      type: 'image',
      header: (this.props.changeAvatarModal as ModalProps)?.header,
      controls: (this.props.changeAvatarModal as ModalProps)?.controls,
      buttons: (this.props.changeAvatarModal as ModalProps)?.buttons,
      visible: this.props.visibleChangeAvatarModal as boolean,
      submitHandler: submitChangeAvatarModalHandler as Listener,
      closeHandler: closeChangeAvatarModalHandler,
      settings: {
        withInternalID: false
      }
    });
  }

  componentDidUpdate(oldProps: ProfilePageProps, newProps: ProfilePageProps): boolean {
    if (oldProps.visibleChangeAvatarModal !== newProps.visibleChangeAvatarModal) {
      if (newProps.visibleChangeAvatarModal === false) {
        (this.children.changeAvatarModal as Modal).hide();
        document.body.classList.remove('modal-open');
      }
      if (newProps.visibleChangeAvatarModal === true) {
        (this.children.changeAvatarModal as Modal).show();
        document.body.classList.add('modal-open');
      }
    }

    return false;
  }

  render(): string {
    return template;
  }
}
