import './modal.scss';
import { Block } from '@/base/';
import type { Listener, Props } from '@/base/';
import { Button, Svg } from '@/components';
import type { ButtonProps } from '@/components';
import { VALIDATION_RULES } from '@/consts';
import { InputField } from '../input-field';
import type { InputFieldProps } from '../input-field';
import template from './modal.hbs?raw';

export interface ModalProps extends Props {
  className?: string;
  header?: string;
  controls?: InputFieldProps[];
  buttons?: ButtonProps[];
  submitHandler?: Listener;
}

export class Modal extends Block {
  constructor(props: ModalProps) {
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

      (this.children.buttons as Block[])?.map((button) =>
        button.setProps({
          disabled: false
        })
      );

      return '';
    };

    const submitHandler: (event: SubmitEvent) => void = (event) => {
      event.preventDefault();

      (this.children.controls as InputField[]).forEach((control) => {
        const element = control.getContent()?.querySelector('input') as HTMLInputElement;
        const elementName = element?.getAttribute('name') as string;
        const elementValue = element?.value;

        this._formData[elementName] = elementValue;
      });

      if (this.props.submitHandler) {
        (this.props.submitHandler as Listener<Record<string, string>>)(this._formData);
      }
    };

    const closeHandler: (event: SubmitEvent) => void = (event) => {
      event.preventDefault();
    };

    this.children.controls = (this.props.controls as InputFieldProps[])?.map(
      (control) =>
        new InputField({
          className: 'modal__input-field',
          classNameLabel: '',
          classNameInput: 'modal__input',
          classNameError: '',
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
          className: 'modal__button',
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

    this.children.closeButton = new Button({
      dataButton: 'closeButton',
      className: 'modal__close',
      type: 'button',
      text: '',
      disabled: false,
      settings: {
        withInternalID: false
      },
      buttonChild: new Svg({
        dataSvg: 'closeSvg',
        className: 'modal__icon',
        href: '#icon-delete'
      }),
      events: {
        click: ((event: SubmitEvent) => closeHandler.call(this, event)) as Listener
      }
    });
  }

  _formData: Record<string, string> = {};

  render(): string {
    return template;
  }
}
