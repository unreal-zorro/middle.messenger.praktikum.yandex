import './list.scss';
import { Block } from '@/base';
import type { Listener, Props } from '@/base';
import { Text } from '@/components';
import { Menu } from '@/modules';
import type { MenuProps } from '@/modules';
import { ChatModel } from '@/models';
import { isEqual } from '@/utils';
// import { ChatController } from '@/controllers';
import { Chat } from './modules';
import template from './list.hbs?raw';

export interface ListProps extends Props {
  className?: string;
  chats?: ChatModel[];
  // chatsChildren?: unknown[];
  classNameChatMenu?: string;
  chatMenu?: MenuProps;
  visibleChatMenu?: boolean;
  visibleChatAvatarModal?: boolean;
  state?: Indexed<ChatModel[] | boolean | Indexed<unknown>>;
  isUpdate?: boolean;
  deleteChatHandler: (...args: Record<string, string>[]) => Promise<void>;
}

export class List extends Block {
  // private chatController: ChatController;

  constructor(props: ListProps) {
    super(props);

    // this.chatController = new ChatController();
  }

  public chatButtonClickHandler: Listener<number> = (id, buttonLeft, buttonTop, buttonHeight) => {
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

  public chatClickHandler: Listener<number> = (id) => {
    (this.children.chats as Chat[])?.forEach((chat) => {
      chat.setProps({
        active: chat.getId() === String(id)
      });
    });

    console.log(`list activeChat id = ${id}`);
  };

  public chatMenuItemClickHandler: Listener<string> = (text) => {
    const id = this._currentChat;

    if (this.props.deleteChatHandler) {
      (this.props.deleteChatHandler as (...args: Record<string, string>[]) => Promise<void>)({
        chatId: String(id)
      });
    }

    console.log(`list currentChat id = ${id}, text = ${text.trim()}`);
  };

  public initChatMenu() {
    this.children.chatMenu = new Menu({
      dataMenu: 'chatMenu',
      className: 'list__chat-menu',
      items: (this.props.chatMenu as MenuProps).items,
      visible: this.props.visibleChatMenu as boolean,
      state: (
        (
          (this.props.state as Indexed<ChatModel[] | boolean | Indexed<unknown>>)
            .chatsPageData as Indexed<unknown>
        ).list as Indexed<unknown>
      ).chatMenu as MenuProps,
      menuItemClickHandler: this.chatMenuItemClickHandler as Listener,
      settings: {
        withInternalID: false
      }
    });
  }

  public initChats() {
    const chatsArrayLength = (
      (this.props?.state as Indexed<ChatModel[] | boolean | Indexed<unknown>>)
        ?.chatsData as ChatModel[]
    )?.length;

    if (chatsArrayLength) {
      const chatsArray = new Array(chatsArrayLength).fill(0);

      this.children.chats = chatsArray?.map((_chat, index) => {
        const currentChat = (
          (this.props?.state as Indexed<ChatModel[] | boolean | Indexed<unknown>>)
            ?.chatsData as ChatModel[]
        )?.[index];

        const id = currentChat?.id;
        const avatar = currentChat?.avatar;
        const title = currentChat?.title;
        const lastMessageTime = currentChat?.last_message?.time;
        const lastMessageContent = currentChat?.last_message?.content;
        const createdBy = !!currentChat?.created_by;
        const unreadCount = currentChat?.unread_count;
        const active = currentChat?.active === id;

        return new Chat({
          className: 'list__item',
          id: String(id),
          avatar,
          title,
          lastMessageTime,
          lastMessageContent,
          createdBy,
          unreadCount,
          active,
          chatButtonClickHandler: this.chatButtonClickHandler as Listener,
          chatClickHandler: this.chatClickHandler as Listener,
          settings: {
            withInternalID: true
          }
        });
      });
    }
  }

  public initText() {
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

  async componentDidMount() {
    try {
      // await this.chatController?.getChats();

      this.initChats();
      this.initChatMenu();
      this.initText();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(oldProps: ListProps, newProps: ListProps): boolean {
    if (!isEqual(oldProps.state as Indexed<unknown>, newProps.state as Indexed<unknown>)) {
      return true;
    }

    if (
      !isEqual(
        (oldProps.state as Indexed<ChatModel[] | boolean | Indexed<unknown>>)
          .chatsPageData as Indexed<unknown>,
        (newProps.state as Indexed<ChatModel[] | boolean | Indexed<unknown>>)
          .chatsPageData as Indexed<unknown>
      )
    ) {
      return true;
    }

    if (
      ((oldProps.state as Indexed<ChatModel[] | boolean | Indexed<unknown>>)
        .isLoading as boolean) !==
      ((newProps.state as Indexed<ChatModel[] | boolean | Indexed<unknown>>).isLoading as boolean)
    ) {
      return true;
    }

    if (oldProps.visibleChatMenu !== newProps.visibleChatMenu) {
      if (newProps.visibleChatMenu === false) {
        (this.children.chatMenu as Menu).hide();
      }
      if (newProps.visibleChatMenu === true) {
        (this.children.chatMenu as Menu).show();
      }
    }

    if (
      (oldProps.state as Indexed<unknown>).isLoading !==
      (newProps.state as Indexed<unknown>).isLoading
    ) {
      if ((newProps.state as Indexed<unknown>).isLoading === false) {
        return true;
      }
    }

    if (
      !isEqual(
        (oldProps.state as Indexed<unknown>)?.chats as [],
        (newProps.state as Indexed<unknown>)?.chats as []
      )
    ) {
      return true;
    }

    if (oldProps.isUpdate !== newProps.isUpdate) {
      if (newProps.isUpdate === true) {
        return true;
      }
    }

    if (!isEqual(oldProps.children as {}, newProps.children as {})) {
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
    // if ((this.props.state as Indexed<unknown>).isLoading) {
    //   return `
    //     <section class="list ${this.props.className}">
    //       Загрузка...
    //     </section>`;
    // }

    return template;
  }
}
