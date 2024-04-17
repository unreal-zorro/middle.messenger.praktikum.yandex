import './modal.scss';
import { Block } from '@/base/';
import type { Listener, Props } from '@/base/';
import { Button, Svg } from '@/components';
import type { ButtonProps } from '@/components';
import { VALIDATION_RULES } from '@/consts';
import { isEqual } from '@/utils';
import { InputField } from '../input-field';
import type { InputFieldProps } from '../input-field';
import template from './modal.hbs?raw';

export interface ModalProps extends Props {
  className?: string;
  type?: string;
  header?: string;
  controls?: InputFieldProps[];
  buttons?: ButtonProps[];
  visible?: boolean;
  state?: ModalProps;
  submitHandler?: Listener;
  closeHandler?: Listener;
}

export class Modal extends Block {
  constructor(props: ModalProps) {
    super(props);
  }

  public focusHandler = () => {
    (this.children.buttons as Block[])?.map((button) =>
      button.setProps({
        disabled: true
      })
    );
  };

  public blurHandler: (...args: string[]) => string = (name, value) => {
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

  public changeHandler: (...args: string[]) => string = (name, value, type) => {
    if (!type.includes('image') && this.props.type === 'image') {
      (this.children.buttons as Block[])?.forEach((button) =>
        button.setProps({
          disabled: true
        })
      );

      (this.children.controls as Block[])?.forEach((control) =>
        control.setProps({
          classNameLabel: 'modal__label modal__label-file'
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
        classNameLabel: 'modal__label modal__label-file modal__label-selected'
      })
    );

    this._formData[name] = value;

    return '';
  };

  public submitHandler: (event: SubmitEvent) => void = (event) => {
    event.preventDefault();

    (this.children.controls as InputField[]).forEach((control) => {
      const element = control.getContent()?.querySelector('input') as HTMLInputElement;
      const elementName = element?.getAttribute('name') as string;
      const elementValue = element?.getAttribute('value') as string;
      const elementType = element?.getAttribute('type') as string;

      if (elementType === 'file') {
        if (element.files && element.files.length !== 0) {
          const type = element.files[0]?.type;
          const data = element.files[0];

          if (!type.includes('image') && this.props.type === 'image') {
            return;
          }

          this._formData[elementName] = data;
        }
      } else {
        this._formData[elementName] = elementValue;
      }
    });

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

    if (this.props.submitHandler) {
      (this.props.submitHandler as Listener<Record<string, string | File>>)(this._formData);
    }
  };

  public closeHandler: (event: SubmitEvent) => void = (event) => {
    event.preventDefault();

    if (this.props.closeHandler) {
      (this.props.closeHandler as Listener)();
    }
  };

  public initControls() {
    this.children.controls = (this.props.controls as InputFieldProps[])?.map((_control, index) => {
      const type = ((this.props.state as ModalProps)?.controls as InputFieldProps[])?.[index].type;
      const name = ((this.props.state as ModalProps)?.controls as InputFieldProps[])?.[index].name;
      const label = ((this.props.state as ModalProps)?.controls as InputFieldProps[])?.[index]
        .label;
      const value = ((this.props.state as ModalProps)?.controls as InputFieldProps[])?.[index]
        .value;
      const error = ((this.props.state as ModalProps)?.controls as InputFieldProps[])?.[index]
        .error;
      const text = ((this.props.state as ModalProps)?.controls as InputFieldProps[])?.[index].text;

      return new InputField({
        className: `modal__input-field ${type === 'file' ? 'modal__input-field-file' : ''}`,
        classNameLabel: `modal__label ${type === 'file' ? 'modal__label-file' : ''}`,
        classNameInput: `modal__input ${type === 'file' ? 'modal__input-file' : ''}`,
        classNameError: `modal__error ${type === 'file' ? 'modal__error-file' : ''}`,
        name,
        label,
        type,
        value,
        placeholder: '',
        disabled: false,
        error,
        text,
        focusHandler: this.focusHandler,
        blurHandler: this.blurHandler,
        changeHandler: this.changeHandler,
        settings: {
          withInternalID: true
        }
      });
    });
  }

  public initButtons() {
    this.children.buttons = (this.props.buttons as ButtonProps[])?.map((_button, index) => {
      const type = ((this.props.state as ModalProps)?.buttons as ButtonProps[])?.[index].type;
      const text = ((this.props.state as ModalProps)?.buttons as ButtonProps[])?.[index].text;

      return new Button({
        className: 'modal__button',
        type,
        text,
        disabled: true,
        settings: {
          withInternalID: false
        },
        events: {
          click: ((event: SubmitEvent) => this.submitHandler.call(this, event)) as Listener
        }
      });
    });
  }

  public initCloseButton() {
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
        click: ((event: SubmitEvent) => this.closeHandler.call(this, event)) as Listener
      }
    });
  }

  async componentDidMount() {
    try {
      this.initControls();
      this.initButtons();
      this.initCloseButton();
    } catch (error) {
      console.log(error);
    }
  }

  _formData: Record<string, string | File> = {};

  componentDidUpdate(oldProps: ModalProps, newProps: ModalProps): boolean {
    if (!isEqual(oldProps.state as Indexed<unknown>, newProps.state as Indexed<unknown>)) {
      this.initControls();
      this.initButtons();
    }

    return oldProps.visible !== newProps.visible;
  }

  render(): string {
    return template;
  }
}
