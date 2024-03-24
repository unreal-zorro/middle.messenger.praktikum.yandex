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
}

export class List extends Block {
  constructor(props: ListProps) {
    super(props);

    const chatClickHandler: Listener<number> = () => {
      console.log('click');
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

    this.children.menu = new Menu({
      className: 'list__chat-menu',
      items: (this.props.chatMenu as MenuProps).items,
      visible: false,
      top: '10px',
      left: '10px',
      settings: {
        withInternalID: false
      }
    });
  }

  componentDidUpdate(oldProps: ListProps, newProps: ListProps): boolean {
    if (oldProps.chats !== newProps.chats) {
      (this.children.chats as Chat).setProps({ chats: newProps.chats });
    }

    if (oldProps.chatMenu !== newProps.chatMenu) {
      (this.children.menu as Menu).setProps({ chatMenu: newProps.chatMenu });
    }

    return true;
  }

  render(): string {
    return template;
  }
}
