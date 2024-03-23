import { Block } from '@/base/';
import type { Props } from '@/base/';
import { InputField } from '@/modules';
import { Button } from '@/components';
import { VALIDATION_RULES } from '@/consts';
import { Listener } from '@/base/EventBus';
import template from './profile-form.hbs?raw';

interface ProfilePageFormControl extends Record<string, string | boolean | undefined> {
  label?: string;
  name?: string;
  type?: string;
  disabled?: boolean;
  value?: string;
  error?: string;
}

interface ProfilePageButton extends Record<string, string | undefined> {
  type?: string;
  text?: string;
}

interface ProfileFormProps extends Props {
  className?: string;
  classNameFormControls?: string;
  classNameFormControl?: string;
  classNameInputField?: string;
  classNameLabel?: string;
  classNameInput?: string;
  classNameError?: string;
  classNameFormButtons?: string;
  classNameButton?: string;
  classNameLink?: string;
  controls?: ProfilePageFormControl[];
  buttons?: ProfilePageButton[];
  focusHandler?: Listener;
  submitHandler?: (...args: Record<string, string>[]) => void;
}

export class ProfileForm extends Block {
  constructor(props: ProfileFormProps) {
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

      if (name === 'newPassword') {
        this._password = value;
      }

      if (name === 'newPassword_again' && this._password !== value) {
        (this.children.buttons as Block[])?.map((button) =>
          button.setProps({
            disabled: true
          })
        );

        return 'Пароли не совпадают';
      }

      (this.children.buttons as Block[])?.map((button) =>
        button.setProps({
          disabled: false
        })
      );

      if (name !== 'newPassword_again') {
        this._formData[name] = value;
      }

      return '';
    };

    const submitHandler: (event: SubmitEvent) => void = (event) => {
      event.preventDefault();

      if (this.props.submitHandler) {
        (this.props.submitHandler as (...args: Record<string, string>[]) => string)(this._formData);
      }
    };

    this.children.controls = (this.props.controls as ProfilePageFormControl[])?.map(
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
          disabled: control.disabled,
          error: !!control.error,
          text: control.error,
          focusHandler,
          blurHandler,
          settings: {
            withInternalID: true
          }
        })
    );

    this.children.buttons = (this.props.buttons as ProfilePageButton[])?.map(
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

  render(): string {
    return template;
  }
}
