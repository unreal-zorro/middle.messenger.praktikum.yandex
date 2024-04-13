import './new-message.scss';
import { Block } from '@/base/';
import type { Props, Listener } from '@/base';
import { VALIDATION_RULES, ATTACH_MENU_ITEMS } from '@/consts';
import { Menu, Modal } from '@/modules';
import type { MenuProps, ModalProps } from '@/modules';
import { NewMessageForm } from './modules';
import type { NewMessageFormProps } from './modules';
import template from './new-message.hbs?raw';

export interface NewMessageProps extends Props {
  className?: string;
  newMessageForm?: NewMessageFormProps;
  classNameAttachMenu?: string;
  attachMenu?: MenuProps;
  visibleAttachMenu?: boolean;
  attachPhotoModal: ModalProps;
  visibleAttachPhotoModal?: boolean;
  typeAttachPhotoModal?: string;
  attachFileModal: ModalProps;
  visibleAttachFileModal?: boolean;
  typeAttachFileModal?: string;
  attachLocationModal: ModalProps;
  visibleAttachLocationModal?: boolean;
  typeAttachLocationModal?: string;
  state?: Indexed<Indexed<unknown>>;
}

export class NewMessage extends Block {
  constructor(props: NewMessageProps) {
    super(props);
  }

  public attachButtonClickHandler: Listener<number> = (buttonLeft, buttonTop, buttonHeight) => {
    if (this.children.attachMenu as Menu) {
      const indent = 10;
      const { clientHeight } = document.documentElement;

      const attachMenuLeft = buttonLeft + buttonHeight + indent;
      const attachMenuBottom = clientHeight - buttonTop + indent;

      (this.children.attachMenu as Menu).getContent()!.style.left = `${attachMenuLeft}px`;
      (this.children.attachMenu as Menu).getContent()!.style.bottom = `${attachMenuBottom}px`;

      this.props.visibleAttachMenu = true;
    }
  };

  public attachMenuItemClickHandler: Listener<string> = (text) => {
    const itemText = text.trim();

    if (itemText === ATTACH_MENU_ITEMS.photo) {
      this.setProps({
        visibleAttachPhotoModal: true
      });
    }

    if (itemText === ATTACH_MENU_ITEMS.file) {
      this.setProps({
        visibleAttachFileModal: true
      });
    }

    if (itemText === ATTACH_MENU_ITEMS.location) {
      this.setProps({
        visibleAttachLocationModal: true
      });
    }
  };

  public submitNewMessageHandler: Listener<Record<string, string>> = (formData) => {
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

  public submitAttachModalHandler: (...args: Record<string, string>[]) => void = (formData) => {
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      const { regExp } = VALIDATION_RULES[key];
      isValid = isValid && regExp.test(value);
    });

    if (isValid) {
      this.setProps({
        visibleAttachPhotoModal: false,
        visibleAttachFileModal: false,
        visibleAttachLocationModal: false
      });

      console.log(formData);
    } else {
      console.log('Invalid form data');
    }
  };

  public closeAttachPhotoModalHandler: Listener = () => {
    this.setProps({
      visibleAttachPhotoModal: false
    });
  };

  public closeAttachFileModalHandler: Listener = () => {
    this.setProps({
      visibleAttachFileModal: false
    });
  };

  public closeAttachLocationModalHandler: Listener = () => {
    this.setProps({
      visibleAttachLocationModal: false
    });
  };

  public initNewMessageForm() {
    this.children.newMessageForm = new NewMessageForm({
      input: (this.props.newMessageForm as NewMessageFormProps).input,
      error: (this.props.newMessageForm as NewMessageFormProps).error,
      attachButton: (this.props.newMessageForm as NewMessageFormProps).attachButton,
      sendButton: (this.props.newMessageForm as NewMessageFormProps).sendButton,
      attachButtonClickHandler: this.attachButtonClickHandler as Listener,
      submitNewMessageHandler: this.submitNewMessageHandler as Listener,
      settings: {
        withInternalID: false
      }
    });
  }

  public initAttachMenu() {
    this.children.attachMenu = new Menu({
      dataMenu: 'attachMenu',
      className: 'new-message__attach-menu',
      items: (this.props.attachMenu as MenuProps).items,
      visible: this.props.visibleAttachMenu as boolean,
      state: (
        ((this.props.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
          .newMessage as Indexed<unknown>
      ).attachMenu as MenuProps,
      menuItemClickHandler: this.attachMenuItemClickHandler as Listener,
      settings: {
        withInternalID: false
      }
    });
  }

  public initAttachPhotoModal() {
    this.children.attachPhotoModal = new Modal({
      className: '',
      type: 'image',
      header: (this.props.attachPhotoModal as ModalProps)?.header,
      controls: (this.props.attachPhotoModal as ModalProps)?.controls,
      buttons: (this.props.attachPhotoModal as ModalProps)?.buttons,
      visible: this.props.visibleAttachPhotoModal as boolean,
      state: (
        ((this.props.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
          .newMessage as Indexed<unknown>
      ).attachPhotoModal as ModalProps,
      submitHandler: this.submitAttachModalHandler as Listener,
      closeHandler: this.closeAttachPhotoModalHandler,
      settings: {
        withInternalID: false
      }
    });
  }

  public initAttachFileModal() {
    this.children.attachFileModal = new Modal({
      className: '',
      type: '',
      header: (this.props.attachFileModal as ModalProps)?.header,
      controls: (this.props.attachFileModal as ModalProps)?.controls,
      buttons: (this.props.attachFileModal as ModalProps)?.buttons,
      visible: this.props.visibleAttachFileModal as boolean,
      state: (
        ((this.props.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
          .newMessage as Indexed<unknown>
      ).attachFileModal as ModalProps,
      submitHandler: this.submitAttachModalHandler as Listener,
      closeHandler: this.closeAttachFileModalHandler,
      settings: {
        withInternalID: false
      }
    });
  }

  public initAttachLocationModal() {
    this.children.attachLocationModal = new Modal({
      className: '',
      type: '',
      header: (this.props.attachLocationModal as ModalProps)?.header,
      controls: (this.props.attachLocationModal as ModalProps)?.controls,
      buttons: (this.props.attachLocationModal as ModalProps)?.buttons,
      visible: this.props.visibleAttachLocationModal as boolean,
      state: (
        ((this.props.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
          .newMessage as Indexed<unknown>
      ).attachLocationModal as ModalProps,
      submitHandler: this.submitAttachModalHandler as Listener,
      closeHandler: this.closeAttachLocationModalHandler,
      settings: {
        withInternalID: false
      }
    });
  }

  async componentDidMount() {
    try {
      this.initNewMessageForm();
      this.initAttachMenu();
      this.initAttachPhotoModal();
      this.initAttachFileModal();
      this.initAttachLocationModal();

      (this.children.attachPhotoModal as Block).setProps({
        state: (
          ((this.props.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
            .newMessage as Indexed<unknown>
        ).attachPhotoModal as ModalProps
      });

      (this.children.attachFileModal as Block).setProps({
        state: (
          ((this.props.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
            .newMessage as Indexed<unknown>
        ).attachFileModal as ModalProps
      });

      (this.children.attachLocationModal as Block).setProps({
        state: (
          ((this.props.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
            .newMessage as Indexed<unknown>
        ).attachLocationModal as ModalProps
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(oldProps: NewMessageProps, newProps: NewMessageProps): boolean {
    if (oldProps.visibleAttachMenu !== newProps.visibleAttachMenu) {
      if (newProps.visibleAttachMenu === false) {
        (this.children.attachMenu as Menu).hide();
      }
      if (newProps.visibleAttachMenu === true) {
        (this.children.attachMenu as Menu).show();
      }
    }

    if (oldProps.visibleAttachPhotoModal !== newProps.visibleAttachPhotoModal) {
      if (newProps.visibleAttachPhotoModal === false) {
        (this.children.attachPhotoModal as Modal).hide();
        document.body.classList.remove('modal-open');
      }
      if (newProps.visibleAttachPhotoModal === true) {
        (this.children.attachPhotoModal as Modal).show();
        document.body.classList.add('modal-open');
      }
    }

    if (oldProps.visibleAttachFileModal !== newProps.visibleAttachFileModal) {
      if (newProps.visibleAttachFileModal === false) {
        (this.children.attachFileModal as Modal).hide();
        document.body.classList.remove('modal-open');
      }
      if (newProps.visibleAttachFileModal === true) {
        (this.children.attachFileModal as Modal).show();
        document.body.classList.add('modal-open');
      }
    }

    if (oldProps.visibleAttachLocationModal !== newProps.visibleAttachLocationModal) {
      if (newProps.visibleAttachLocationModal === false) {
        (this.children.attachLocationModal as Modal).hide();
        document.body.classList.remove('modal-open');
      }
      if (newProps.visibleAttachLocationModal === true) {
        (this.children.attachLocationModal as Modal).show();
        document.body.classList.add('modal-open');
      }
    }

    return false;
  }

  render(): string {
    return template;
  }
}
