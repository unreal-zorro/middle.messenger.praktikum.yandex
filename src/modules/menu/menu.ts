import './menu.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Button, Span, Svg } from '@/components';
import template from './menu.hbs?raw';

interface MenuItem extends Record<string, string | undefined> {
  type?: string;
  href?: string;
  text?: string;
}

interface MenuProps extends Props {
  className?: string;
  items?: MenuItem[];
}

export class Menu extends Block {
  constructor(props: MenuProps) {
    super(props);

    this.children.buttons = (this.props.items as MenuItem[])?.map(
      (button) =>
        new Button({
          className: 'menu__button',
          type: button.type,
          settings: {
            withInternalID: false
          },
          svgChild: new Svg({
            className: 'menu__icon',
            href: button.href
          }),
          spanChild: new Span({
            className: 'menu__text',
            text: button.text
          })
        })
    );
  }

  // componentDidUpdate(oldProps: InputFieldProps, newProps: InputFieldProps): boolean {
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
