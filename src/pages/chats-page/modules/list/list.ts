import './list.scss';
import { Block } from '@/base';
import type { Listener, Props } from '@/base';
import { Text } from '@/components';
import { Menu } from '@/modules';
import type { MenuProps } from '@/modules';
import { Chat } from './modules';
import type { ChatProps } from './modules';
import template from './list.hbs?raw';

export interface ListProps extends Props {
  className?: string;
  chats?: ChatProps[];
  classNameChatMenu?: string;
  chatMenu?: MenuProps;
  visibleChatMenu?: boolean;
}

export class List extends Block {
  constructor(props: ListProps) {
    super(props);

    const chatClickHandler: Listener<number> = (id, buttonLeft, buttonTop, buttonHeight) => {
      if (this.children.chatMenu as Menu) {
        const indent = 10;
        const { clientHeight } = document.documentElement;

        const menuLeft = buttonLeft + buttonHeight + indent;
        const menuBottom = clientHeight - buttonTop + indent;

        (this.children.chatMenu as Menu).getContent()!.style.left = `${menuLeft}px`;
        (this.children.chatMenu as Menu).getContent()!.style.bottom = `${menuBottom}px`;

        this.props.visibleChatMenu = true;
      }

      console.log(`list currentChat id = ${id}`);
    };

    if (this.props.chats && (this.props.chats as ChatProps[])?.length) {
      this.children.chats = (this.props.chats as ChatProps[])?.map(
        (chat) =>
          new Chat({
            className: 'list__item',
            id: chat.id,
            avatar: chat.avatar,
            title: chat.title,
            date: chat.date,
            text: chat.text,
            sender: chat.sender,
            count: chat.count,
            active: chat.active,
            clickHandler: chatClickHandler as Listener,
            settings: {
              withInternalID: true
            }
          })
      );
    }

    if (!this.props.chats || !(this.props.chats as ChatProps[])?.length) {
      this.children.text = new Text({
        className: 'list__text',
        text: 'Список чатов пуст',
        settings: {
          withInternalID: false
        }
      });
    }

    this.children.chatMenu = new Menu({
      dataMenu: 'chatMenu',
      className: 'list__chat-menu',
      items: (this.props.chatMenu as MenuProps).items,
      visible: this.props.visibleChatMenu as boolean,
      settings: {
        withInternalID: false
      }
    });
  }

  componentDidUpdate(oldProps: ListProps, newProps: ListProps): boolean {
    if (oldProps.visibleChatMenu !== newProps.visibleChatMenu) {
      if (newProps.visibleChatMenu === false) {
        (this.children.chatMenu as Menu).hide();
      }
      if (newProps.visibleChatMenu === true) {
        (this.children.chatMenu as Menu).show();
      }
    }

    return false;
  }

  render(): string {
    return template;
  }
}
