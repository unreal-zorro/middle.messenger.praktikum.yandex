import { Block } from '@/base/';
import type { Props } from '@/base/';
import { InputField } from '@/modules';
import type { InputFieldProps } from '@/modules';
import { Button } from '@/components';
import type { ButtonProps } from '@/components';
import { VALIDATION_RULES } from '@/consts';
import { isEqual } from '@/utils';
import { Listener } from '@/base/EventBus';
import template from './login-form.hbs?raw';

export interface LoginFormProps extends Props {
  className?: string;
  classNameFormControls?: string;
  classNameFormControl?: string;
  classNameInputField?: string;
  classNameLabel?: string;
  classNameInput?: string;
  classNameError?: string;
  classNameButton?: string;
  classNameLink?: string;
  controls?: InputFieldProps[];
  buttons?: ButtonProps[];
  focusHandler?: Listener;
  submitHandler?: (...args: Record<string, string>[]) => void;
}

export class LoginForm extends Block {
  constructor(props: LoginFormProps) {
    super(props);

    const focusHandler = () => {
      (this.children.buttons as Block[])?.map((button) =>
        button.setProps({
          disabled: true
        })
      );
    };

    const blurHandler: (...args: string[]) => string = (name, value) => {
      const { regExp } = VALIDATION_RULES[name];
      const isValid = regExp.test(value);

      if (!isValid) {
        (this.children.buttons as Block[])?.map((button) =>
          button.setProps({
            disabled: true
          })
        );

        const { message } = VALIDATION_RULES[name];
        return message;
      }

      if (name === 'password') {
        this._password = value;
      }

      if (name === 'password_again' && this._password !== value) {
        (this.children.buttons as Block[])?.map((button) =>
          button.setProps({
            disabled: false
          })
        );

        return 'Пароли не совпадают';
      }

      (this.children.buttons as Block[])?.map((button) =>
        button.setProps({
          disabled: false
        })
      );

      if (name !== 'password_again') {
        this._formData[name] = value;
      }

      return '';
    };

    const submitHandler: (event: SubmitEvent) => void = (event) => {
      event.preventDefault();

      (this.children.controls as InputField[]).forEach((control) => {
        const element = control.getContent()?.querySelector('input') as HTMLInputElement;
        const elementName = element?.getAttribute('name') as string;
        const elementValue = element?.value;

        if (elementName !== 'password_again') {
          this._formData[elementName] = elementValue;
        }
      });

      if (this.props.submitHandler) {
        (this.props.submitHandler as (...args: Record<string, string>[]) => string)(this._formData);
      }
    };

    this.children.controls = (this.props.controls as InputFieldProps[])?.map(
      (control) =>
        new InputField({
          className: this.props.classNameInputField as string,
          classNameLabel: this.props.classNameLabel as string,
          classNameInput: this.props.classNameInput as string,
          classNameError: this.props.classNameError as string,
          name: control.name,
          label: control.label,
          type: control.type,
          value: control.value,
          placeholder: '',
          disabled: false,
          error: control.error,
          text: control.text,
          focusHandler,
          blurHandler,
          settings: {
            withInternalID: true
          }
        })
    );

    this.children.buttons = (this.props.buttons as ButtonProps[])?.map(
      (button) =>
        new Button({
          className: this.props.classNameButton as string,
          type: button.type,
          text: button.text,
          disabled: true,
          settings: {
            withInternalID: false
          },
          events: {
            click: ((event: SubmitEvent) => submitHandler.call(this, event)) as Listener
          }
        })
    );
  }

  _password = '';

  _formData: Record<string, string> = {};

  componentDidUpdate(oldProps: LoginFormProps, newProps: LoginFormProps): boolean {
    if (!isEqual(oldProps as Indexed<unknown>, newProps as Indexed<unknown>)) {
      return true;
    }

    return false;
  }

  render(): string {
    return template;
  }
}
