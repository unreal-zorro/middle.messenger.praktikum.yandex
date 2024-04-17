import './content.scss';
import { Block } from '@/base';
import type { Listener, Props } from '@/base';
import type { CurrentChat } from '@/entities';
import { Avatar, Button, Svg, Text } from '@/components';
import { Menu, Modal } from '@/modules';
import type { MenuProps, ModalProps } from '@/modules';
import { CONTENT_MENU_ITEMS, VALIDATION_RULES } from '@/consts';
import { isEqual } from '@/utils';
import { ChatModel, ChatUserModel, ResponseMessage, UserModel } from '@/models';
import { connect } from '@/hoc';
import { store } from '@/store';
import { ContentChat, EqualDatesMessages } from './modules';
import type { MessageContent, MessageProps } from './modules';
import template from './content.hbs?raw';

export interface ContentProps extends Props {
  className?: string;
  dates?: string[];
  // messages?: MessageProps[];
  // messageContent?: MessageContent[];
  currentChat?: CurrentChat;
  classNameContentMenu?: string;
  contentMenu?: MenuProps;
  visibleContentMenu?: boolean;
  userAddModal: ModalProps;
  visibleUserAddModal?: boolean;
  userDeleteModal: ModalProps;
  visibleUserDeleteModal?: boolean;
  state?: Indexed<
    | Indexed<unknown>
    | ChatModel
    | UserModel
    | ChatUserModel[]
    | ResponseMessage[]
    | number
    | boolean
  >;
  chatUsersAddHandler: Listener;
  chatUsersDeleteHandler: Listener;
}

const getChatsContent = (
  userID: string = '',
  messagesArray: ResponseMessage[] = [],
  chatUsers: ChatUserModel[] = []
) => {
  if (!userID || !messagesArray) {
    return {
      dates: [],
      messages: [],
      messageContent: []
    };
  }

  const dateArray: Set<string> = new Set();
  const messageArray: MessageProps[] = [];
  const messageContentArray: MessageContent[] = [];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  let dateFormatter = new Intl.DateTimeFormat('ru', {
    month: 'long',
    day: 'numeric'
  });

  const timeFormatter = new Intl.DateTimeFormat('ru', {
    hour: 'numeric',
    minute: 'numeric'
  });

  messagesArray.forEach((message) => {
    const messageDate = new Date(message.time);
    const messageYear = messageDate.getFullYear();

    const isISendMessage = String(message.user_id) === String(userID);

    if (currentYear !== messageYear) {
      dateFormatter = new Intl.DateTimeFormat('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    const date = dateFormatter.format(messageDate);
    const time = timeFormatter.format(messageDate);

    const chatUser = chatUsers.filter((user) => user.id === +message.user_id);
    const name = chatUser?.[0].display_name;

    const resultMessage: MessageProps = {
      id: message.id,
      name,
      date,
      time,
      check: isISendMessage
    };

    dateArray.add(date);
    messageArray.push(resultMessage);
    messageContentArray.push({
      messageId: message.id,
      isText: true,
      isImage: false,
      data: message.content
    });
  });

  const dates = Array.from(dateArray);
  const messages = messageArray;
  const messageContent = messageContentArray;

  return {
    dates,
    messages,
    messageContent
  };
};

export class Content extends Block {
  constructor(props: ContentProps) {
    super(props);
  }

  public clickHandler: Listener<Event> = (event: Event) => {
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
  };

  public contentMenuItemClickHandler: Listener<string> = (text) => {
    const currentChat = (
      this.props?.state as Indexed<
        | Indexed<unknown>
        | ChatModel
        | UserModel
        | ChatUserModel[]
        | ResponseMessage[]
        | number
        | boolean
      >
    )?.activeChat as ChatModel;

    const currentChatId = currentChat?.id;

    if (currentChatId) {
      console.log(`content currentChat id = ${currentChatId}, action = ${text.trim()}`);

      const itemText = text.trim();

      if (itemText === CONTENT_MENU_ITEMS.add) {
        this.setProps({
          visibleUserAddModal: true
        });
      }

      if (itemText === CONTENT_MENU_ITEMS.delete) {
        this.setProps({
          visibleUserDeleteModal: true
        });
      }
    }
  };

  public submitUserAddModalHandler: (...args: Record<string, string>[]) => void = (formData) => {
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      const { regExp } = VALIDATION_RULES[key];
      isValid = isValid && regExp.test(value);
    });

    if (isValid) {
      const currentChat = (
        this.props?.state as Indexed<
          | Indexed<unknown>
          | ChatModel
          | UserModel
          | ChatUserModel[]
          | ResponseMessage[]
          | number
          | boolean
        >
      )?.activeChat as ChatModel;

      const currentChatId = currentChat?.id;
      const users = [Number(formData.addUser)];

      if (this.props.chatUsersAddHandler) {
        (
          this.props.chatUsersAddHandler as (
            ...args: Record<string, number | number[]>[]
          ) => Promise<void>
        )({
          chatId: currentChatId,
          users
        });
      }

      this.setProps({
        visibleUserAddModal: false
      });

      console.log(formData);
    } else {
      console.log('Invalid form data');
    }
  };

  public submitUserDeleteModalHandler: (...args: Record<string, string>[]) => void = (formData) => {
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      const { regExp } = VALIDATION_RULES[key];
      isValid = isValid && regExp.test(value);
    });

    if (isValid) {
      const currentChat = (
        this.props?.state as Indexed<
          | Indexed<unknown>
          | ChatModel
          | UserModel
          | ChatUserModel[]
          | ResponseMessage[]
          | number
          | boolean
        >
      )?.activeChat as ChatModel;

      const currentChatId = currentChat?.id;
      const users = [Number(formData.deleteUser)];

      if (this.props.chatUsersDeleteHandler) {
        (
          this.props.chatUsersDeleteHandler as (
            ...args: Record<string, number | number[]>[]
          ) => Promise<void>
        )({
          chatId: currentChatId,
          users
        });
      }

      this.setProps({
        visibleUserDeleteModal: false
      });

      console.log(formData);
    } else {
      console.log('Invalid form data');
    }
  };

  public closeUserAddModalHandler: Listener = () => {
    this.setProps({
      visibleUserAddModal: false
    });
  };

  public closeUserDeleteModalHandler: Listener = () => {
    this.setProps({
      visibleUserDeleteModal: false
    });
  };

  public initContentChat() {
    const currentState = this.props.state as Indexed<
      | Indexed<unknown>
      | ChatModel
      | UserModel
      | ChatUserModel[]
      | ResponseMessage[]
      | number
      | boolean
    >;

    const activeChat = currentState?.activeChat as ChatModel;

    if (activeChat && (activeChat as ChatModel)?.id) {
      this.children.contentChat = new ContentChat({
        settings: {
          withInternalID: false
        },
        avatar: new Avatar({
          className: 'content__avatar avatar_no-edit',
          imgSrc: activeChat?.avatar as string,
          settings: {
            withInternalID: false
          }
        }),
        title: new Text({
          className: 'content__title',
          text: activeChat?.title as string,
          settings: {
            withInternalID: false
          }
        }),
        button: new Button({
          dataButton: 'contentButton',
          className: 'content__button',
          type: 'button',
          settings: {
            withInternalID: false
          },
          events: {
            click: ((event: Event) => this.clickHandler.call(this, event)) as Listener
          },
          buttonChild: new Svg({
            dataSvg: 'contentSvg',
            className: 'content__icon',
            href: '#icon-triple'
          })
        })
      });
    }
  }

  public initDates() {
    const currentState = this.props.state as Indexed<
      | Indexed<unknown>
      | ChatModel
      | UserModel
      | ChatUserModel[]
      | ResponseMessage[]
      | number
      | boolean
    >;

    const activeChat = currentState?.activeChat as ChatModel;

    const userId = (currentState?.user as UserModel)?.id;
    const messagesArray = currentState?.receivedMessages as ResponseMessage[];
    const chatUsersArray = currentState?.chatUsers as ChatUserModel[];

    const {
      dates: datesArray,
      messages: newMessagesArray,
      messageContent: messageContentArray
    } = getChatsContent(String(userId), messagesArray, chatUsersArray);
    const datesArrayLength = datesArray?.length;

    const filteredMessages: Array<MessageProps[]> = [];
    const filteredMessageContent: Array<MessageContent[]> = [];

    datesArray?.forEach((currentDate, index) => {
      filteredMessages[index] = newMessagesArray.filter(
        (messageItem) => currentDate === messageItem.date
      );

      const tempContent: MessageContent[] = [];

      filteredMessages[index]?.forEach((messageItem) => {
        const content = messageContentArray?.filter(
          (messageContentItem) => messageItem.id === messageContentItem.messageId
        );
        tempContent.push(...content);
      });

      filteredMessageContent[index] = Array.from(tempContent);
    });

    if (activeChat && datesArrayLength) {
      const newDatesArray = new Array(datesArrayLength).fill(0);

      this.children.dates = newDatesArray?.map((_dateItem, index) => {
        const currentDate = datesArray?.[index];

        const messages: MessageProps[] = Array.from(filteredMessages[index]);

        const messageContent: MessageContent[] = Array.from(filteredMessageContent[index]);

        if ((this.props.state as Indexed<unknown>).messages as MessageProps[]) {
          if (Array.isArray(messages)) {
            store.set('messages', [
              ...((store.getState() as Indexed<unknown>).messages as MessageProps[]),
              ...messages
            ]);

            store.set('messagesArray', [...filteredMessages[index]]);
          }

          if (!Array.isArray(messages)) {
            store.set('messages', [
              ...((store.getState() as Indexed<unknown>).messages as MessageProps[]),
              messages
            ]);

            store.set('messagesArray', [filteredMessages[index]]);
          }
        } else {
          if (Array.isArray(messages)) {
            store.set('messages', [...messages]);
            store.set('messagesArray', [...filteredMessages[index]]);
          }

          if (!Array.isArray(messages)) {
            store.set('messages', [messages]);
            store.set('messagesArray', [filteredMessages[index]]);
          }
        }

        if ((this.props.state as Indexed<unknown>).messageContent as MessageContent[]) {
          if (Array.isArray(messageContent)) {
            store.set('messageContent', [
              ...((store.getState() as Indexed<unknown>).messageContent as MessageContent[]),
              ...messageContent
            ]);
          }

          if (!Array.isArray(messageContent)) {
            store.set('messageContent', [
              ...((store.getState() as Indexed<unknown>).messageContent as MessageContent[]),
              messageContent
            ]);
          }
        } else {
          if (Array.isArray(messageContent)) {
            store.set('messageContent', [...messageContent]);
          }

          if (!Array.isArray(messageContent)) {
            store.set('messageContent', [messageContent]);
          }
        }

        return new (withMessagesAndMessageContent(EqualDatesMessages))({
          className: 'content__list-item',
          date: currentDate,
          messages,
          messageContent,
          settings: {
            withInternalID: true
          }
        });
      });
    }
  }

  public initEmptyDates() {
    this.children.dates = [];
  }

  public initNoMessagesText() {
    const currentState = this.props.state as Indexed<
      | Indexed<unknown>
      | ChatModel
      | UserModel
      | ChatUserModel[]
      | ResponseMessage[]
      | number
      | boolean
    >;

    const userId = (currentState?.user as UserModel)?.id;
    const messagesArray = currentState?.receivedMessages as ResponseMessage[];
    const chatUsersArray = currentState?.chatUsers as ChatUserModel[];

    const { dates: datesArray } = getChatsContent(String(userId), messagesArray, chatUsersArray);
    const datesArrayLength = datesArray?.length;

    if (!datesArrayLength) {
      this.children.noMessagesText = new Text({
        className: 'content__text',
        text: 'В выбранном чате отсутствуют сообщения',
        settings: {
          withInternalID: false
        }
      });
    }
  }

  public initEmptyNoMessagesText() {
    this.children.noMessagesText = new Text({
      className: 'content__text',
      text: '',
      settings: {
        withInternalID: false
      }
    });
  }

  public initNoChatText() {
    const currentState = this.props.state as Indexed<
      | Indexed<unknown>
      | ChatModel
      | UserModel
      | ChatUserModel[]
      | ResponseMessage[]
      | number
      | boolean
    >;

    const activeChat = currentState?.activeChat as ChatModel;
    if (!activeChat) {
      this.children.noChatText = new Text({
        className: 'content__text',
        text: 'Выберите чат, чтобы отправить сообщение',
        settings: {
          withInternalID: false
        }
      });
    }
  }

  public initContentMenu() {
    this.children.contentMenu = new Menu({
      dataMenu: 'contentMenu',
      className: 'content__content-menu',
      items: (this.props.contentMenu as MenuProps).items,
      visible: this.props.visibleContentMenu as boolean,
      state: (
        ((this.props.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
          .content as Indexed<unknown>
      ).contentMenu as MenuProps,
      menuItemClickHandler: this.contentMenuItemClickHandler as Listener,
      settings: {
        withInternalID: false
      }
    });
  }

  public initUserAddModal() {
    const currentState = this.props.state as Indexed<
      | Indexed<unknown>
      | ChatModel
      | UserModel
      | ChatUserModel[]
      | ResponseMessage[]
      | number
      | boolean
    >;

    const modalState = (
      (currentState.chatsPageData as Indexed<unknown>).newMessage as Indexed<unknown>
    ).userAddModal as ModalProps;

    const currentChatUsers = currentState?.chatUsers as ChatUserModel[];
    const list = currentChatUsers?.map((user) => String(user.id));

    this.children.userAddModal = new Modal({
      className: '',
      type: '',
      header: (this.props.userAddModal as ModalProps)?.header,
      controls: (this.props.userAddModal as ModalProps)?.controls,
      buttons: (this.props.userAddModal as ModalProps)?.buttons,
      visible: this.props.visibleUserAddModal as boolean,
      listHeader: (this.props.userAddModal as ModalProps)?.listHeader,
      list,
      state: modalState,
      submitHandler: this.submitUserAddModalHandler as Listener,
      closeHandler: this.closeUserAddModalHandler,
      settings: {
        withInternalID: false
      }
    });
  }

  public initUserDeleteModal() {
    const currentState = this.props.state as Indexed<
      | Indexed<unknown>
      | ChatModel
      | UserModel
      | ChatUserModel[]
      | ResponseMessage[]
      | number
      | boolean
    >;

    const modalState = (
      (currentState.chatsPageData as Indexed<unknown>).newMessage as Indexed<unknown>
    ).userDeleteModal as ModalProps;

    const currentChatUsers = currentState?.chatUsers as ChatUserModel[];
    const list = currentChatUsers?.map((user) => String(user.id));

    this.children.userDeleteModal = new Modal({
      className: '',
      type: '',
      header: (this.props.userDeleteModal as ModalProps)?.header,
      controls: (this.props.userDeleteModal as ModalProps)?.controls,
      buttons: (this.props.userDeleteModal as ModalProps)?.buttons,
      visible: this.props.visibleUserDeleteModal as boolean,
      listHeader: (this.props.userAddModal as ModalProps)?.listHeader,
      list,
      state: modalState,
      submitHandler: this.submitUserDeleteModalHandler as Listener,
      closeHandler: this.closeUserDeleteModalHandler,
      settings: {
        withInternalID: false
      }
    });
  }

  async componentDidMount() {
    try {
      this.initContentChat();
      this.initNoChatText();
      this.initContentMenu();
      this.initUserAddModal();
      this.initUserDeleteModal();
    } catch (error) {
      console.log(error);
    }
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

    if (oldProps.visibleUserAddModal !== newProps.visibleUserAddModal) {
      if (newProps.visibleUserAddModal === false) {
        (this.children.userAddModal as Modal).hide();
        document.body.classList.remove('modal-open');
      }
      if (newProps.visibleUserAddModal === true) {
        (this.children.userAddModal as Modal).show();
        document.body.classList.add('modal-open');
      }
    }

    if (oldProps.visibleUserDeleteModal !== newProps.visibleUserDeleteModal) {
      if (newProps.visibleUserDeleteModal === false) {
        (this.children.userDeleteModal as Modal).hide();
        document.body.classList.remove('modal-open');
      }
      if (newProps.visibleUserDeleteModal === true) {
        (this.children.userDeleteModal as Modal).show();
        document.body.classList.add('modal-open');
      }
    }

    if (
      !isEqual(
        (oldProps.state as Indexed<unknown>).activeChat as Indexed<unknown>,
        (newProps.state as Indexed<unknown>).activeChat as Indexed<unknown>
      )
    ) {
      if (((newProps.state as Indexed<unknown>).activeChat as ChatModel) === undefined) {
        this.initNoChatText();
      } else {
        this.initContentChat();
      }
    }

    if (
      !isEqual(
        (oldProps.state as Indexed<unknown>).chatUsers as [],
        (newProps.state as Indexed<unknown>).chatUsers as []
      )
    ) {
      this.initUserAddModal();
      this.initUserDeleteModal();

      const currentChatUsers = (newProps.state as Indexed<unknown>)?.chatUsers as ChatUserModel[];
      const listUsers = currentChatUsers?.map((user) => String(user.id));

      (this.children.userAddModal as Block).setProps({
        state: {
          ...((
            ((newProps.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
              .content as Indexed<unknown>
          ).userAddModal as ModalProps),
          list: listUsers
        }
      });

      (this.children.userDeleteModal as Block).setProps({
        state: {
          ...((
            ((newProps.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
              .content as Indexed<unknown>
          ).userDeleteModal as ModalProps),
          list: listUsers
        }
      });

      return true;
    }

    if (
      !isEqual(
        (oldProps.state as Indexed<unknown>).receivedMessages as [],
        (newProps.state as Indexed<unknown>).receivedMessages as []
      )
    ) {
      if (
        ((newProps.state as Indexed<unknown>).receivedMessages as ResponseMessage[]) ===
          undefined ||
        ((newProps.state as Indexed<unknown>).receivedMessages as [])?.length === 0
      ) {
        this.initNoMessagesText();
        this.initEmptyDates();
      } else {
        this.initDates();
        this.initEmptyNoMessagesText();
        this.initContentMenu();
      }

      if (((newProps.state as Indexed<unknown>).activeChat as ChatModel) === undefined) {
        this.initNoChatText();
      } else {
        this.initContentChat();
        this.initContentMenu();
      }

      this.initNoMessagesText();
      this.initDates();

      this.initUserAddModal();
      this.initUserDeleteModal();

      const currentChatUsers = (newProps.state as Indexed<unknown>)?.chatUsers as ChatUserModel[];
      const listUsers = currentChatUsers?.map((user) => String(user.id));

      (this.children.userAddModal as Block).setProps({
        state: {
          ...((
            ((newProps.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
              .content as Indexed<unknown>
          ).userAddModal as ModalProps),
          list: listUsers
        }
      });

      (this.children.userDeleteModal as Block).setProps({
        state: {
          ...((
            ((newProps.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
              .content as Indexed<unknown>
          ).userDeleteModal as ModalProps),
          list: listUsers
        }
      });

      return true;
    }

    return false;
  }

  render(): string {
    return template;
  }
}

function mapMessagesAndMessageContentToProps(state: Indexed<MessageProps[] | MessageContent[]>): {
  messages?: MessageProps[];
  messagesArray?: MessageProps[];
  messageContent?: MessageContent[];
} {
  return {
    messages: state?.messages as MessageProps[],
    messagesArray: state?.messagesArray as MessageProps[],
    messageContent: state?.messageContent as MessageContent[]
  };
}

const withMessagesAndMessageContent = connect(
  mapMessagesAndMessageContentToProps as (state: Indexed<unknown>) => {
    messages?: MessageProps[];
    messagesArray?: MessageProps[];
    messageContent?: MessageContent[];
  }
);
