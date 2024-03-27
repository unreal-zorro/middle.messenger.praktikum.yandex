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
  classNameContentMenu?: string;
  contentMenu?: MenuProps;
  visibleContentMenu?: boolean;
}

export class Content extends Block {
  constructor(props: ContentProps) {
    super(props);

    const clickHandler: Listener<Event> = (event: Event) => {
      const currentChatId = (this.props.currentChat as CurrentChat).id;
      const {
        left: currentChatButtonLeft,
        top: currentChatButtonTop,
        width: currentChatButtonWidth
      } = (event.currentTarget as HTMLButtonElement).getBoundingClientRect();
      const indent = 10;
      const { clientWidth } = document.documentElement;

      if (this.children.contentMenu as Menu) {
        const contentMenuRight = clientWidth - currentChatButtonLeft + indent;
        const contentMenuTop = currentChatButtonTop + currentChatButtonWidth + indent;

        (this.children.contentMenu as Menu).getContent()!.style.right = `${contentMenuRight}px`;
        (this.children.contentMenu as Menu).getContent()!.style.top = `${contentMenuTop}px`;

        this.props.visibleContentMenu = true;
      }

      console.log(`content currentChat id = ${currentChatId}`);
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
      dataButton: 'contentButton',
      className: 'content__button',
      type: 'button',
      settings: {
        withInternalID: false
      },
      events: {
        click: ((event: Event) => clickHandler.call(this, event)) as Listener
      },
      buttonChild: new Svg({
        dataSvg: 'contentSvg',
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

    this.children.contentMenu = new Menu({
      dataMenu: 'contentMenu',
      className: 'content__content-menu',
      items: (this.props.contentMenu as MenuProps).items,
      visible: this.props.visibleContentMenu as boolean,
      settings: {
        withInternalID: false
      }
    });
  }

  componentDidUpdate(oldProps: ContentProps, newProps: ContentProps): boolean {
    if (oldProps.visibleContentMenu !== newProps.visibleContentMenu) {
      if (newProps.visibleContentMenu === false) {
        (this.children.contentMenu as Menu).hide();
      }
      if (newProps.visibleContentMenu === true) {
        (this.children.contentMenu as Menu).show();
      }
    }

    return false;
  }

  render(): string {
    return template;
  }
}
