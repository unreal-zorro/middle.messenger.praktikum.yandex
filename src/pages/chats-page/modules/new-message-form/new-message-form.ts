import './new-message-form.scss';
import { Block } from '@/base/';
import type { Props, Listener } from '@/base';
import { Button, Input, Error, Svg } from '@/components';
import type { ButtonProps, InputProps, ErrorProps } from '@/components';
import { VALIDATION_RULES } from '@/consts';
import template from './new-message-form.hbs?raw';

export interface NewMessageFormProps extends Props {
  className?: string;
  input?: InputProps;
  error?: ErrorProps;
  attachButton?: ButtonProps;
  sendButton?: ButtonProps;
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

      const element = (this.children.inputChild as Input).getContent() as HTMLInputElement;
      const elementName = element?.getAttribute('name') as string;
      const elementValue = element?.value;
      this._formData[elementName] = elementValue;

      if (this.props.submitNewMessageHandler) {
        (this.props.submitNewMessageHandler as (...args: Record<string, string>[]) => string)(
          this._formData
        );
      }
    };

    this.children.attachButtonChild = new Button({
      className: 'new-message-form__button',
      type: (this.props.attachButton as ButtonProps)?.type,
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
      type: (this.props.input as InputProps)?.type,
      name: (this.props.input as InputProps)?.name,
      placeholder: (this.props.input as InputProps)?.placeholder,
      error: !!(this.props.input as InputProps)?.error,
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
      error: (this.props.error as ErrorProps)?.error,
      text: (this.props.error as ErrorProps)?.text,
      settings: {
        withInternalID: false
      }
    });

    this.children.sendButtonChild = new Button({
      className: 'new-message-form__button',
      type: (this.props.sendButton as ButtonProps)?.type,
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
