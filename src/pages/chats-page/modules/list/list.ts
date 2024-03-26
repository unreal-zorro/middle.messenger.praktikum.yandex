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
  hideChatMenu?: boolean;
}

export class List extends Block {
  constructor(props: ListProps) {
    super(props);

    const chatClickHandler: Listener<number> = (id, buttonLeft, buttonTop, buttonHeight) => {
      if (this.children.menu as Menu) {
        const { height } = (this.children.menu as Menu).getContent()!.getBoundingClientRect();
        const indent = 5;

        const menuLeft = buttonLeft + buttonHeight + indent;
        const menuTop = buttonTop - height - indent;

        (this.children.menu as Menu).show.bind(this.children.menu)();
        console.log(this.props.hideChatMenu);

        (this.children.menu as Menu).getContent()!.style.left = `${menuLeft}px`;
        (this.children.menu as Menu).getContent()!.style.top = `${menuTop}px`;
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

    this.children.menu = new Menu({
      className: 'list__chat-menu',
      items: (this.props.chatMenu as MenuProps).items,
      visible: true,
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

    if (oldProps.hideChatMenu !== newProps.hideChatMenu) {
      (this.children.menu as Menu).hide.bind(this.children.menu)();
    }

    return true;
  }

  // componentDidMount() {
    // (this.children.menu as Menu).setProps({
    //   visible: false
    // });
  // }

  render(): string {
    return template;
  }
}
