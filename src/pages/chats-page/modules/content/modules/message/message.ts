import './message.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Text, Image } from '@/components';
import template from './message.hbs?raw';

interface MessageContentItem extends Record<string, string | boolean | undefined> {
  messageId?: string;
  isText?: boolean;
  isImage?: boolean;
  data?: string;
}

interface MessageProps extends Props {
  id?: string;
  name?: string;
  time?: string;
  check?: boolean;
  content?: MessageContentItem[];
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super(props);

    this.children.content = (this.props.content as MessageContentItem[])?.map(
      (item) => {
        if (item.isImage) {
          return new Image({
            className: 'message__image',
            src: item.data,
            alt: 'image',
            settings: {
              withInternalID: true
            }
          });
        }

        if (item.isText) {
          return new Text({
            className: 'message__text',
            text: item.data,
            settings: {
              withInternalID: true
            }
          });
        }

        return new Text({
          className: '',
          text: '',
          settings: {
            withInternalID: true
          }
        });
      });
  }

  render(): string {
    return template;
  }
}
