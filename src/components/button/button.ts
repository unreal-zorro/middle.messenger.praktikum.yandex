import './button.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import template from './button.hbs?raw';

export interface ButtonProps extends Props {
  className?: string;
  cancel?: boolean;
  type?: string;
  text?: string;
  disabled?: boolean;
  dataButton?: string;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render(): string {
    return template;
  }

  componentDidUpdate(oldProps: ButtonProps, newProps: ButtonProps): boolean {
    if (oldProps.disabled !== newProps.disabled) {
      this.setProps({ disabled: newProps.disabled });
      return true;
    }

    return false;
  }
}
