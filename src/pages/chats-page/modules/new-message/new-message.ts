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
}

export class NewMessage extends Block {
  constructor(props: NewMessageProps) {
    super(props);

    const attachButtonClickHandler: Listener<number> = (buttonLeft, buttonTop, buttonHeight) => {
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

    const attachMenuItemClickHandler: Listener<string> = (text) => {
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

    const submitNewMessageHandler: Listener<Record<string, string>> = (formData) => {
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

    const submitAttachModalHandler: (...args: Record<string, string>[]) => void = (formData) => {
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

    const closeAttachPhotoModalHandler: Listener = () => {
      this.setProps({
        visibleAttachPhotoModal: false
      });
    };

    const closeAttachFileModalHandler: Listener = () => {
      this.setProps({
        visibleAttachFileModal: false
      });
    };

    const closeAttachLocationModalHandler: Listener = () => {
      this.setProps({
        visibleAttachLocationModal: false
      });
    };

    this.children.newMessageForm = new NewMessageForm({
      input: (this.props.newMessageForm as NewMessageFormProps).input,
      error: (this.props.newMessageForm as NewMessageFormProps).error,
      attachButton: (this.props.newMessageForm as NewMessageFormProps).attachButton,
      sendButton: (this.props.newMessageForm as NewMessageFormProps).sendButton,
      attachButtonClickHandler: attachButtonClickHandler as Listener,
      submitNewMessageHandler: submitNewMessageHandler as Listener,
      settings: {
        withInternalID: false
      }
    });

    this.children.attachMenu = new Menu({
      dataMenu: 'attachMenu',
      className: 'new-message__attach-menu',
      items: (this.props.attachMenu as MenuProps).items,
      visible: this.props.visibleAttachMenu as boolean,
      menuItemClickHandler: attachMenuItemClickHandler as Listener,
      settings: {
        withInternalID: false
      }
    });

    this.children.attachPhotoModal = new Modal({
      className: '',
      type: 'image',
      header: (this.props.attachPhotoModal as ModalProps)?.header,
      controls: (this.props.attachPhotoModal as ModalProps)?.controls,
      buttons: (this.props.attachPhotoModal as ModalProps)?.buttons,
      visible: this.props.attachPhotoModal as boolean,
      submitHandler: submitAttachModalHandler as Listener,
      closeHandler: closeAttachPhotoModalHandler,
      settings: {
        withInternalID: false
      }
    });

    this.children.attachFileModal = new Modal({
      className: '',
      type: '',
      header: (this.props.attachFileModal as ModalProps)?.header,
      controls: (this.props.attachFileModal as ModalProps)?.controls,
      buttons: (this.props.attachFileModal as ModalProps)?.buttons,
      visible: this.props.attachFileModal as boolean,
      submitHandler: submitAttachModalHandler as Listener,
      closeHandler: closeAttachFileModalHandler,
      settings: {
        withInternalID: false
      }
    });

    this.children.attachLocationModal = new Modal({
      className: '',
      type: '',
      header: (this.props.attachLocationModal as ModalProps)?.header,
      controls: (this.props.attachLocationModal as ModalProps)?.controls,
      buttons: (this.props.attachLocationModal as ModalProps)?.buttons,
      visible: this.props.attachLocationModal as boolean,
      submitHandler: submitAttachModalHandler as Listener,
      closeHandler: closeAttachLocationModalHandler,
      settings: {
        withInternalID: false
      }
    });
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
