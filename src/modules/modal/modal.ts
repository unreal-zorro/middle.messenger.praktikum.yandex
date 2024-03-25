import './modal.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Button, Span, Svg } from '@/components';
import template from './modal.hbs?raw';

interface MenuItem extends Record<string, string | undefined> {
  type?: string;
  href?: string;
  text?: string;
}

export interface ModalProps extends Props {
  className?: string;
  items?: MenuItem[];
}

export class Modal extends Block {
  constructor(props: ModalProps) {
    super(props);

    this.children.items = (this.props.items as MenuItem[])?.map(
      (item) =>
        new Button({
          className: 'menu__button',
          type: item.type,
          settings: {
            withInternalID: false
          },
          svgChild: new Svg({
            className: 'menu__icon',
            href: item.href
          }),
          spanChild: new Span({
            className: 'menu__text',
            text: item.text
          })
        })
    );
  }

  render(): string {
    return template;
  }
}
