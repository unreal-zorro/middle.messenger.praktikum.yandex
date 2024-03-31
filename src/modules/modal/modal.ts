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
  visible?: boolean;
  submitHandler?: Listener;
  closeHandler?: Listener;
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

      this._formData[name] = value;

      return '';
    };

    const changeHandler: (...args: string[]) => string = (name, value, type) => {
      if (!type.includes('image')) {
        (this.children.buttons as Block[])?.forEach((button) =>
          button.setProps({
            disabled: true
          })
        );

        (this.children.controls as Block[])?.forEach((control) =>
          control.setProps({
            classNameLabel: 'modal__label'
          })
        );

        const message = 'Нужно выбрать файл с изображением';
        return message;
      }

      (this.children.buttons as Block[])?.forEach((button) =>
        button.setProps({
          disabled: false
        })
      );

      (this.children.controls as Block[])?.forEach((control) =>
        control.setProps({
          classNameLabel: 'modal__label modal__label-selected'
        })
      );

      this._formData[name] = value;

      return '';
    };

    const submitHandler: (event: SubmitEvent) => void = (event) => {
      event.preventDefault();

      (this.children.controls as InputField[]).forEach((control) => {
        const element = control.getContent()?.querySelector('input') as HTMLInputElement;
        const elementName = element?.getAttribute('name') as string;
        let elementValue = element?.getAttribute('value') as string;
        const elementType = element?.getAttribute('type') as string;

        if (elementType === 'file') {
          if (element.files && element.files.length !== 0) {
            elementValue = element.files[0]?.name;
            const type = element.files[0]?.type;

            if (!type.includes('image')) {
              return;
            }
          }
        }

        this._formData[elementName] = elementValue;
      });

      if (this.props.submitHandler) {
        (this.props.submitHandler as Listener<Record<string, string>>)(this._formData);
      }
    };

    const closeHandler: (event: SubmitEvent) => void = (event) => {
      event.preventDefault();
      if (this.props.closeHandler) {
        (this.props.closeHandler as Listener)();
      }
    };

    this.children.controls = (this.props.controls as InputFieldProps[])?.map(
      (control) =>
        new InputField({
          className: 'modal__input-field',
          classNameLabel: 'modal__label',
          classNameInput: 'modal__input',
          classNameError: 'modal__error',
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
          changeHandler,
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

  componentDidUpdate(oldProps: ModalProps, newProps: ModalProps): boolean {
    return oldProps.visible !== newProps.visible;
  }

  render(): string {
    return template;
  }
}
