import { Block } from '@/base/';
import type { Props } from '@/base/';
import { InputField } from '@/modules';
import { Button, Error, Input, Link } from '@/components';
import template from './profile-form.hbs?raw';

interface ProfilePageFormControl extends Record<string, string | undefined> {
  label?: string;
  name?: string;
  type?: string;
  value?: string;
  error?: string;
}

interface ProfilePageButton extends Record<string, string | undefined> {
  type?: string;
  text?: string;
  href?: string;
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
}

export class ProfileForm extends Block {
  constructor(props: ProfileFormProps) {
    super(props);

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
          disabled: false,
          error: !!control.error,
          text: control.error,
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
          settings: {
            withInternalID: false
          },
          buttonChild: new Link({
            className: this.props.classNameLink as string,
            href: button.href,
            text: button.text
          })
        })
    );

    this.children.inputChild = new Input({
      className: this.props.classNameInput as string,
      error: this.props.error as boolean,
      type: this.props.type as string,
      name: this.props.name as string,
      value: this.props.value as string,
      placeholder: '',
      disabled: this.props.disabled as boolean,
      settings: {
        withInternalID: false
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

  // componentDidUpdate(oldProps: LoginFormProps, newProps: LoginFormProps): boolean {
  //   if (oldProps.value !== newProps.value) {
  //     (this.children.inputChild as Block).setProps({ value: newProps.value });
  //   }

  //   if (oldProps.disabled !== newProps.disabled) {
  //     (this.children.inputChild as Block).setProps({ disabled: newProps.disabled });
  //   }

  //   if (oldProps.error !== newProps.error) {
  //     (this.children.inputChild as Block).setProps({ error: newProps.error });
  //     (this.children.inputChild as Block).setProps({ error: newProps.error });
  //   }

  //   if (oldProps.text !== newProps.text) {
  //     (this.children.inputChild as Block).setProps({ text: newProps.text });
  //   }

  //   return true;
  // }

  render(): string {
    return template;
  }
}
