import './chat.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Avatar, Button, Svg, Text } from '@/components';
import template from './chat.hbs?raw';

// interface ChatAvatar extends Record<string, string | undefined> {
//   className?: string;
//   imgSrc?: string;
// }

// interface ChatText extends Record<string, string | undefined> {
//   text?: string;
// }

// interface ChatButton extends Record<string, string | undefined> {
//   type?: string;
// }

interface ChatProps extends Props {
  className?: string;
  id?: string;
  avatar?: string;
  title?: string;
  date?: string;
  text?: string;
  sender?: boolean;
  count?: string;
  active?: boolean;
  // avatarChild?: ChatAvatar;
  // dateChild?: ChatText;
  // countChild?: ChatText;
  // buttonChild?: ChatButton;
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super(props);

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
      })
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
