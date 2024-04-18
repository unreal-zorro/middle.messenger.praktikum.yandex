import './header.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import template from './header.hbs?raw';

export interface HeaderProps extends Props {
  className?: string;
  text?: string;
}

export class Header extends Block {
  constructor(props: HeaderProps) {
    super(props);
  }

  componentDidUpdate(oldProps: HeaderProps, newProps: HeaderProps): boolean {
    if (oldProps.text !== newProps.text) {
      this.setProps({ text: newProps.text });
    }

    return true;
  }

  render(): string {
    return template;
  }
}
