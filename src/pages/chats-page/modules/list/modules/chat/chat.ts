import './chat.scss';
import { Block } from '@/base/';
import type { Listener, Props } from '@/base';
import { Avatar, Button, Svg, Text } from '@/components';
import template from './chat.hbs?raw';

export interface ChatProps extends Props {
  className?: string;
  id?: string;
  avatar?: string | null;
  title?: string;
  lastMessageTime?: string;
  lastMessageContent?: string;
  createdBy?: boolean;
  unreadCount?: number;
  active?: boolean;
  chatButtonClickHandler?: Listener;
  chatClickHandler?: Listener;
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super(props);

    const chatButtonClickHandler: Listener<Event> = (event: Event) => {
      if (this.props.chatButtonClickHandler) {
        const chatId = this.props.id;
        const coords = (event.currentTarget as HTMLButtonElement).getBoundingClientRect();

        (this.props.chatButtonClickHandler as Listener)(
          chatId,
          coords.left,
          coords.top,
          coords.height
        );
      }
    };

    const chatClickHandler: Listener<Event> = (event: Event) => {
      if (event.target && (this.children.buttonChild as Button)) {
        const isChatButton =
          (event.target as HTMLButtonElement).getAttribute('data-button') === 'chatButton';
        const isChatButtonSvg =
          (event.target as SVGAElement).getAttribute('data-svg') === 'chatSvg';

        if (!isChatButton && !isChatButtonSvg) {
          if (this.props.chatClickHandler) {
            const chatId = this.props.id;

            (this.props.chatClickHandler as Listener)(chatId);
          }
        }
      }
    };

    this.props.events = {
      click: ((event: Event) => chatClickHandler(event)) as Listener
    };

    this.children.avatarChild = new Avatar({
      className: 'chat__avatar avatar_no-edit',
      imgSrc: this.props.avatar as string,
      settings: {
        withInternalID: false
      }
    });

    this.children.dateChild = new Text({
      className: 'chat__date',
      text: this.props.lastMessageTime as string,
      settings: {
        withInternalID: false
      }
    });

    if (this.props.count) {
      this.children.countChild = new Text({
        className: 'chat__count',
        text: this.props.unreadCount as string,
        settings: {
          withInternalID: false
        }
      });
    }

    this.children.buttonChild = new Button({
      dataButton: 'chatButton',
      className: 'chat__settings-button',
      type: 'button',
      settings: {
        withInternalID: false
      },
      buttonChild: new Svg({
        dataSvg: 'chatSvg',
        className: 'chat__settings-icon',
        href: '#icon-settings'
      }),
      events: {
        click: ((event: Event) => chatButtonClickHandler.call(this, event)) as Listener
      }
    });
  }

  componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
    if (oldProps.avatar !== newProps.avatar) {
      (this.children.avatarChild as Avatar).setProps({ value: newProps.avatar });
    }

    if (oldProps.lastMessageTime !== newProps.lastMessageTime) {
      (this.children.dateChild as Text).setProps({ error: newProps.lastMessageTime });
    }

    if (oldProps.unreadCount !== newProps.unreadCount) {
      (this.children.countChild as Text).setProps({ text: newProps.unreadCount });
    }

    return true;
  }

  render(): string {
    return template;
  }
}
