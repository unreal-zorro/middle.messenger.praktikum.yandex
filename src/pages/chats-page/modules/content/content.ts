import './content.scss';
import { Block } from '@/base';
import type { Listener, Props } from '@/base';
import type { CurrentChat } from '@/entities';
import { Avatar, Button, Svg, Text } from '@/components';
import { Menu } from '@/modules';
import type { MenuProps } from '@/modules';
import { EqualDatesMessages } from './modules';
import type { MessageContent, MessageProps } from './modules';
import template from './content.hbs?raw';

export interface ContentProps extends Props {
  className?: string;
  dates?: string[];
  messages?: MessageProps[];
  messageContent?: MessageContent[];
  currentChat?: CurrentChat;
  classNameAttachMenu?: string;
  attachMenu?: MenuProps;
  classNameUserMenu?: string;
  userMenu?: MenuProps;
}

export class Content extends Block {
  constructor(props: ContentProps) {
    super(props);

    const clickHandler: Listener = () => {
      const currentChat = (this.props.currentChat as CurrentChat);

      console.log(`currentChat id = ${currentChat.id}`);
    };

    this.children.avatar = new Avatar({
      className: 'content__avatar avatar_no-edit',
      imgSrc: (this.props.currentChat as CurrentChat)?.avatar as string,
      settings: {
        withInternalID: false
      }
    });

    this.children.title = new Text({
      className: 'content__title',
      text: (this.props.currentChat as CurrentChat)?.title as string,
      settings: {
        withInternalID: false
      }
    });

    this.children.button = new Button({
      className: 'content__button',
      type: 'button',
      settings: {
        withInternalID: false
      },
      events: {
        click: ((event: Event) => {
          clickHandler.call(this, event?.target as HTMLButtonElement);
        }) as Listener
      },
      buttonChild: new Svg({
        className: 'content__icon',
        href: '#icon-triple'
      })
    });

    if (this.props.dates && (this.props.dates as string[])?.length) {
      this.children.dates = (this.props.dates as string[])?.map((dateItem) => {
        const messages: MessageProps[] = (this.props.messages as MessageProps[])?.filter(
          (messageItem) => dateItem === messageItem.date
        );
        const messageContent: MessageContent[] = [];
        messages?.forEach((messageItem) => {
          const content = (this.props.messageContent as MessageContent[])?.filter(
            (messageContentItem) => messageItem.id === messageContentItem.messageId
          );
          messageContent.push(...content);
        });

        return new EqualDatesMessages({
          className: 'content__list-item',
          date: dateItem,
          messages,
          messageContent,
          settings: {
            withInternalID: true
          }
        });
      });
    }

    if (!this.props.dates || !(this.props.dates as string[])?.length) {
      this.children.noMessagesText = new Text({
        className: 'content__text',
        text: 'В выбранном чате отсутствуют сообщения',
        settings: {
          withInternalID: false
        }
      });
    }

    if (!this.props.currentChat) {
      this.children.noChatText = new Text({
        className: 'content__text',
        text: 'Выберите чат, чтобы отправить сообщение',
        settings: {
          withInternalID: false
        }
      });
    }

    this.children.attachMenu = new Menu({
      className: 'content__attach-menu',
      items: (this.props.attachMenuItems as MenuProps).items,
      settings: {
        withInternalID: false
      }
    });

    this.children.userMenu = new Menu({
      className: 'content__user-menu',
      items: (this.props.userMenuItems as MenuProps).items,
      settings: {
        withInternalID: false
      }
    });
  }

  render(): string {
    return template;
  }
}
