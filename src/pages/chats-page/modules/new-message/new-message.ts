import './new-message.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Button, Input, Error, Svg } from '@/components';
import template from './new-message.hbs?raw';

interface NewMessageButton extends Record<string, string | undefined> {
  type?: string;
}

interface NewMessageControl extends Record<string, string | undefined> {
  name?: string;
  type?: string;
  placeholder?: string;
  error?: string;
}

interface NewMessageProps extends Props {
  control?: NewMessageControl;
  attachButton?: NewMessageButton;
  sendButton?: NewMessageButton;
}

export class NewMessage extends Block {
  constructor(props: NewMessageProps) {
    super(props);

    this.children.attachButtonChild = new Button({
      className: 'new-message__button',
      type: (this.props.attachButton as NewMessageButton)?.type,
      settings: {
        withInternalID: false
      },
      buttonChild: new Svg({
        className: 'new-message__icon',
        href: '#icon-attach'
      })
    });

    this.children.inputChild = new Input({
      className: 'new-message__input',
      type: (this.props.control as NewMessageControl)?.type,
      name: (this.props.control as NewMessageControl)?.name,
      placeholder: (this.props.control as NewMessageControl)?.placeholder,
      error: !!(this.props.control as NewMessageControl)?.error,
      settings: {
        withInternalID: false
      }
    });

    this.children.errorChild = new Error({
      className: 'new-message__error',
      error: !!(this.props.control as NewMessageControl)?.error,
      text: (this.props.control as NewMessageControl)?.error,
      settings: {
        withInternalID: false
      }
    });

    this.children.sendButtonChild = new Button({
      className: 'new-message__button',
      type: (this.props.sendButton as NewMessageButton)?.type,
      settings: {
        withInternalID: false
      },
      buttonChild: new Svg({
        className: 'new-message__icon',
        href: '#icon-send'
      })
    });
  }

  // componentDidUpdate(oldProps: LoginFormProps, newProps: LoginFormProps): boolean {
  //   if (oldProps.value !== newProps.value) {
  //     (this.children.inputChild as Block).setProps({ value: newProps.value });
  //   }

  //   if (oldProps.disabled !== newProps.disabled) {
  //     (this.children.inputChild as Block).setProps({ disabled: newProps.disabled });
  //   }

  //   if (oldProps.error !== newProps.error) {
  //     (this.children.inputChild as Block).setProps({ error: newProps.error });
  //     (this.children.inputChild as Block).setProps({ error: newProps.error });
  //   }

  //   if (oldProps.text !== newProps.text) {
  //     (this.children.inputChild as Block).setProps({ text: newProps.text });
  //   }

  //   return true;
  // }

  render(): string {
    return template;
  }
}
