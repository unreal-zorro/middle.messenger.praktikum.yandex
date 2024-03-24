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

export interface MenuProps extends Props {
  className?: string;
  visible?: boolean;
  top: string;
  left: string;
  items?: MenuItem[];
}

export class Menu extends Block {
  constructor(props: MenuProps) {
    super(props);

    this.children.items = (this.props.items as MenuItem[])?.map(
      (item) =>
        new Button({
          className: 'menu__button',
          type: item.type,
          settings: {
            withInternalID: true
          },
          buttonChild: new Svg({
            className: 'menu__icon',
            href: item.href
          }),
          buttonChild2: new Span({
            className: 'menu__text',
            text: item.text
          })
        })
    );

    this.setTop(this.props.top as string);
    this.setLeft(this.props.left as string);
  }

  componentDidUpdate(oldProps: MenuProps, newProps: MenuProps): boolean {
    if (oldProps.top !== newProps.top) {
      this.setProps({ top: newProps.top });
      this.setTop(newProps.top);
    }

    if (oldProps.left !== newProps.left) {
      this.setProps({ left: newProps.left });
      this.setLeft(newProps.left);
    }

    return true;
  }

  setTop(value: string): void {
    this.getContent()!.style.top = value;
  }

  setLeft(value: string): void {
    this.getContent()!.style.left = value;
  }

  render(): string {
    return template;
  }
}
