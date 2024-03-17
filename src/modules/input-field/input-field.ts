import { Block } from '@/base/';
import type { Props } from '@/base/';
import template from './input-field.hbs?raw';

interface InputFieldProps extends Props {
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
  classNameError?: string;
  name?: string;
  label?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  text?: string;
}

export class InputField extends Block {
  constructor(props: InputFieldProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
