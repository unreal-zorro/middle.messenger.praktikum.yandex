import './menu.scss';
import { Block } from '@/base';
import type { Listener, Props } from '@/base';
import { Button, Svg } from '@/components';
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
  menuItemClickHandler?: Listener;
}

export class Menu extends Block {
  constructor(props: MenuProps) {
    super(props);

    const menuItemClickHandler: (event: SubmitEvent) => void = (event) => {
      event.preventDefault();

      if (this.props.menuItemClickHandler) {
        const itemTarget = event.target as HTMLButtonElement;
        const itemText = itemTarget.textContent;

        (this.props.menuItemClickHandler as Listener)(itemText);
      }

      this.hide();
    };

    this.children.items = (this.props.items as MenuItem[])?.map(
      (item) =>
        new Button({
          className: 'menu__button',
          type: item.type,
          text: item.text,
          settings: {
            withInternalID: true
          },
          buttonChild: new Svg({
            className: 'menu__icon',
            href: item.href
          }),
          events: {
            click: ((event: SubmitEvent) => menuItemClickHandler.call(this, event)) as Listener
          }
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
