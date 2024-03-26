import './chat.scss';
import { Block } from '@/base/';
import type { Listener, Props } from '@/base';
import { Avatar, Button, Svg, Text } from '@/components';
import template from './chat.hbs?raw';

export interface ChatProps extends Props {
  className?: string;
  id?: string;
  avatar?: string;
  title?: string;
  date?: string;
  text?: string;
  sender?: boolean;
  count?: string;
  active?: boolean;
  clickHandler?: Listener;
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super(props);

    const clickHandler = (event: Event) => {
      if (this.props.clickHandler) {
        const chatId = this.props.id;
        const coords = (event.currentTarget as HTMLButtonElement).getBoundingClientRect();

        (this.props.clickHandler as Listener)(chatId, coords.left, coords.top, coords.height);
      }
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
      text: this.props.date as string,
      settings: {
        withInternalID: false
      }
    });

    if (this.props.count) {
      this.children.countChild = new Text({
        className: 'chat__count',
        text: this.props.count as string,
        settings: {
          withInternalID: false
        }
      });
    }

    this.children.buttonChild = new Button({
      className: 'chat__settings-button button',
      type: 'button',
      settings: {
        withInternalID: false
      },
      buttonChild: new Svg({
        className: 'chat__settings-icon',
        href: '#icon-settings'
      }),
      events: {
        click: ((event: Event) => clickHandler.call(this, event)) as Listener
      }
    });
  }

  componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
    if (oldProps.avatar !== newProps.avatar) {
      (this.children.avatarChild as Avatar).setProps({ value: newProps.avatar });
    }

    if (oldProps.date !== newProps.date) {
      (this.children.dateChild as Text).setProps({ error: newProps.date });
    }

    if (oldProps.count !== newProps.count) {
      (this.children.countChild as Text).setProps({ text: newProps.count });
    }

    return true;
  }

  render(): string {
    return template;
  }
}
