import './list.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Text } from '@/components';
import { Menu } from '@/modules';
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
  chatMenuItems?: MenuItem[];
}

export class List extends Block {
  constructor(props: ListProps) {
    super(props);

    this.children.chats = (this.props.chats as ChatProps[])?.map(
      (chat) =>
        new Chat({
          id: chat.id,
          avatar: chat.avatar,
          title: chat.title,
          date: chat.date,
          text: chat.text,
          sender: chat.sender,
          count: chat.count,
          active: chat.active,
          settings: {
            withInternalID: true
          }
        })
    );

    this.children.text = new Text({
      className: 'list__text',
      text: 'Список чатов пуст',
      settings: {
        withInternalID: false
      }
    });

    this.children.menu = new Menu({
      className: 'list__chat-menu',
      items: this.props.chatMenuItems as MenuItem[],
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
