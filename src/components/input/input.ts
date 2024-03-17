import './input.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import template from './input.hbs?raw';

interface InputProps extends Props {
  className?: string;
  error?: boolean;
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
