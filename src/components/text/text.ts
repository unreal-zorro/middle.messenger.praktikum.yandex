import './text.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import template from './text.hbs?raw';

interface TextProps extends Props {
  className?: string;
  text?: string;
}

export class Text extends Block {
  constructor(props: TextProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
