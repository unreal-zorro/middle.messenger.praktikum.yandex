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

    const clickHandler = (element: HTMLButtonElement) => {
      if (this.props.clickHandler) {
        const {
          left: chatLeft,
          right: chatRight,
          top: chatTop,
          bottom: chatBottom
        } = element.getBoundingClientRect();

        (this.props.clickHandler as Listener)(
          Number(this.props.id),
          chatLeft,
          chatRight,
          chatTop,
          chatBottom
        );
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
        click: ((event: Event) => {
          clickHandler.call(this, event?.target as HTMLButtonElement);
        }) as Listener
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
