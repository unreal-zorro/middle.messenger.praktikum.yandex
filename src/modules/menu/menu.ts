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
  dataMenu?: string;
  className?: string;
  visible?: boolean;
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
  }

  componentDidUpdate(oldProps: MenuProps, newProps: MenuProps): boolean {
    return oldProps.visible !== newProps.visible;
  }

  render(): string {
    return template;
  }
}
