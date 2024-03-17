import './button.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import template from './button.hbs?raw';

interface ButtonProps extends Props {
  className?: string;
  cancel?: boolean;
  type?: string;
  text?: string;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
