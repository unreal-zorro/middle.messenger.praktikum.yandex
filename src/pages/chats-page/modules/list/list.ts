import './list.scss';
import { Block } from '@/base';
import type { Listener, Props } from '@/base';
import { Text } from '@/components';
import { Menu } from '@/modules';
import type { MenuProps } from '@/modules';
import { ChatModel } from '@/models';
import { connect } from '@/hoc';
import { ChatController } from '@/controllers';
import { isEqual } from '@/utils';
import { Chat } from './modules';
import type { ChatProps } from './modules';
import template from './list.hbs?raw';

export interface ListProps extends Props {
  className?: string;
  chats?: ChatProps[];
  classNameChatMenu?: string;
  chatMenu?: MenuProps;
  visibleChatMenu?: boolean;
  visibleChatAvatarModal?: boolean;
  state?: ChatModel[];
  isLoading?: boolean;
}

export class List extends Block {
  private chatController: ChatController;

  constructor(props: ListProps) {
    super(props);

    this.chatController = new ChatController();

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

    this.setProps({
      isLoading: true
    });

    this.chatController
      ?.getChats()
      .then(() => this.setProps({ isLoading: false }))
      .then(() => {
        if (((this.props.state as Record<string, ChatModel[]>)?.chats as ChatModel[])?.length) {
          this.children.chats = (
            (this.props.state as Record<string, ChatModel[]>)?.chats as ChatModel[]
          )?.map(
            (chat) =>
              new Chat({
                className: 'list__item',
                id: String(chat.id),
                avatar: chat.avatar,
                title: chat.title,
                date: String(chat.created_by),
                text: chat.last_message.content,
                sender: !!chat.last_message.user.login,
                count: String(chat.unread_count),
                // active: chat.active,
                chatButtonClickHandler: chatButtonClickHandler as Listener,
                chatClickHandler: chatClickHandler as Listener,
                settings: {
                  withInternalID: true
                }
              })
          );
        }

        if (
          !(this.props.state as Record<string, ChatModel[]>)?.chats ||
          !((this.props.state as Record<string, ChatModel[]>)?.chats as ChatModel[])?.length
        ) {
          this.children.text = new Text({
            className: 'list__text',
            text: 'Список чатов пуст',
            settings: {
              withInternalID: false
            }
          });
        }
      });
  }

  async componentDidMount() {
    try {
      await this.chatController?.getChats();
      this.setProps({ isLoading: false });
    } catch (error) {
      console.log(error);
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

    if (oldProps.isLoading !== newProps.isLoading) {
      if (newProps.isLoading === false) {
        return true;
      }
    }

    if (!isEqual(oldProps.state as [], newProps.state as [])) {
      return true;
    }

    return false;
  }

  _currentChat = 0;

  render(): string {
    return template;
  }
}

function mapChatsToProps(state: Indexed<ChatModel[]>): { chats: ChatModel[] } {
  return { chats: state?.chats };
}

export const withChats = connect(
  mapChatsToProps as (state: Indexed<unknown>) => { chats: ChatModel[] }
);
