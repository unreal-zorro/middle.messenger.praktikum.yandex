import './chats-page.scss';
import { Block, WSTransportEvents } from '@/base';
import type { Listener, Props } from '@/base';
import { connect } from '@/hoc';
import { ChatModel, ChatUserModel, ResponseMessage, UserModel } from '@/models';
import {
  ChatController,
  ChatUsersController,
  ChatsPageController,
  UserController
} from '@/controllers';
import { isEqual } from '@/utils';
import { messagesAPI } from '@/api';
import { store } from '@/store';
import { Content, List, NewMessage, Search } from './modules';
import type { NewMessageProps, SearchProps, ListProps, ContentProps } from './modules';
import template from './chats-page.hbs?raw';

interface ChatsPageProps extends Props {
  id?: string;
  search?: SearchProps;
  list?: ListProps;
  content?: ContentProps;
  newMessage?: NewMessageProps;
  state?: Record<string, ChatModel[] | UserModel | boolean>;
}

export class ChatsPage extends Block {
  private chatController: ChatController;

  private chatsPageController: ChatsPageController;

  private chatUsersController: ChatUsersController;

  private userController: UserController;

  constructor(props: ChatsPageProps) {
    super(props);

    this.chatController = new ChatController();
    this.chatsPageController = new ChatsPageController();
    this.chatUsersController = new ChatUsersController();
    this.userController = new UserController();
  }

  public connectHandler: Listener<void> = () => {
    console.log('connect');
  };

  public closeHandler: Listener<void> = () => {
    console.log('close');
  };

  public messageHandler: Listener<ResponseMessage | ResponseMessage[]> = (
    message: ResponseMessage | ResponseMessage[]
  ) => {
    if ((this.props.state as Indexed<unknown>).receivedMessages as ResponseMessage[]) {
      if (Array.isArray(message)) {
        store.set('receivedMessages', [
          ...message,
          ...((store.getState() as Indexed<unknown>).receivedMessages as ResponseMessage[])
        ]);
      }

      if (!Array.isArray(message)) {
        store.set('receivedMessages', [
          message,
          ...((store.getState() as Indexed<unknown>).receivedMessages as ResponseMessage[])
        ]);
      }
    } else {
      if (Array.isArray(message)) {
        store.set('receivedMessages', [...message]);
      }

      if (!Array.isArray(message)) {
        store.set('receivedMessages', [message]);
      }
    }
  };

  public errorHandler: Listener<Error> = (error: Error) => {
    console.log(error);
  };

  public async initMessagesAPI() {
    const currentState = this.props.state as Indexed<
      ChatModel[] | ChatModel | UserModel | boolean | Indexed<unknown>
    >;

    const userId = (currentState?.user as UserModel)?.id;
    const chatID = (currentState?.activeChat as ChatModel)?.id;

    if (messagesAPI.wssTransport) {
      await messagesAPI.disconnectFromChat();
    }

    if (userId && chatID) {
      await messagesAPI.getWSSTransport(userId, chatID);

      if (messagesAPI && messagesAPI.wssTransport) {
        messagesAPI.wssTransport.on(WSTransportEvents.Connected, this.connectHandler as Listener);
        messagesAPI.wssTransport.on(WSTransportEvents.Close, this.closeHandler as Listener);
        messagesAPI.wssTransport.on(WSTransportEvents.Message, this.messageHandler as Listener);
        messagesAPI.wssTransport.on(WSTransportEvents.Error, this.errorHandler as Listener);
      }

      await messagesAPI.connectToChat();
      await messagesAPI.getMessages();
    }
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
    store.set('receivedMessages', undefined);
    store.set('activeChat', undefined);

    this.setProps({
      state: {
        ...(this.props.state as Indexed<unknown>),
        chatsData: newChats,
        activeChat: undefined,
        receivedMessages: undefined
      }
    });

    (this.children.list as List).setProps({
      state: {
        chatsData: newChats
      }
    });

    this.initContent();
  };

  public checkActiveChatHandler: (...args: Record<string, string>[]) => Promise<void> = async (
    data
  ) => {
    await this.chatController.checkActiveChat(Number(data.chatId));

    store.set('receivedMessages', undefined);
    await this.getChatUsersHandler(data);
    await this.initMessagesAPI();
  };

  public deleteChatHandler: (...args: Record<string, string>[]) => Promise<void> = async (data) => {
    const newChats = await this.chatController.deleteChat(Number(data.chatId));
    store.set('receivedMessages', undefined);
    store.set('activeChat', undefined);

    this.setProps({
      state: {
        ...(this.props.state as Indexed<unknown>),
        chatsData: newChats,
        activeChat: undefined,
        receivedMessages: undefined
      }
    });

    (this.children.list as List).setProps({
      state: {
        chatsData: newChats
      }
    });

    this.initContent();
  };

  public getChatUsersHandler: (...args: Record<string, string>[]) => Promise<void> = async (
    data
  ) => {
    const id = Number(data.chatId);

    const newChatUsers = await this.chatUsersController.getChatUsers(id);

    this.setProps({
      state: {
        ...(this.props.state as Indexed<unknown>),
        chatUsers: newChatUsers
      }
    });
  };

  public submitNewMessageHandler: (data: { newMessageText: string }) => Promise<void> = async ({
    newMessageText
  }) => {
    await messagesAPI.sendMessage(newMessageText);
  };

  public addChatUsersHandler: (data: { users: number[]; chatId: number }) => Promise<void> =
    async ({ users, chatId }) => {
      await this.chatUsersController.addChatUsers(users, chatId);
      const newChatUsers = await this.chatUsersController.getChatUsers(chatId);

      this.setProps({
        state: {
          ...(this.props.state as Indexed<unknown>),
          chatUsers: newChatUsers
        }
      });
    };

  public deleteChatUsersHandler: (data: { users: number[]; chatId: number }) => Promise<void> =
    async ({ users, chatId }) => {
      await this.chatUsersController.deleteChatUsers(users, chatId);
      const newChatUsers = await this.chatUsersController.getChatUsers(chatId);

      this.setProps({
        state: {
          ...(this.props.state as Indexed<unknown>),
          chatUsers: newChatUsers
        }
      });
    };

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
    this.children.list = new (withChats(List))({
      className: 'chats__list',
      chats: [],
      classNameChatMenu: '',
      chatMenu: (this.props.list as ListProps).chatMenu,
      visibleChatMenu: false,
      checkActiveChatHandler: this.checkActiveChatHandler,
      deleteChatHandler: this.deleteChatHandler,
      settings: {
        withInternalID: false
      }
    });
  }

  public initContent() {
    this.children.content = new (withActiveChatAndUserIdAndUsersToProps(Content))({
      className: 'chats__content',
      dates: (this.props.content as ContentProps).dates,
      // messages: (this.props.content as ContentProps).messages,
      // messageContent: (this.props.content as ContentProps).messageContent,
      currentChat: (this.props.content as ContentProps).currentChat,
      classNameContentMenu: '',
      contentMenu: (this.props.content as ContentProps).contentMenu,
      visibleContentMenu: false,
      userAddModal: (this.props.content as ContentProps).userAddModal,
      visibleUserAddModal: false,
      userDeleteModal: (this.props.content as ContentProps).userDeleteModal,
      visibleUserDeleteModal: false,
      chatUsersAddHandler: this.addChatUsersHandler,
      chatUsersDeleteHandler: this.deleteChatUsersHandler,
      settings: {
        withInternalID: false
      }
    });
  }

  public initNewMessage() {
    this.children.newMessage = new (withChatsPageData(NewMessage))({
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
      submitNewMessageHandler: this.submitNewMessageHandler,
      settings: {
        withInternalID: false
      }
    });
  }

  async componentDidMount() {
    try {
      await this.chatController?.getChats();
      await this.chatsPageController?.getChatsPageData();
      await this.userController?.getUser();

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

    if (
      !isEqual(
        (oldProps.state as Indexed<unknown>)?.user as UserModel,
        (newProps.state as Indexed<unknown>)?.user as UserModel
      )
    ) {
      return true;
    }

    if (
      !isEqual(
        (oldProps.state as Indexed<unknown>)?.activeChat as ChatModel,
        (newProps.state as Indexed<unknown>)?.activeChat as ChatModel
      )
    ) {
      this.initContent();

      return true;
    }

    return false;
  }

  _currentChat = 0;

  render(): string {
    return template;
  }
}

function mapChatsToProps(
  state: Indexed<
    ChatModel[] | ChatModel | UserModel | ResponseMessage[] | boolean | Indexed<unknown>
  >
): {
  chatsData: ChatModel[];
  activeChat: ChatModel;
  user: UserModel;
  receivedMessages: ResponseMessage[];
  isLoading: boolean;
  chatsPageData: Indexed<unknown>;
} {
  return {
    chatsData: state?.chats as ChatModel[],
    activeChat: state?.activeChat as ChatModel,
    user: state?.user as UserModel,
    receivedMessages: state?.receivedMessages as ResponseMessage[],
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

function mapActiveChatAndUserIdAndUsersToProps(
  state: Indexed<
    | Indexed<unknown>
    | ChatModel
    | UserModel
    | ChatUserModel[]
    | ResponseMessage[]
    | number
    | boolean
  >
): {
  userId: number;
  user: UserModel;
  activeChat: ChatModel;
  chatUsers: ChatUserModel[];
  chatsPageData: Indexed<unknown>;
  receivedMessages: ResponseMessage[];
  isLoading: boolean;
} {
  return {
    userId: (state?.user as UserModel)?.id,
    user: state?.user as UserModel,
    activeChat: state?.activeChat as ChatModel,
    chatUsers: state?.chatUsers as ChatUserModel[],
    chatsPageData: state?.chatsPageData as Indexed<unknown>,
    receivedMessages: state?.receivedMessages as ResponseMessage[],
    isLoading: state?.isLoading as boolean
  };
}

export const withChats = connect(
  mapChatsToProps as (state: Indexed<unknown>) => {
    chatsData: ChatModel[];
    activeChat: ChatModel;
    user: UserModel;
    receivedMessages: ResponseMessage[];
    isLoading: boolean;
    chatsPageData: Indexed<unknown>;
  }
);

export const withChatsPageData = connect(
  mapChatsPageDataToProps as (state: Indexed<unknown>) => {
    chatsPageData: Indexed<unknown>;
  }
);

export const withActiveChatAndUserIdAndUsersToProps = connect(
  mapActiveChatAndUserIdAndUsersToProps as (state: Indexed<unknown>) => {
    userId: number;
    user: UserModel;
    activeChat: ChatModel;
    chatUsers: ChatUserModel[];
    chatsPageData: Indexed<unknown>;
    receivedMessages: ResponseMessage[];
    isLoading: boolean;
  }
);
