import { Block } from '@/base/';
import type { Props } from '@/base/';
import template from './form.hbs?raw';

interface FormProps extends Props {
  className?: string;
}

export class Form extends Block {
  constructor(props: FormProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
