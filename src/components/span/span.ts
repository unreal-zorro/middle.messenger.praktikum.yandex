import { Block } from '@/base/';
import type { Props } from '@/base/';
import template from './span.hbs?raw';

export interface SpanProps extends Props {
  className?: string;
  text?: string;
}

export class Span extends Block {
  constructor(props: SpanProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
