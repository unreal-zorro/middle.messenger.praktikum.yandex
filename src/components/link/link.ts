import './link.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import template from './link.hbs?raw';

interface LinkProps extends Props {
  className?: string;
  href?: string;
  text?: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
