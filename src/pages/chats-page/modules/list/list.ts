import './list.scss';
import { Block } from '@/base';
import type { Listener, Props } from '@/base';
import { Text } from '@/components';
import { Menu } from '@/modules';
import type { MenuProps } from '@/modules';
import { ChatModel } from '@/models';
import { isEqual } from '@/utils';
import { Chat } from './modules';
import template from './list.hbs?raw';

export interface ListProps extends Props {
  className?: string;
  chats?: ChatModel[];
  chatsChildren?: unknown[];
  classNameChatMenu?: string;
  chatMenu?: MenuProps;
  visibleChatMenu?: boolean;
  visibleChatAvatarModal?: boolean;
  state?: ChatModel[];
  deleteChatHandler: (...args: Record<string, string>[]) => Promise<void>;
}

export class List extends Block {
  constructor(props: ListProps) {
    super(props);

    const chatButtonClickHandler: Listener<number> = (id, buttonLeft, buttonTop, buttonHeight) => {
      if (this.children.chatMenu as Menu) {
        const indent = 10;
        const { clientHeight } = document.documentElement;

        const chatMenuLeft = buttonLeft + buttonHeight + indent;
        const chatMenuBottom = clientHeight - buttonTop + indent;

        (this.children.chatMenu as Menu).getContent()!.style.left = `${chatMenuLeft}px`;
        (this.children.chatMenu as Menu).getContent()!.style.bottom = `${chatMenuBottom}px`;

        this.props.visibleChatMenu = true;
      }

      this._currentChat = id;
    };

    const chatClickHandler: Listener<number> = (id) => {
      (this.children.chats as Chat[])?.forEach((chat) => {
        chat.setProps({
          active: chat.getId() === String(id)
        });
      });

      console.log(`list activeChat id = ${id}`);
    };

    const chatMenuItemClickHandler: Listener<string> = (text) => {
      const id = this._currentChat;

      if (this.props.deleteChatHandler) {
        (this.props.deleteChatHandler as (...args: Record<string, string>[]) => Promise<void>)({
          chatId: String(id)
        });
      }

      console.log(`list currentChat id = ${id}, text = ${text.trim()}`);
    };

    this.children.chatMenu = new Menu({
      dataMenu: 'chatMenu',
      className: 'list__chat-menu',
      items: (this.props.chatMenu as MenuProps).items,
      visible: this.props.visibleChatMenu as boolean,
      menuItemClickHandler: chatMenuItemClickHandler as Listener,
      settings: {
        withInternalID: false
      }
    });

    if ((this.props.state as ChatModel[])?.length) {
      this.children.chats = (this.props.state as ChatModel[])?.map(
        (chat) =>
          new Chat({
            className: 'list__item',
            id: String(chat.id),
            avatar: chat.avatar,
            title: chat.title,
            lastMessageTime: chat.last_message?.time,
            lastMessageContent: chat.last_message?.content,
            createdBy: !!chat.created_by,
            unreadCount: chat.unread_count,
            active: chat.active === chat.id,
            chatButtonClickHandler: chatButtonClickHandler as Listener,
            chatClickHandler: chatClickHandler as Listener,
            settings: {
              withInternalID: true
            }
          })
      );
    }

    if ((this.props.state as ChatModel[])?.length) {
      this.children.chatsChildren = (this.props.state as ChatModel[])?.map(
        (chat) =>
          new Chat({
            className: 'list__item',
            id: String(chat.id),
            avatar: chat.avatar,
            title: chat.title,
            lastMessageTime: chat.last_message?.time,
            lastMessageContent: chat.last_message?.content,
            createdBy: !!chat.created_by,
            unreadCount: chat.unread_count,
            active: chat.active === chat.id,
            chatButtonClickHandler: chatButtonClickHandler as Listener,
            chatClickHandler: chatClickHandler as Listener,
            settings: {
              withInternalID: true
            }
          })
      );
    }

    if (!(this.props.state as ChatModel[]) || !(this.props.state as ChatModel[])?.length) {
      this.children.text = new Text({
        className: 'list__text',
        text: 'Список чатов пуст',
        settings: {
          withInternalID: false
        }
      });
    }
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

    if (
      !isEqual(oldProps.state as [], newProps.state as []) ||
      (oldProps.state as ChatModel[])?.length !== (newProps.state as ChatModel[])?.length
    ) {
      const chats =  (this.props.state as ChatModel[])?.map(
        (chat) =>
          new Chat({
            className: 'list__item',
            id: String(chat.id),
            avatar: chat.avatar,
            title: chat.title,
            lastMessageTime: chat.last_message?.time,
            lastMessageContent: chat.last_message?.content,
            createdBy: !!chat.created_by,
            unreadCount: chat.unread_count,
            active: chat.active === chat.id,
            // chatButtonClickHandler: chatButtonClickHandler as Listener,
            // chatClickHandler: chatClickHandler as Listener,
            settings: {
              withInternalID: true
            }
          })
      );

      this.setProps({
        chatsChildren: chats
      });

      return true;
    }

    if (
      !isEqual(oldProps.chats as [], newProps.chats as []) ||
      (oldProps.chats as ChatModel[])?.length !== (newProps.chats as ChatModel[])?.length
    ) {
      return true;
    }

    if (oldProps.chats !== newProps.chats) {
      return true;
    }

    return false;
  }

  _currentChat = 0;

  render(): string {
    console.log(this.props.chatsChildren);

    return template;
  }
}
