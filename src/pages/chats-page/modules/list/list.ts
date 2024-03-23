import './list.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Text } from '@/components';
import { Menu } from '@/modules';
import { Listener } from '@/base/EventBus';
import { Chat } from './modules';
import template from './list.hbs?raw';

export interface ChatProps extends Record<string, string | boolean | undefined> {
  id?: string;
  avatar?: string;
  title?: string;
  date?: string;
  text?: string;
  sender?: boolean;
  count?: string;
  active?: boolean;
}

export interface MenuItem extends Record<string, string | undefined> {
  type?: string;
  href?: string;
  text?: string;
}

interface ListProps extends Props {
  className?: string;
  chats?: ChatProps[];
  classNameChatMenu?: string;
  chatMenu?: MenuItem[];
}

export class List extends Block {
  constructor(props: ListProps) {
    super(props);

    const chatClickHandler: Listener<number> = (
      chatLeft: number,
      chatRight: number,
      chatTop: number,
      chatBottom: number
    ) => {
      const indent = 5;
      const menu = this.children.menu as Menu;

      // console.log((this.children.menu as Block).getContent()!.getBoundingClientRect());

      // (this.children.menu as Menu).setTop('200');

      // console.log((this.children.menu as Block).getContent()!.getBoundingClientRect());

      if (menu) {
        // menu.style.top = '0px';
        // menu.style.left = '0px';

        const { left, right, top, bottom, height } = menu.getContent()!.getBoundingClientRect();

        let topCoord: number = chatBottom + indent;
        const leftCoord: number = chatLeft;

        if (chatTop + height > document.documentElement.clientHeight) {
          topCoord = chatTop - height - indent;
        }

        // menu.style.top = `${topCoord + window.scrollY}px`;
        // menu.style.left = `${leftCoord + window.scrollX}px`;
        // menu.style.top = `100px`;
        // menu.style.left = `300px`;

        menu.setTop(`${topCoord + window.scrollY}px`);
        menu.setLeft(`${leftCoord + window.scrollX}px`);

        (this.children.menu as Block).setProps({
          visible: true
        });

        console.log(`${topCoord + window.scrollY}px`);
        console.log(`${leftCoord + window.scrollX}px`);
      }
    };

    if (this.props.chats && (this.props.chats as ChatProps[])?.length) {
      this.children.chats = (this.props.chats as ChatProps[])?.map(
        (chat) =>
          new Chat({
            className: 'list__item',
            id: chat.id,
            avatar: chat.avatar,
            title: chat.title,
            date: chat.date,
            text: chat.text,
            sender: chat.sender,
            count: chat.count,
            active: chat.active,
            clickHandler: chatClickHandler as Listener,
            settings: {
              withInternalID: true
            }
          })
      );
    }

    if (!this.props.chats || !(this.props.chats as ChatProps[])?.length) {
      this.children.text = new Text({
        className: 'list__text',
        text: 'Список чатов пуст',
        settings: {
          withInternalID: false
        }
      });
    }

    this.children.menu = new Menu({
      className: 'list__chat-menu',
      items: this.props.chatMenu as MenuItem[],
      visible: false,
      top: '0',
      left: '0',
      settings: {
        withInternalID: false
      }
    });
  }

  // componentDidUpdate(oldProps: LoginFormProps, newProps: LoginFormProps): boolean {
  //   if (oldProps.value !== newProps.value) {
  //     (this.children.inputChild as Block).setProps({ value: newProps.value });
  //   }

  //   if (oldProps.disabled !== newProps.disabled) {
  //     (this.children.inputChild as Block).setProps({ disabled: newProps.disabled });
  //   }

  //   if (oldProps.error !== newProps.error) {
  //     (this.children.inputChild as Block).setProps({ error: newProps.error });
  //     (this.children.inputChild as Block).setProps({ error: newProps.error });
  //   }

  //   if (oldProps.text !== newProps.text) {
  //     (this.children.inputChild as Block).setProps({ text: newProps.text });
  //   }

  //   return true;
  // }

  render(): string {
    return template;
  }
}
