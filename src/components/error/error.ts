import './error.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import template from './error.hbs?raw';

interface ErrorProps extends Props {
  className?: string;
  error?: boolean;
  text?: string;
}

export class Error extends Block {
  constructor(props: ErrorProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
