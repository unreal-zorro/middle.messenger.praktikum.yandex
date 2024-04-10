import './content.scss';
import { Block } from '@/base';
import type { Listener, Props } from '@/base';
import type { CurrentChat } from '@/entities';
import { Avatar, Button, Svg, Text } from '@/components';
import { Menu, Modal } from '@/modules';
import type { MenuProps, ModalProps } from '@/modules';
import { CONTENT_MENU_ITEMS, VALIDATION_RULES } from '@/consts';
import { isEqual } from '@/utils';
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
}

export class Content extends Block {
  constructor(props: ContentProps) {
    super(props);

    const clickHandler: Listener<Event> = (event: Event) => {
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

    const contentMenuItemClickHandler: Listener<string> = (text) => {
      const currentChatId = (this.props.currentChat as CurrentChat).id;

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
    };

    const submitUserAddModalHandler: (...args: Record<string, string>[]) => void = (formData) => {
      let isValid = true;

      Object.entries(formData).forEach(([key, value]) => {
        const { regExp } = VALIDATION_RULES[key];
        isValid = isValid && regExp.test(value);
      });

      if (isValid) {
        this.setProps({
          visibleUserAddModal: false
        });

        console.log(formData);
      } else {
        console.log('Invalid form data');
      }
    };

    const submitUserDeleteModalHandler: (...args: Record<string, string>[]) => void = (
      formData
    ) => {
      let isValid = true;

      Object.entries(formData).forEach(([key, value]) => {
        const { regExp } = VALIDATION_RULES[key];
        isValid = isValid && regExp.test(value);
      });

      if (isValid) {
        this.setProps({
          visibleUserDeleteModal: false
        });

        console.log(formData);
      } else {
        console.log('Invalid form data');
      }
    };

    const closeUserAddModalHandler: Listener = () => {
      this.setProps({
        visibleUserAddModal: false
      });
    };

    const closeUserDeleteModalHandler: Listener = () => {
      this.setProps({
        visibleUserDeleteModal: false
      });
    };

    if (this.props.currentChat && !isEqual(this.props.currentChat as PlainObject, {})) {
      this.children.contentChat = new ContentChat({
        settings: {
          withInternalID: false
        },
        avatar: new Avatar({
          className: 'content__avatar avatar_no-edit',
          imgSrc: (this.props.currentChat as CurrentChat)?.avatar as string,
          settings: {
            withInternalID: false
          }
        }),
        title: new Text({
          className: 'content__title',
          text: (this.props.currentChat as CurrentChat)?.title as string,
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
            click: ((event: Event) => clickHandler.call(this, event)) as Listener
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
    } else {
      this.children.noChatText = new Text({
        className: 'content__text',
        text: 'Выберите чат, чтобы отправить сообщение',
        settings: {
          withInternalID: false
        }
      });
    }

    this.children.contentMenu = new Menu({
      dataMenu: 'contentMenu',
      className: 'content__content-menu',
      items: (this.props.contentMenu as MenuProps).items,
      visible: this.props.visibleContentMenu as boolean,
      menuItemClickHandler: contentMenuItemClickHandler as Listener,
      settings: {
        withInternalID: false
      }
    });

    this.children.userAddModal = new Modal({
      className: '',
      type: 'image',
      header: (this.props.userAddModal as ModalProps)?.header,
      controls: (this.props.userAddModal as ModalProps)?.controls,
      buttons: (this.props.userAddModal as ModalProps)?.buttons,
      visible: this.props.visibleUserAddModal as boolean,
      submitHandler: submitUserAddModalHandler as Listener,
      closeHandler: closeUserAddModalHandler,
      settings: {
        withInternalID: false
      }
    });

    this.children.userDeleteModal = new Modal({
      className: '',
      type: 'image',
      header: (this.props.userDeleteModal as ModalProps)?.header,
      controls: (this.props.userDeleteModal as ModalProps)?.controls,
      buttons: (this.props.userDeleteModal as ModalProps)?.buttons,
      visible: this.props.visibleUserDeleteModal as boolean,
      submitHandler: submitUserDeleteModalHandler as Listener,
      closeHandler: closeUserDeleteModalHandler,
      settings: {
        withInternalID: false
      }
    });
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

    return false;
  }

  render(): string {
    return template;
  }
}
