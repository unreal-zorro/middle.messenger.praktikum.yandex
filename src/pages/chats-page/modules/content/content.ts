import './content.scss';
import { Block } from '@/base';
import type { Listener, Props } from '@/base';
import type { CurrentChat } from '@/entities';
import { Avatar, Button, Svg, Text } from '@/components';
import { Menu, Modal } from '@/modules';
import type { MenuProps, ModalProps } from '@/modules';
import { CONTENT_MENU_ITEMS, VALIDATION_RULES } from '@/consts';
import { isEqual } from '@/utils';
import { ChatModel, ChatUserModel } from '@/models';
import { ContentChat, EqualDatesMessages } from './modules';
import type { MessageContent, MessageProps } from './modules';
import template from './content.hbs?raw';

export interface ContentProps extends Props {
  className?: string;
  dates?: string[];
  messages?: MessageProps[];
  messageContent?: MessageContent[];
  currentChat?: CurrentChat;
  classNameContentMenu?: string;
  contentMenu?: MenuProps;
  visibleContentMenu?: boolean;
  userAddModal: ModalProps;
  visibleUserAddModal?: boolean;
  userDeleteModal: ModalProps;
  visibleUserDeleteModal?: boolean;
  state?: Indexed<ChatModel[] | ChatUserModel[] | number | boolean | Indexed<unknown>>;
  chatUsersAddHandler: Listener;
  chatUsersDeleteHandler: Listener;
}

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
      this.props?.state as Indexed<Indexed<unknown> | ChatModel | number | boolean>
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
        this.props?.state as Indexed<Indexed<unknown> | ChatModel | number | boolean>
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
        this.props?.state as Indexed<Indexed<unknown> | ChatModel | number | boolean>
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
    // if (this.props.currentChat && !isEqual(this.props.currentChat as PlainObject, {})) {
    const activeChat = (
      this.props?.state as Indexed<Indexed<unknown> | ChatModel | number | boolean>
    )?.activeChat as ChatModel;

    if (activeChat) {
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

      if (this.props.dates && (this.props.dates as string[])?.length) {
        this.children.dates = (this.props.dates as string[])?.map((dateItem) => {
          const messages: MessageProps[] = (this.props.messages as MessageProps[])?.filter(
            (messageItem) => dateItem === messageItem.date
          );
          const messageContent: MessageContent[] = [];
          messages?.forEach((messageItem) => {
            const content = (this.props.messageContent as MessageContent[])?.filter(
              (messageContentItem) => messageItem.id === messageContentItem.messageId
            );
            messageContent.push(...content);
          });

          return new EqualDatesMessages({
            className: 'content__list-item',
            date: dateItem,
            messages,
            messageContent,
            settings: {
              withInternalID: true
            }
          });
        });
      } else {
        this.children.noMessagesText = new Text({
          className: 'content__text',
          text: 'В выбранном чате отсутствуют сообщения',
          settings: {
            withInternalID: false
          }
        });
      }
    } else if (!(activeChat as ChatModel)?.id) {
      this.children.noChatText = new Text({
        className: 'content__text',
        text: 'Выберите чат, чтобы отправить сообщение',
        settings: {
          withInternalID: false
        }
      });
    }
  }

  // public initDates() {
  //   // if (this.props.currentChat && !isEqual(this.props.currentChat as PlainObject, {})) {
  //   const activeChat = (
  //     this.props?.state as Indexed<Indexed<unknown> | ChatModel | number | boolean>
  //   )?.activeChat as ChatModel;

  //   if (activeChat) {
  //     if (this.props.dates && (this.props.dates as string[])?.length) {
  //       this.children.dates = (this.props.dates as string[])?.map((dateItem) => {
  //         const messages: MessageProps[] = (this.props.messages as MessageProps[])?.filter(
  //           (messageItem) => dateItem === messageItem.date
  //         );
  //         const messageContent: MessageContent[] = [];
  //         messages?.forEach((messageItem) => {
  //           const content = (this.props.messageContent as MessageContent[])?.filter(
  //             (messageContentItem) => messageItem.id === messageContentItem.messageId
  //           );
  //           messageContent.push(...content);
  //         });

  //         return new EqualDatesMessages({
  //           className: 'content__list-item',
  //           date: dateItem,
  //           messages,
  //           messageContent,
  //           settings: {
  //             withInternalID: true
  //           }
  //         });
  //       });
  //     }
  //   }
  // }

  // public initNoMessagesText() {
  //   const activeChat = (
  //     this.props?.state as Indexed<Indexed<unknown> | ChatModel | number | boolean>
  //   )?.activeChat as ChatModel;

  //   if (!activeChat) {
  //     if (!this.props.dates || !(this.props.dates as string[])?.length) {
  //       this.children.noMessagesText = new Text({
  //         className: 'content__text',
  //         text: 'В выбранном чате отсутствуют сообщения',
  //         settings: {
  //           withInternalID: false
  //         }
  //       });
  //     }
  //   }
  // }

  // public initNoChatText() {
  //   const activeChat = (
  //     this.props?.state as Indexed<Indexed<unknown> | ChatModel | number | boolean>
  //   )?.activeChat as ChatModel;

  //   if (!activeChat) {
  //     this.children.noChatText = new Text({
  //       className: 'content__text',
  //       text: 'Выберите чат, чтобы отправить сообщение',
  //       settings: {
  //         withInternalID: false
  //       }
  //     });
  //   }
  // }

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
    // const modalState = {
    //   ...((
    //     ((this.props.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
    //       .newMessage as Indexed<unknown>
    //   ).userAddModal as ModalProps),
    //   list: []
    // };

    const modalState = (
      ((this.props.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
        .newMessage as Indexed<unknown>
    ).userAddModal as ModalProps;

    this.children.userAddModal = new Modal({
      className: '',
      type: 'image',
      header: (this.props.userAddModal as ModalProps)?.header,
      controls: (this.props.userAddModal as ModalProps)?.controls,
      buttons: (this.props.userAddModal as ModalProps)?.buttons,
      visible: this.props.visibleUserAddModal as boolean,
      // list: [],
      state: modalState,
      submitHandler: this.submitUserAddModalHandler as Listener,
      closeHandler: this.closeUserAddModalHandler,
      settings: {
        withInternalID: false
      }
    });
  }

  public initUserDeleteModal() {
    // const modalState = {
    //   ...((
    //     ((this.props.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
    //       .newMessage as Indexed<unknown>
    //   ).userDeleteModal as ModalProps),
    //   list: []
    // };

    const modalState = (
      ((this.props.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
        .newMessage as Indexed<unknown>
    ).userDeleteModal as ModalProps;

    this.children.userDeleteModal = new Modal({
      className: '',
      type: 'image',
      header: (this.props.userDeleteModal as ModalProps)?.header,
      controls: (this.props.userDeleteModal as ModalProps)?.controls,
      buttons: (this.props.userDeleteModal as ModalProps)?.buttons,
      visible: this.props.visibleUserDeleteModal as boolean,
      // list: [],
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
      // this.initDates();
      // this.initNoMessagesText();
      // this.initNoChatText();
      this.initContentMenu();
      this.initUserAddModal();
      this.initUserDeleteModal();

      (this.children.userAddModal as Block).setProps({
        state: (
          ((this.props.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
            .content as Indexed<unknown>
        ).userAddModal as ModalProps
      });

      (this.children.userDeleteModal as Block).setProps({
        state: (
          ((this.props.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
            .content as Indexed<unknown>
        ).userDeleteModal as ModalProps
      });
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
      // if ((newProps.state as Indexed<unknown>).activeChat as Indexed<unknown>) {
      this.initContentChat();
      // } else {
      // this.initNoChatText();
      // }

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

  render(): string {
    if ((this.props.state as Indexed<unknown>).isLoading) {
      return `
        <section class="content ${this.props.className}">
          Загрузка...
        </section>`;
    }

    return template;
  }
}
