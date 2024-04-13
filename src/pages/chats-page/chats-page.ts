import './chats-page.scss';
import { Block } from '@/base';
import type { Listener, Props } from '@/base';
import { connect } from '@/hoc';
import { ChatModel, ChatUserModel } from '@/models';
import { ChatController, ChatsPageController } from '@/controllers';
import { isEqual } from '@/utils';
import { Content, List, NewMessage, Search } from './modules';
import type { NewMessageProps, SearchProps, ListProps, ContentProps } from './modules';
import template from './chats-page.hbs?raw';

interface ChatsPageProps extends Props {
  id?: string;
  search?: SearchProps;
  list?: ListProps;
  content?: ContentProps;
  newMessage?: NewMessageProps;
  state?: Record<string, ChatModel[] | boolean>;
}

export class ChatsPage extends Block {
  private chatController: ChatController;

  private chatsPageController: ChatsPageController;

  // private chatUsersController: ChatUsersController;

  constructor(props: ChatsPageProps) {
    super(props);

    this.chatController = new ChatController();
    this.chatsPageController = new ChatsPageController();
    // this.chatUsersController = new ChatUsersController();
  }

  public clickHandler: Listener<Event> = (event: Event) => {
    if (event.target && (this.children.list as List)) {
      const isChatButton =
        (event.target as HTMLButtonElement).getAttribute('data-button') === 'chatButton';
      const isChatButtonSvg = (event.target as SVGAElement).getAttribute('data-svg') === 'chatSvg';

      if (!isChatButton && !isChatButtonSvg) {
        (this.children.list as List).setProps({
          visibleChatMenu: false
        });
      }
    }

    if (event.target && (this.children.content as Content)) {
      const isContentButton =
        (event.target as HTMLButtonElement).getAttribute('data-button') === 'contentButton';
      const isContentButtonSvg =
        (event.target as SVGAElement).getAttribute('data-svg') === 'contentSvg';

      if (!isContentButton && !isContentButtonSvg) {
        (this.children.content as Content).setProps({
          visibleContentMenu: false
        });
      }
    }

    if (event.target && (this.children.newMessage as NewMessage)) {
      const isAttachButton =
        (event.target as HTMLButtonElement).getAttribute('data-button') === 'attachButton';
      const isAttachButtonSvg =
        (event.target as SVGAElement).getAttribute('data-svg') === 'attachSvg';

      if (!isAttachButton && !isAttachButtonSvg) {
        (this.children.newMessage as NewMessage).setProps({
          visibleAttachMenu: false
        });
      }
    }
  };

  public wheelHandler: Listener = () => {
    if (this.children.list as List) {
      (this.children.list as List).setProps({
        visibleChatMenu: false
      });
    }

    if (this.children.content as Content) {
      (this.children.content as Content).setProps({
        visibleContentMenu: false
      });
    }

    if (this.children.newMessage as NewMessage) {
      (this.children.newMessage as NewMessage).setProps({
        visibleAttachMenu: false
      });
    }
  };

  public initEvents() {
    this.props.events = {
      click: ((event: Event) => this.clickHandler(event)) as Listener,
      wheel: this.wheelHandler,
      scroll: this.wheelHandler
    };
  }

  public searchChatHandler: Listener<Record<string, string>[]> = (search) => {
    console.log(search);
  };

  public addNewChatHandler: (...args: Record<string, string>[]) => void = async (data) => {
    const newChats = this.chatController.createChat(data.newChatTitle);

    this.setProps({
      state: {
        chatsData: newChats
      }
    });

    (this.children.list as List).setProps({
      state: {
        chatsData: newChats
      }
    });
  };

  public deleteChatHandler: (...args: Record<string, string>[]) => Promise<void> = async (data) => {
    const newChats = await this.chatController.deleteChat(Number(data.chatId));

    this.setProps({
      state: {
        chatsData: newChats
      }
    });

    (this.children.list as List).setProps({
      state: {
        chatsData: newChats
      }
    });
  };

  // public getChatUsersHandler: (...args: Record<string, string>[]) => Promise<void> = async (
  //   data
  // ) => {
  //   const newChatUsers = await this.chatUsersController.getChatUsers(Number(data.chatId));

  //   this.setProps({
  //     state: { chatUsers: newChatUsers }
  //   });
  // };

  // public addChatUsersHandler: (users: number[], chatId: number) => Promise<void> = async (
  //   users, chatId
  // ) => {
  //   await this.chatUsersController.addChatUsers(users, chatId);
  //   const newChatUsers = await this.chatUsersController.getChatUsers(chatId);

  //   this.setProps({
  //     state: { chatUsers: newChatUsers }
  //   });
  // };

  // public deleteChatUsersHandler: (users: number[], chatId: number) => Promise<void> = async (
  //   users, chatId
  // ) => {
  //   await this.chatUsersController.deleteChatUsers(users, chatId);
  //   const newChatUsers = await this.chatUsersController.getChatUsers(chatId);

  //   this.setProps({
  //     state: { chatUsers: newChatUsers }
  //   });
  // };

  public initSearch() {
    this.children.search = new (withChatsPageData(Search))({
      className: 'chats__search',
      controls: (this.props.search as SearchProps).controls,
      navLink: (this.props.search as SearchProps).navLink,
      button: (this.props.search as SearchProps).button,
      searchForm: (this.props.search as SearchProps).searchForm,
      addNewChatModal: (this.props.search as SearchProps).addNewChatModal,
      visibleAddNewChatModal: false,
      typeAddNewChatModal: '',
      keydownSearchHandler: this.searchChatHandler as Listener,
      addNewChatClickHandler: this.addNewChatHandler as Listener,
      settings: {
        withInternalID: false
      }
    });
  }

  public initList() {
    this.children.list = new List({
      className: 'chats__list',
      chats: [],
      classNameChatMenu: '',
      chatMenu: (this.props.list as ListProps).chatMenu,
      visibleChatMenu: false,
      state: this.props.state as Indexed<ChatModel[] | boolean | Indexed<unknown>>,
      deleteChatHandler: this.deleteChatHandler,
      settings: {
        withInternalID: false
      }
    });
  }

  public initContent() {
    this.children.content = new Content({
      className: 'chats__content',
      dates: (this.props.content as ContentProps).dates,
      messages: (this.props.content as ContentProps).messages,
      messageContent: (this.props.content as ContentProps).messageContent,
      currentChat: (this.props.content as ContentProps).currentChat,
      classNameContentMenu: '',
      contentMenu: (this.props.content as ContentProps).contentMenu,
      visibleContentMenu: false,
      userAddModal: (this.props.content as ContentProps).userAddModal,
      visibleUserAddModal: false,
      userDeleteModal: (this.props.content as ContentProps).userDeleteModal,
      visibleUserDeleteModal: false,
      settings: {
        withInternalID: false
      }
    });
  }

  public initNewMessage() {
    this.children.newMessage = new NewMessage({
      className: 'chats__new-message',
      newMessageForm: (this.props.newMessage as NewMessageProps).newMessageForm,
      classNameAttachMenu: '',
      attachMenu: (this.props.newMessage as NewMessageProps).attachMenu,
      visibleAttachMenu: false,
      attachPhotoModal: (this.props.newMessage as NewMessageProps).attachPhotoModal,
      visibleAttachPhotoModal: false,
      typeAttachPhotoModal: 'image',
      attachFileModal: (this.props.newMessage as NewMessageProps).attachFileModal,
      visibleAttachFileModal: false,
      typeAttachFileModal: '',
      attachLocationModal: (this.props.newMessage as NewMessageProps).attachLocationModal,
      visibleAttachLocationModal: false,
      typeAttachLocationModal: '',
      settings: {
        withInternalID: false
      }
    });
  }

  async componentDidMount() {
    try {
      await this.chatController?.getChats();
      await this.chatsPageController?.getChatsPageData();

      this.initEvents();
      this.initSearch();
      this.initList();
      this.initContent();
      this.initNewMessage();

      (this.children.list as List).setProps({
        state: this.props.state as Indexed<ChatModel[] | boolean | Indexed<unknown>>
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(oldProps: ChatsPageProps, newProps: ChatsPageProps): boolean {
    if (
      !isEqual(
        (oldProps.state as Indexed<unknown>)?.chatsData as [],
        (newProps.state as Indexed<unknown>)?.chatsData as []
      )
    ) {
      return true;
    }

    if (!isEqual(oldProps.state as Indexed<unknown>, newProps.state as Indexed<unknown>)) {
      return true;
    }

    if (
      (oldProps.state as Indexed<unknown>).isLoading !==
      (newProps.state as Indexed<unknown>).isLoading
    ) {
      if ((newProps.state as Indexed<unknown>).isLoading === false) {
        return true;
      }
    }

    return false;
  }

  _currentChat = 0;

  render(): string {
    if ((this.props.state as Indexed<unknown>).isLoading) {
      return `
        <main>
          Загрузка...
        </main>`;
    }

    return template;
  }
}

function mapChatsToProps(state: Indexed<ChatModel[] | boolean | Indexed<unknown>>): {
  chatsData: ChatModel[];
  isLoading: boolean;
  chatsPageData: Indexed<unknown>;
} {
  return {
    chatsData: state?.chats as ChatModel[],
    isLoading: state?.isLoading as boolean,
    chatsPageData: state?.chatsPageData as Indexed<unknown>
  };
}

function mapChatsPageDataToProps(state: Indexed<Indexed<unknown>>): {
  chatsPageData: Indexed<unknown>;
} {
  return {
    chatsPageData: state?.chatsPageData as Indexed<unknown>
  };
}

function mapChatUsersToProps(state: Indexed<ChatUserModel[] | boolean>): {
  chatUsers: ChatUserModel[];
  isLoading: boolean;
} {
  return { chatUsers: state?.chatUsers as ChatUserModel[], isLoading: state?.isLoading as boolean };
}

export const withChats = connect(
  mapChatsToProps as (state: Indexed<unknown>) => {
    chatsData: ChatModel[];
    isLoading: boolean;
    chatsPageData: Indexed<unknown>;
  }
);
export const withChatsPageData = connect(
  mapChatsPageDataToProps as (state: Indexed<unknown>) => {
    chatsPageData: Indexed<unknown>;
  }
);

export const withChatUsers = connect(
  mapChatUsersToProps as (state: Indexed<unknown>) => {
    chatUsers: ChatUserModel[];
    isLoading: boolean;
  }
);
