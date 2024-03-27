import './new-message.scss';
import { Block } from '@/base/';
import type { Props, Listener } from '@/base';
import { VALIDATION_RULES } from '@/consts';
import { NewMessageForm } from './modules';
import type { NewMessageFormProps } from './modules';
import template from './new-message.hbs?raw';

export interface NewMessageProps extends Props {
  className?: string;
  newMessageForm?: NewMessageFormProps;
}

export class NewMessage extends Block {
  constructor(props: NewMessageProps) {
    super(props);

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
      submitNewMessageHandler: submitNewMessageHandler as Listener,
      settings: {
        withInternalID: false
      }
    });
  }

  render(): string {
    return template;
  }
}
