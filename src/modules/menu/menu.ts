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
  state?: MenuProps;
  menuItemClickHandler?: Listener;
}

export class Menu extends Block {
  constructor(props: MenuProps) {
    super(props);
  }

  public menuItemClickHandler: (event: SubmitEvent) => void = (event) => {
    event.preventDefault();

    if (this.props.menuItemClickHandler) {
      const itemTarget = event.target as HTMLButtonElement;
      const itemText = itemTarget.textContent;

      (this.props.menuItemClickHandler as Listener)(itemText);
    }

    this.hide();
  };

  public initItems() {
    this.children.items = (this.props.items as MenuItem[])?.map((_item, index) => {
      const currentItem = (this.props.state as MenuProps)?.items as MenuItem[];

      const type = currentItem?.[index].type;
      const text = currentItem?.[index].text;
      const href = currentItem?.[index].href;

      return new Button({
        className: 'menu__button',
        type,
        text,
        settings: {
          withInternalID: true
        },
        buttonChild: new Svg({
          className: 'menu__icon',
          href
        }),
        events: {
          click: ((event: SubmitEvent) => this.menuItemClickHandler.call(this, event)) as Listener
        }
      });
    });
  }

  async componentDidMount() {
    try {
      this.initItems();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(oldProps: MenuProps, newProps: MenuProps): boolean {
    return oldProps.visible !== newProps.visible;
  }

  render(): string {
    return template;
  }
}
