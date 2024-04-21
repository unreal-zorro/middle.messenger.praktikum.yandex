import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Error, Input, Label } from '@/components';
import { Listener } from '@/base/EventBus';
import template from './input-field.hbs?raw';

export interface InputFieldProps extends Props {
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
  focusHandler?: Listener;
  blurHandler?: (...args: string[]) => string;
  changeHandler?: (...args: string[]) => string;
}

export class InputField extends Block {
  constructor(props: InputFieldProps) {
    super(props);

    const focusHandler = () => {
      (this.children.errorChild as Block).setProps({
        error: false,
        text: ''
      });

      if (this.props.focusHandler) {
        (this.props.focusHandler as Listener)();
      }
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

    const changeHandler = (target: HTMLInputElement): void => {
      if (target.getAttribute('type') === 'file' && (!target.files || target.files.length === 0)) {
        (this.children.errorChild as Block).setProps({
          error: true,
          text: 'Нужно выбрать файл'
        });

        if (this.props.label) {
          (this.children.labelChild as Label).setProps({
            className: this.props.classNameLabel,
            text: this.props.label
          });
        }

        return;
      }

      if (target.getAttribute('type') === 'file') {
        const { name } = target;
        let value = '';
        let type = '';

        if (target.files) {
          value = target.files[0]?.name;
          type = target.files[0]?.type;
        }

        if (this.props.changeHandler) {
          const errorMessage = (this.props.changeHandler as (...args: string[]) => string)(
            name,
            value,
            type
          );

          (this.children.errorChild as Error).setProps({
            error: !!errorMessage,
            text: errorMessage
          });

          if (!errorMessage) {
            (this.children.labelChild as Label).setProps({
              className: this.props.classNameLabel,
              text: value
            });
          } else if (this.props.label) {
            (this.children.labelChild as Label).setProps({
              className: this.props.classNameLabel,
              text: this.props.label
            });
          }
        }
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
        }) as Listener,
        change: ((event: Event) => {
          changeHandler.call(this, event?.target as HTMLInputElement);
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
      (this.children.inputChild as Input).setProps({ value: newProps.value });
    }

    if (oldProps.disabled !== newProps.disabled) {
      (this.children.inputChild as Input).setProps({ disabled: newProps.disabled });
    }

    if (oldProps.error !== newProps.error) {
      (this.children.inputChild as Input).setProps({ error: newProps.error });
      (this.children.errorChild as Error).setProps({ error: newProps.error });
    }

    if (oldProps.text !== newProps.text) {
      (this.children.errorChild as Error).setProps({ text: newProps.text });
    }

    if (oldProps.label !== newProps.label) {
      (this.children.labelChild as Label).setProps({ text: newProps.label });
    }

    if (oldProps.classNameLabel !== newProps.classNameLabel) {
      (this.children.labelChild as Label).setProps({ classNameLabel: newProps.classNameLabel });
    }

    return true;
  }

  render(): string {
    return template;
  }
}
