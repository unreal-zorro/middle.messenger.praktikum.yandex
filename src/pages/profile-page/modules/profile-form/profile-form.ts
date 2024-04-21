import { Block, Listener } from '@/base/';
import type { Props } from '@/base/';
import { InputField } from '@/modules';
import type { InputFieldProps } from '@/modules';
import { Button } from '@/components';
import type { ButtonProps } from '@/components';
import { VALIDATION_RULES } from '@/consts';
import { UserModel } from '@/models';
import { isEqual } from '@/utils';
import template from './profile-form.hbs?raw';

export interface ProfileFormProps extends Props {
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
  controls?: InputFieldProps[];
  buttons?: ButtonProps[];
  state?: Indexed<UserModel | boolean | Indexed<unknown>>;
  focusHandler?: Listener;
  submitHandler?: (...args: Record<string, string>[]) => void;
}

export class ProfileForm extends Block {
  constructor(props: ProfileFormProps) {
    super(props);
  }

  _password = '';

  _formData: Record<string, string> = {};

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

  public submitHandler: (event: SubmitEvent) => void = (event) => {
    event.preventDefault();

    (this.children.controls as InputField[]).forEach((control) => {
      const element = control.getContent()?.querySelector('input') as HTMLInputElement;
      const elementName = element?.getAttribute('name') as string;
      const elementValue = element?.value;

      if (elementName !== 'newPassword_again') {
        this._formData[elementName] = elementValue;
      }
    });

    if (this.props.submitHandler) {
      (this.props.submitHandler as (...args: Record<string, string>[]) => string)(this._formData);
    }
  };

  public initControls() {
    this.children.controls = (this.props.controls as InputFieldProps[])?.map((_control, index) => {
      const name = (
        (
          (this.props?.state as Indexed<UserModel | boolean | Indexed<unknown>>)
            .profilePageData as Indexed<unknown>
        )?.controls as InputFieldProps[]
      )?.[index]?.name;

      const label = (
        (
          (this.props?.state as Indexed<UserModel | boolean | Indexed<unknown>>)
            .profilePageData as Indexed<unknown>
        )?.controls as InputFieldProps[]
      )?.[index]?.label;

      const type = (
        (
          (this.props?.state as Indexed<UserModel | boolean | Indexed<unknown>>)
            .profilePageData as Indexed<unknown>
        )?.controls as InputFieldProps[]
      )?.[index]?.type;

      const value = (
        (this.props?.state as Indexed<UserModel | boolean | Indexed<unknown>>).user as UserModel
      )?.[
        (
          (
            (this.props?.state as Indexed<UserModel | boolean | Indexed<unknown>>)
              .profilePageData as Indexed<unknown>
          )?.controls as InputFieldProps[]
        )?.[index]?.name as string
      ] as string;

      const disabled = (
        (
          (this.props?.state as Indexed<UserModel | boolean | Indexed<unknown>>)
            .profilePageData as Indexed<unknown>
        )?.controls as InputFieldProps[]
      )?.[index]?.disabled;

      const error = (
        (
          (this.props?.state as Indexed<UserModel | boolean | Indexed<unknown>>)
            .profilePageData as Indexed<unknown>
        )?.controls as InputFieldProps[]
      )?.[index]?.error;

      const text = (
        (
          (this.props?.state as Indexed<UserModel | boolean | Indexed<unknown>>)
            .profilePageData as Indexed<unknown>
        )?.controls as InputFieldProps[]
      )?.[index]?.text;

      return new InputField({
        className: this.props.classNameInputField as string,
        classNameLabel: this.props.classNameLabel as string,
        classNameInput: this.props.classNameInput as string,
        classNameError: this.props.classNameError as string,
        name,
        label,
        type,
        value,
        placeholder: '',
        disabled,
        error,
        text,
        focusHandler: this.focusHandler,
        blurHandler: this.blurHandler,
        settings: {
          withInternalID: true
        }
      });
    });
  }

  public initButtons() {
    this.children.buttons = (this.props.buttons as ButtonProps[])?.map((_button, index) => {
      const type = (
        (
          (this.props?.state as Indexed<UserModel | boolean | Indexed<unknown>>)
            .profilePageData as Indexed<unknown>
        )?.buttons as ButtonProps[]
      )?.[index]?.type;

      const text = (
        (
          (this.props?.state as Indexed<UserModel | boolean | Indexed<unknown>>)
            .profilePageData as Indexed<unknown>
        )?.buttons as ButtonProps[]
      )?.[index]?.text;

      return new Button({
        className: this.props.classNameButton as string,
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

  async componentDidMount() {
    try {
      this.initControls();
      this.initButtons();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(oldProps: ProfileFormProps, newProps: ProfileFormProps): boolean {
    if (!isEqual(oldProps.state as Indexed<unknown>, newProps.state as Indexed<unknown>)) {
      return true;
    }

    if (
      !isEqual(
        (oldProps.state as Indexed<UserModel | boolean | Indexed<unknown>>)
          .profilePageData as Indexed<unknown>,
        (newProps.state as Indexed<UserModel | boolean | Indexed<unknown>>)
          .profilePageData as Indexed<unknown>
      )
    ) {
      return true;
    }

    if (
      ((oldProps.state as Indexed<UserModel | boolean | Indexed<unknown>>).isLoading as boolean) !==
      ((newProps.state as Indexed<UserModel | boolean | Indexed<unknown>>).isLoading as boolean)
    ) {
      return true;
    }

    if (!isEqual(oldProps, newProps)) {
      return true;
    }

    return false;
  }

  render(): string {
    return template;
  }
}
