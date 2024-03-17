import './label.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import template from './label.hbs?raw';

interface LabelProps extends Props {
  className?: string;
  for?: string;
  text?: string;
}

export class Label extends Block {
  constructor(props: LabelProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
