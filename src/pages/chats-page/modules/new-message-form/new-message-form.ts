import './new-message-form.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Button, Input, Error, Svg } from '@/components';
import { Listener } from '@/base/EventBus';
import { VALIDATION_RULES } from '@/consts';
import template from './new-message-form.hbs?raw';

export interface NewMessageFormButton extends Record<string, string | undefined> {
  type?: string;
}

export interface NewMessageFormControl extends Record<string, string | undefined> {
  name?: string;
  type?: string;
  placeholder?: string;
  error?: string;
}

interface NewMessageFormProps extends Props {
  className?: string;
  control?: NewMessageFormControl;
  attachButton?: NewMessageFormButton;
  sendButton?: NewMessageFormButton;
  submitNewMessageHandler?: (...args: Record<string, string>[]) => void;
}

export class NewMessageForm extends Block {
  constructor(props: NewMessageFormProps) {
    super(props);

    const focusHandler = () => {
      (this.children.errorChild as Block).setProps({
        error: false,
        text: ''
      });

      (this.children.sendButtonChild as Block).setProps({
        disabled: true
      });
    };

    const blurHandler: (name: string, value: string) => void = (name, value) => {
      const { regExp } = VALIDATION_RULES[name];
      const isValid = !regExp.test(value) ? VALIDATION_RULES[name].message : '';

      (this.children.inputChild as Block).setProps({
        error: !!isValid,
        value
      });

      (this.children.errorChild as Block).setProps({
        error: !!isValid,
        text: isValid
      });

      (this.children.sendButtonChild as Block).setProps({
        disabled: !!isValid
      });

      if (!isValid) {
        this._formData[name] = value;
      }
    };

    const submitHandler: (event: SubmitEvent) => void = (event) => {
      event.preventDefault();

      if (this.props.submitNewMessageHandler) {
        (this.props.submitNewMessageHandler as (...args: Record<string, string>[]) => string)(
          this._formData
        );
      }
    };

    this.children.attachButtonChild = new Button({
      className: 'new-message-form__button',
      type: (this.props.attachButton as NewMessageFormButton)?.type,
      settings: {
        withInternalID: false
      },
      buttonChild: new Svg({
        className: 'new-message-form__icon',
        href: '#icon-attach'
      })
    });

    this.children.inputChild = new Input({
      className: 'new-message-form__input',
      type: (this.props.control as NewMessageFormControl)?.type,
      name: (this.props.control as NewMessageFormControl)?.name,
      placeholder: (this.props.control as NewMessageFormControl)?.placeholder,
      error: !!(this.props.control as NewMessageFormControl)?.error,
      events: {
        focus: () => focusHandler.call(this),
        blur: ((event: Event) => {
          blurHandler.call(
            this,
            (event?.target as HTMLInputElement).name,
            (event?.target as HTMLInputElement).value
          );
        }) as Listener
      },
      settings: {
        withInternalID: false
      }
    });

    this.children.errorChild = new Error({
      className: 'new-message-form__error',
      error: !!(this.props.control as NewMessageFormControl)?.error,
      text: (this.props.control as NewMessageFormControl)?.error,
      settings: {
        withInternalID: false
      }
    });

    this.children.sendButtonChild = new Button({
      className: 'new-message-form__button',
      type: (this.props.sendButton as NewMessageFormButton)?.type,
      disabled: true,
      settings: {
        withInternalID: false
      },
      events: {
        click: ((event: SubmitEvent) => submitHandler.call(this, event)) as Listener
      },
      buttonChild: new Svg({
        className: 'new-message-form__icon',
        href: '#icon-send'
      })
    });
  }

  _formData: Record<string, string> = {};

  render(): string {
    return template;
  }
}
