import './equalDatesMessages.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Text } from '@/components';
import { Message } from './modules';
import type { MessageProps, MessageContent } from './modules';
import template from './equalDatesMessages.hbs?raw';

export interface EqualDatesMessagesProps extends Props {
  className?: string;
  date?: string;
  messages?: MessageProps[];
  messageContent?: MessageContent[];
}

export class EqualDatesMessages extends Block {
  constructor(props: EqualDatesMessagesProps) {
    super(props);

    if (this.props.date) {
      this.children.date = new Text({
        className: 'content__date',
        text: this.props.date as string,
        settings: {
          withInternalID: false
        }
      });

      this.children.messages = (this.props.messages as MessageProps[])?.map((message) => {
        const messageContent: MessageContent[] = (
          this.props.messageContent as MessageContent[]
        )?.filter((content) => message.id === content.messageId);

        return new Message({
          className: 'content__message',
          id: message.id,
          name: message.name,
          time: message.time,
          check: message.check,
          content: messageContent,
          settings: {
            withInternalID: true
          }
        });
      });
    }
  }

  render(): string {
    return template;
  }
}
