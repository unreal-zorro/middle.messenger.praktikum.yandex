import './header.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import template from './header.hbs?raw';

interface HeaderProps extends Props {
  className?: string;
  text?: string;
}

export class Header extends Block {
  constructor(props: HeaderProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
