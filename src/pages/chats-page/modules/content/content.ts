import './content.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Button, Svg, Text } from '@/components';
import { Avatar } from '@/modules';
import { EqualDatesMessages } from './modules';
import template from './content.hbs?raw';

export interface MessageContent extends Record<string, string | boolean | undefined> {
  messageId?: string;
  isText?: boolean;
  isImage?: boolean;
  data?: string;
}

export interface OneMessage extends Record<string, string | boolean | undefined> {
  id?: string;
  name?: string;
  date?: string;
  time?: string;
  check?: boolean;
}

export interface CurrentChat extends Record<string, string | undefined> {
  id?: string;
  avatar?: string;
  title?: string;
}

export interface MenuItem extends Record<string, string | undefined> {
  type?: string;
  href?: string;
  text?: string;
}

export interface ModalItem extends Record<string, string | boolean | undefined> {
  type?: string;
  cancel?: boolean;
  text?: string;
}

interface ContentProps extends Props {
  className?: string;
  dates?: string[];
  messages?: OneMessage[];
  messageContent?: MessageContent[];
  currentChat?: CurrentChat;
  classNameAttachMenu?: string;
  attachMenuItems?: MenuItem[];
  classNameUserMenu?: string;
  userMenuItems?: MenuItem[];
  classNameModal?: string;
  modalTitle?: string;
  modalItems?: ModalItem[];
}

export class Content extends Block {
  constructor(props: ContentProps) {
    super(props);

    // this.children.avatar = new Avatar({
    //   className: 'content__avatar avatar_no-edit',
    //   imgSrc: (this.props.currentChat as CurrentChat)?.avatar as string,
    //   settings: {
    //     withInternalID: false
    //   }
    // });

    // this.children.title = new Text({
    //   className: 'content__title',
    //   text: (this.props.currentChat as CurrentChat)?.title as string,
    //   settings: {
    //     withInternalID: false
    //   }
    // });

    // this.children.button = new Button({
    //   className: 'content__button',
    //   type: 'button',
    //   settings: {
    //     withInternalID: false
    //   },
    //   buttonChild: new Svg({
    //     className: 'content__icon',
    //     href: '#icon-triple'
    //   })
    // });

    // if (this.props.dates && (this.props.dates as string[])?.length) {
    //   this.children.equalDatesMessages = (this.props.dates as string[])?.map((dateItem) => {
    //     const messages: OneMessage[] = (this.props.messages as OneMessage[])?.filter(
    //       (messageItem) => dateItem === messageItem.date
    //     );
    //     const messageContent: MessageContent[] = [];
    //     messages?.forEach((messageItem) => {
    //       const content = (this.props.messageContent as MessageContent[])?.filter(
    //         (messageContentItem) => messageItem.id === messageContentItem.messageId
    //       );
    //       messageContent.push(...content);
    //     });

    //     return new EqualDatesMessages({
    //       date: dateItem,
    //       // messages: messages as OneMessage[],
    //       // messageContent,
    //       settings: {
    //         withInternalID: true
    //       }
    //     });
    //   });
    // }

    // this.children.equalDatesMessages = (this.props.dates as string[])?.map(
    //   (dateItem) =>
    //     new EqualDatesMessages({
    //       date: dateItem,
    //       // messages: messages as OneMessage[],
    //       // messageContent,
    //       settings: {
    //         withInternalID: true
    //       }
    //     })
    // );

    this.children.equalDatesMessages = (this.props.dates as string[])?.map(
      (dateItem) =>
        new Text({
          text: dateItem,
          settings: {
            withInternalID: true
          }
        })
    );

    // if (!this.props.dates || !(this.props.dates as string[])?.length) {
    //   this.children.noMessagesText = new Text({
    //     className: 'content__text',
    //     text: 'В выбранном чате отсутствуют сообщения',
    //     settings: {
    //       withInternalID: false
    //     }
    //   });
    // }

    // if (!this.props.currentChat) {
    //   this.children.noChatText = new Text({
    //     className: 'content__text',
    //     text: 'Выберите чат, чтобы отправить сообщение',
    //     settings: {
    //       withInternalID: false
    //     }
    //   });
    // }

    // this.children.equalDatesMessages = (this.props.messages as OneMessage[])?.map(
    //   (message) =>
    //     new EqualDatesMessages({
    //       id: message.id,
    //       name: message.name,
    //       time: message.time,
    //       check: message.check,
    //       content: (this.props.messageContent as MessageContentItem[])?.map((content) => {
    //         if (message.id === content.messageId) {
    //           return content;
    //         }

    //         return {};
    //       }),
    //       settings: {
    //         withInternalID: true
    //       }
    //     })
    // );

    // this.children.attachMenu = new Menu({
    //   className: 'content__attach-menu',
    //   items: this.props.attachMenuItems as MenuItem[],
    //   settings: {
    //     withInternalID: false
    //   }
    // });

    // this.children.userMenu = new Menu({
    //   className: 'content__user-menu',
    //   items: this.props.userMenuItems as MenuItem[],
    //   settings: {
    //     withInternalID: false
    //   }
    // });
  }

  render(): string {
    return template;
  }
}
