import './profile-page.scss';
import { Block } from '@/base';
import type { Props, Listener } from '@/base';
import { Avatar, Button, Header, Link } from '@/components';
import type { ButtonProps, LinkProps } from '@/components';
import { VALIDATION_RULES, baseURL } from '@/consts';
import { Modal } from '@/modules';
import type { ModalProps } from '@/modules';
import { UserController, AuthController } from '@/controllers';
import { connect } from '@/hoc';
import { PasswordModel, UserModel } from '@/models';
import { isEqual } from '@/utils';
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
  state?: UserModel;
  isLoading?: boolean;
  changeAvatarModal?: ModalProps;
  visibleChangeAvatarModal?: boolean;
}

export class ProfilePage extends Block {
  private userController: UserController;

  private authController: AuthController;

  constructor(props: ProfilePageProps) {
    super(props);

    this.userController = new UserController();
    this.authController = new AuthController();

    const submitHandler: (...args: Record<string, string>[]) => void = (formData) => {
      if (this.props.id === 'profile-password') {
        this.userController.updatePassword(formData as PasswordModel);

        return;
      }

      this.userController?.updateProfile(formData as UserModel).then((newUserData) => {
        this.setProps({
          state: newUserData
        });

        (this.children.headerChild as Header).setProps({
          text: (newUserData as UserModel).display_name
        });

        (this.children.formChild as ProfileForm).setProps({
          state: (newUserData as UserModel).state
        });
      });
    };

    const submitChangeAvatarModalHandler: (...args: Record<string, string | File>[]) => void = (
      formData
    ) => {
      let isValid = true;

      Object.entries(formData).forEach(([key, value]) => {
        const { regExp } = VALIDATION_RULES[key];
        isValid = isValid && regExp.test((value as File).name);
      });

      if (isValid) {
        this.setProps({
          visibleChangeAvatarModal: false
        });

        this.userController.updateAvatar(formData.avatar as File).then((newUserData) => {
          this.setProps({
            state: newUserData
          });

          (this.children.avatarChild as Avatar).setProps({
            imgSrc: `${baseURL}/resources${(newUserData as UserModel).avatar}`
          });
        });
      } else {
        console.log('Invalid avatar form data');
      }
    };

    const avatarClickHandler: Listener = () => {
      this.setProps({
        visibleChangeAvatarModal: true
      });
    };

    const linkClickHandler: Listener = () => {
      this.authController.logout();
    };

    const closeChangeAvatarModalHandler: Listener = () => {
      this.setProps({
        visibleChangeAvatarModal: false
      });
    };

    this.setProps({
      isLoading: true
    });

    this.userController
      ?.getUser()
      .then(() => this.setProps({ isLoading: false }))
      .then(() => {
        if ((this.props?.state as UserModel).avatar) {
          this.children.avatarChild = new Avatar({
            className: 'avatar_big profile__avatar',
            imgSrc: (this.props?.state as UserModel).avatar,
            settings: {
              withInternalID: false
            },
            events: {
              click: (() => avatarClickHandler.call(this)) as Listener
            }
          });
        }

        this.children.headerChild = new Header({
          className: 'profile__header',
          text: (this.props?.state as UserModel).display_name,
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
          state: this.props.state as UserModel,
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
          },
          events: {
            click: (() => linkClickHandler.call(this)) as Listener
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
      });
  }

  async componentDidMount() {
    try {
      await this.userController?.getUser().then((newUserData) => {
        this.setProps({
          state: newUserData
        });
      });
      this.setProps({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
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

    if (oldProps.isLoading !== newProps.isLoading) {
      if (newProps.isLoading === false) {
        return true;
      }
    }

    if (!isEqual(oldProps.state as UserModel, newProps.state as UserModel)) {
      return true;
    }

    if (oldProps.avatar !== newProps.avatar) {
      (this.children.avatarChild as Avatar).setProps({
        imgSrc: newProps.avatar as string
      });
    }

    return false;
  }

  render(): string {
    const emptyUser = {
      id: undefined,
      first_name: undefined,
      second_name: undefined,
      display_name: undefined,
      login: undefined,
      email: undefined,
      phone: undefined,
      avatar: undefined
    };

    if (this.props.isLoading || isEqual(this.props.state as UserModel, emptyUser)) {
      return `
      <main id={{ id }} class="profile">
        <div class="profile__wrapper">
          Загрузка...
        </div>
      </main>`;
    }

    return template;
  }
}

function mapUserToProps(state: Indexed<UserModel>): UserModel {
  return {
    id: state?.user?.id,
    first_name: state?.user?.first_name,
    second_name: state?.user?.second_name,
    display_name: state?.user?.display_name,
    phone: state?.user?.phone,
    login: state?.user?.login,
    email: state?.user?.email,
    avatar: state?.user?.avatar
  };
}

export const withUser = connect(mapUserToProps as (state: Indexed<unknown>) => UserModel);
