import './label.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import template from './label.hbs?raw';

export interface LabelProps extends Props {
  className?: string;
  for?: string;
  text?: string;
}

export class Label extends Block {
  constructor(props: LabelProps) {
    super(props);
  }

  componentDidUpdate(oldProps: LabelProps, newProps: LabelProps): boolean {
    if (oldProps.text !== newProps.text) {
      this.setProps({ text: newProps.text });
    }

    return true;
  }

  render(): string {
    return template;
  }
}
