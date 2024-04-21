import './profile-page.scss';
import { Block } from '@/base';
import type { Props, Listener } from '@/base';
import { Avatar, Button, Header, Link } from '@/components';
import type { ButtonProps, LinkProps } from '@/components';
import { VALIDATION_RULES, baseURL } from '@/consts';
import { Modal } from '@/modules';
import type { ModalProps } from '@/modules';
import { UserController, AuthController, ProfilePageController } from '@/controllers';
import { connect } from '@/hoc';
import { PasswordModel, UserModel } from '@/models';
import { isEqual } from '@/utils';
import { ProfileForm } from './modules';
import type { ProfileFormProps } from './modules';
import template from './profile-page.hbs?raw';

interface ProfilePageProps extends Props {
  id?: string;
  avatar?: string | null;
  header?: string;
  controls?: ProfileFormProps[];
  buttons?: ButtonProps[];
  navButtons?: ButtonProps[];
  link?: LinkProps;
  navLink?: LinkProps;
  state?: Record<string, UserModel | boolean>;
  changeAvatarModal?: ModalProps;
  visibleChangeAvatarModal?: boolean;
}

export class ProfilePage extends Block {
  private userController: UserController;

  private authController: AuthController;

  private profilePageController: ProfilePageController;

  constructor(props: ProfilePageProps) {
    super(props);

    this.userController = new UserController();
    this.authController = new AuthController();
    this.profilePageController = new ProfilePageController();
  }

  public submitChangeAvatarModalHandler: (...args: Record<string, string | File>[]) => void = (
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

  public avatarClickHandler: Listener = () => {
    this.setProps({
      visibleChangeAvatarModal: true
    });
  };

  public linkClickHandler: Listener = () => {
    this.authController.logout();
  };

  public closeChangeAvatarModalHandler: Listener = () => {
    this.setProps({
      visibleChangeAvatarModal: false
    });
  };

  public submitHandler: (...args: Record<string, string>[]) => void = (formData) => {
    if (this.props.id === 'profile-password') {
      this.userController.updatePassword(formData as PasswordModel);

      return;
    }

    this.userController?.updateProfile(formData as UserModel).then((newUserData) => {
      (this.children.headerChild as Header).setProps({
        text: (newUserData as UserModel).display_name
      });

      (this.children.formChild as ProfileForm).setProps({
        state: (newUserData as UserModel).state
      });
    });
  };

  public initAvatar() {
    this.children.avatarChild = new Avatar({
      className: 'avatar_big profile__avatar',
      imgSrc: ((this.props?.state as Indexed<UserModel | boolean>)?.user as UserModel)?.avatar,
      settings: {
        withInternalID: false
      },
      events: {
        click: (() => this.avatarClickHandler.call(this)) as Listener
      }
    });
  }

  public initHeader() {
    this.children.headerChild = new Header({
      className: 'profile__header',
      text: ((this.props?.state as Indexed<UserModel | boolean>)?.user as UserModel)?.display_name,
      settings: {
        withInternalID: false
      }
    });
  }

  public initForm() {
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
      state: this.props?.state as Indexed<UserModel | boolean | Indexed<unknown>>,
      submitHandler: this.submitHandler,
      settings: {
        withInternalID: false
      },
      events: {
        submit: (() => this.submitHandler.call(this)) as Listener
      }
    });
  }

  public initNavButtons() {
    if (
      (!this.props.buttons || !(this.props.buttons as ButtonProps[])?.length) &&
      this.props.navButtons
    ) {
      this.children.navButtons = (this.props.navButtons as ButtonProps[])?.map(
        (_navButton, index) => {
          const type = (
            (
              (this.props?.state as Indexed<UserModel | boolean | Indexed<unknown>>)
                .profilePageData as Indexed<unknown>
            )?.navButtons as ButtonProps[]
          )?.[index]?.type;
          const href = (
            (
              (this.props?.state as Indexed<UserModel | boolean | Indexed<unknown>>)
                .profilePageData as Indexed<unknown>
            )?.navButtons as ButtonProps[]
          )?.[index]?.href as string;
          const text = (
            (
              (this.props?.state as Indexed<UserModel | boolean | Indexed<unknown>>)
                .profilePageData as Indexed<unknown>
            )?.navButtons as ButtonProps[]
          )?.[index]?.text;

          return new Button({
            className: 'profile__button',
            type,
            settings: {
              withInternalID: false
            },
            buttonChild: new Link({
              className: 'profile__link',
              href,
              text,
              settings: {
                withInternalID: false
              }
            })
          });
        }
      );
    }
  }

  public initLink() {
    this.children.linkChild = new Link({
      className: 'profile__footer',
      href: (this.props.link as LinkProps)?.href as string,
      text: (this.props.link as LinkProps)?.text as string,
      settings: {
        withInternalID: false
      },
      events: {
        click: (() => this.linkClickHandler.call(this)) as Listener
      }
    });
  }

  public initNavLink() {
    this.children.navLinkChild = new Link({
      className: 'profile__nav',
      href: (this.props.navLink as LinkProps)?.href as string,
      text: (this.props.navLink as LinkProps)?.text as string,
      settings: {
        withInternalID: false
      }
    });
  }

  public initAvatarModal() {
    this.children.changeAvatarModal = new Modal({
      className: '',
      type: 'image',
      header: (this.props.changeAvatarModal as ModalProps)?.header,
      controls: (this.props.changeAvatarModal as ModalProps)?.controls,
      buttons: (this.props.changeAvatarModal as ModalProps)?.buttons,
      visible: this.props.visibleChangeAvatarModal as boolean,
      state: (
        (this.props.state as Indexed<UserModel | boolean | Indexed<unknown>>)
          .profilePageData as Indexed<unknown>
      ).changeAvatarModal as ModalProps,
      submitHandler: this.submitChangeAvatarModalHandler as Listener,
      closeHandler: this.closeChangeAvatarModalHandler,
      settings: {
        withInternalID: false
      }
    });
  }

  public initChildren() {
    this.props.children = {
      avatarChild: this.children.avatarChild,
      headerChild: this.children.headerChild,
      formChild: this.children.formChild
    };
  }

  async componentDidMount() {
    try {
      await this.userController?.getUser();
      await this.profilePageController?.getProfilePageData(this.props.id);

      this.initAvatar();
      this.initHeader();
      this.initForm();
      this.initNavButtons();
      this.initLink();
      this.initNavLink();
      this.initAvatarModal();

      (this.children.changeAvatarModal as Block).setProps({
        state: (
          (this.props.state as Indexed<UserModel | boolean | Indexed<unknown>>)
            .profilePageData as Indexed<unknown>
        ).changeAvatarModal as ModalProps
      });
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

    if (
      (oldProps.state as Indexed<unknown>).isLoading !==
      (newProps.state as Indexed<unknown>).isLoading
    ) {
      if ((newProps.state as Indexed<unknown>).isLoading === false) {
        return true;
      }
    }

    if (!isEqual(oldProps.state as Indexed<unknown>, newProps.state as Indexed<unknown>)) {
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
    if ((this.props.state as Indexed<unknown>).isLoading) {
      return `
        <main>
          Загрузка...
        </main>`;
    }

    return template;
  }
}

function mapUserToProps(state: Indexed<UserModel | boolean>): {
  user: UserModel;
  isLoading: boolean;
  profilePageData: Indexed<unknown>;
} {
  return {
    user: state?.user as UserModel,
    isLoading: state?.isLoading as boolean,
    profilePageData: state?.profilePageData as Indexed<unknown>
  };
}

export const withUser = connect(
  mapUserToProps as (state: Indexed<unknown>) => {
    user: UserModel;
    isLoading: boolean;
    profilePageData: Indexed<unknown>;
  }
);
