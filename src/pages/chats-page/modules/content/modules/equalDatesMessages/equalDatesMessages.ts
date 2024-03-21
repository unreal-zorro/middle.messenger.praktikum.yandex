import './equalDatesMessages.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Text } from '@/components';
import template from './equalDatesMessages.hbs?raw';
import { Message } from '../message';

export interface OneMessage extends Record<string, string | boolean | undefined> {
  id?: string;
  name?: string;
  date?: string;
  time?: string;
  check?: boolean;
}

export interface MessageContent extends Record<string, string | boolean | undefined> {
  messageId?: string;
  isText?: boolean;
  isImage?: boolean;
  data?: string;
}

interface EqualDatesMessagesProps extends Props {
  date?: string;
  messages?: OneMessage[];
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

      this.children.messages = (this.props.messages as OneMessage[])
        ?.map((message) => {
          const messageContent: MessageContent[] = (this.props.messageContent as MessageContent[])
            ?.filter((content) => message.id === content.messageId);

          return new Message({
            className: 'content__message',
            id: message.id,
            name: message.name,
            time: message.time,
            check: message.check,
            content: messageContent as MessageContent[],
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
