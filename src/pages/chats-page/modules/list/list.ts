import './list.scss';
import { Block } from '@/base';
import type { Listener, Props } from '@/base';
import { Text } from '@/components';
import { Menu } from '@/modules';
import type { MenuProps } from '@/modules';
import { ChatModel, ResponseMessage, UserModel } from '@/models';
import { isEqual } from '@/utils';
import { CHAT_MENU_ITEMS } from '@/consts';
import { Chat } from './modules';
import template from './list.hbs?raw';

const getTransformChatsDate: (chatsDate: string) => string = (chatsDate) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();

  const dateFormatter = new Intl.DateTimeFormat('ru', {
    month: 'long',
    day: 'numeric'
  });

  const shortDateFormatter = new Intl.DateTimeFormat('ru', {
    weekday: 'short'
  });

  const longDateFormatter = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const timeFormatter = new Intl.DateTimeFormat('ru', {
    hour: 'numeric',
    minute: 'numeric'
  });

  const weekDaysInMs = 7 * 24 * 60 * 60 * 1000;

  const capitalizeFirstLetter: (string: string) => string = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const chatMessageDate = new Date(chatsDate);

  let formatter = dateFormatter;

  const chatMessageYear = chatMessageDate.getFullYear();

  if (currentYear !== chatMessageYear) {
    formatter = longDateFormatter;
  }

  const dateDifference = new Date(currentDate.getTime() - chatMessageDate.getTime());

  if (dateDifference.getTime() < weekDaysInMs) {
    formatter = shortDateFormatter;

    const chatMessageDay = chatMessageDate.getDate();

    if (currentDay === chatMessageDay) {
      formatter = timeFormatter;
    }
  }

  let date = capitalizeFirstLetter(formatter.format(chatMessageDate));

  if (formatter === longDateFormatter) {
    date = date.slice(0, -3);
  }

  return date;
};

export interface ListProps extends Props {
  className?: string;
  chats?: ChatModel[];
  classNameChatMenu?: string;
  chatMenu?: MenuProps;
  visibleChatMenu?: boolean;
  visibleChatAvatarModal?: boolean;
  state?: Indexed<
    ChatModel[] | ChatModel | UserModel | ResponseMessage[] | boolean | Indexed<unknown>
  >;
  isUpdate?: boolean;
  checkActiveChatHandler: (...args: Record<string, string>[]) => Promise<void>;
  deleteChatHandler: (...args: Record<string, string>[]) => Promise<void>;
}

export class List extends Block {
  constructor(props: ListProps) {
    super(props);
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

    if (this.props.checkActiveChatHandler) {
      (this.props.checkActiveChatHandler as (...args: Record<string, string>[]) => Promise<void>)({
        chatId: String(id)
      });
    }
  };

  public chatMenuItemClickHandler: Listener<string> = (text: string) => {
    const id = this._currentChat;

    const itemText = text.trim();

    if (itemText === CHAT_MENU_ITEMS.delete) {
      if (this.props.deleteChatHandler) {
        (this.props.deleteChatHandler as (...args: Record<string, string>[]) => Promise<void>)({
          chatId: String(id)
        });
      }
    } else {
      console.log(`list currentChat id = ${id}, text = ${itemText}`);
    }
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
    const currentState = this.props?.state as Indexed<
      ChatModel[] | ChatModel | UserModel | ResponseMessage[] | boolean | Indexed<unknown>
    >;

    const chatsData = currentState?.chatsData as ChatModel[];

    const chatUser = currentState?.user as UserModel;
    const chatUserId = chatUser.id;

    const chatsArrayLength = chatsData?.length;

    if (chatsArrayLength) {
      const chatsArray = new Array(chatsArrayLength).fill(0);

      this.children.chats = chatsArray?.map((_chat, index) => {
        const currentChat = chatsData?.[index];

        const id = currentChat?.id;
        const avatar = currentChat?.avatar;
        const title = currentChat?.title;
        const lastMessageContent = currentChat?.last_message?.content;
        const createdBy = currentChat?.created_by === chatUserId;
        const unreadCount = currentChat?.unread_count;
        const active = currentChat?.active === id;

        let lastMessageTime = '';
        if (currentChat?.last_message) {
          lastMessageTime = getTransformChatsDate(currentChat?.last_message?.time as string);
        }

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
    const chatsArray = (this.props?.state as Indexed<ChatModel[] | boolean | Indexed<unknown>>)
      ?.chatsData as ChatModel[];

    const chatsArrayLength = chatsArray?.length;

    if (!chatsArray || !chatsArrayLength) {
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
      this.initChats();
      this.initChatMenu();
      this.initText();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(oldProps: ListProps, newProps: ListProps): boolean {
    if (
      !isEqual(
        (oldProps.state as Indexed<ChatModel[] | boolean | Indexed<unknown>>).chatsData as [],
        (newProps.state as Indexed<ChatModel[] | boolean | Indexed<unknown>>).chatsData as []
      )
    ) {
      this.initChats();
      this.initText();

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

    // if (
    //   (oldProps.state as Indexed<unknown>).isLoading !==
    //   (newProps.state as Indexed<unknown>).isLoading
    // ) {
    //   if ((newProps.state as Indexed<unknown>).isLoading === false) {
    //     return true;
    //   }
    // }

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
