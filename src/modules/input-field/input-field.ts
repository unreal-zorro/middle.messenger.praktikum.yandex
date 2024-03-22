import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Error, Input, Label } from '@/components';
import { Listener } from '@/base/EventBus';
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
  blurHandler?: (...args: string[]) => string;
}

export class InputField extends Block {
  constructor(props: InputFieldProps) {
    super(props);

    const focusHandler = () => {
      (this.children.errorChild as Block).setProps({
        error: false,
        text: ''
      });
    };

    const blurHandler = (name: string, value: string) => {
      if (this.props.blurHandler) {
        const isValid = (this.props.blurHandler as (...args: string[]) => string)(name, value);

        (this.children.inputChild as Block).setProps({
          error: !!isValid,
          value
        });

        (this.children.errorChild as Block).setProps({
          error: !!isValid,
          text: isValid
        });
      }
    };

    this.children.labelChild = new Label({
      className: this.props.classNameLabel as string,
      for: this.props.name as string,
      text: this.props.label as string,
      settings: {
        withInternalID: false
      }
    });

    this.children.inputChild = new Input({
      className: this.props.classNameInput as string,
      error: this.props.error as boolean,
      type: this.props.type as string,
      name: this.props.name as string,
      value: this.props.value as string,
      placeholder: this.props.placeholder as string,
      disabled: this.props.disabled as boolean,
      settings: {
        withInternalID: false
      },
      events: {
        focus: () => focusHandler.call(this),
        blur: ((event: Event) => {
          blurHandler.call(
            this,
            (event?.target as HTMLInputElement).name,
            (event?.target as HTMLInputElement).value
          );
        }) as Listener
      }
    });

    this.children.errorChild = new Error({
      className: this.props.classNameError as string,
      error: this.props.error as boolean,
      text: this.props.text as string,
      settings: {
        withInternalID: false
      }
    });
  }

  componentDidUpdate(oldProps: InputFieldProps, newProps: InputFieldProps): boolean {
    if (oldProps.value !== newProps.value) {
      (this.children.inputChild as Block).setProps({ value: newProps.value });
    }

    if (oldProps.disabled !== newProps.disabled) {
      (this.children.inputChild as Block).setProps({ disabled: newProps.disabled });
    }

    if (oldProps.error !== newProps.error) {
      (this.children.inputChild as Block).setProps({ error: newProps.error });
      (this.children.inputChild as Block).setProps({ error: newProps.error });
    }

    if (oldProps.text !== newProps.text) {
      (this.children.inputChild as Block).setProps({ text: newProps.text });
    }

    return true;
  }

  render(): string {
    return template;
  }
}
