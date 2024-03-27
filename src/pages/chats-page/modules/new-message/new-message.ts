import './new-message.scss';
import { Block } from '@/base/';
import type { Props, Listener } from '@/base';
import { VALIDATION_RULES } from '@/consts';
import { Menu } from '@/modules';
import type { MenuProps } from '@/modules';
import { NewMessageForm } from './modules';
import type { NewMessageFormProps } from './modules';
import template from './new-message.hbs?raw';

export interface NewMessageProps extends Props {
  className?: string;
  newMessageForm?: NewMessageFormProps;
  classNameAttachMenu?: string;
  attachMenu?: MenuProps;
  visibleAttachMenu?: boolean;
}

export class NewMessage extends Block {
  constructor(props: NewMessageProps) {
    super(props);

    const chatClickHandler: Listener<number> = (buttonLeft, buttonTop, buttonHeight) => {
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

    this.children.newMessageForm = new NewMessageForm({
      input: (this.props.newMessageForm as NewMessageFormProps).input,
      error: (this.props.newMessageForm as NewMessageFormProps).error,
      attachButton: (this.props.newMessageForm as NewMessageFormProps).attachButton,
      sendButton: (this.props.newMessageForm as NewMessageFormProps).sendButton,
      clickHandler: chatClickHandler as Listener,
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

    return false;
  }

  render(): string {
    return template;
  }
}
