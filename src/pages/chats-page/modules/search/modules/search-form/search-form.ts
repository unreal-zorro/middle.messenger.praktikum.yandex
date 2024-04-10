import './search-form.scss';
import { Block } from '@/base/';
import type { Props, Listener } from '@/base';
import { Input } from '@/components';
import type { InputProps, ErrorProps } from '@/components';
import template from './search-form.hbs?raw';

export interface SearchFormProps extends Props {
  className?: string;
  input?: InputProps;
  error?: ErrorProps;
  submitHandler?: Listener;
}

export class SearchForm extends Block {
  constructor(props: SearchFormProps) {
    super(props);

    const submitHandler: Listener<SubmitEvent> = (event) => {
      event.preventDefault();

      const element = (this.children.inputChild as Input).getContent() as HTMLInputElement;
      const elementName = element?.getAttribute('name') as string;
      const elementValue = element?.value;
      this._formData[elementName] = elementValue;

      if (this.props.submitHandler) {
        (this.props.submitHandler as Listener)(this._formData);
      }
    };

    this.children.inputChild = new Input({
      className: 'search-form__input',
      type: (this.props.input as InputProps)?.type,
      name: (this.props.input as InputProps)?.name,
      placeholder: (this.props.input as InputProps)?.placeholder,
      error: !!(this.props.input as InputProps)?.error,
      settings: {
        withInternalID: false
      }
    });

    this.props.events = {
      submit: ((event: SubmitEvent) => submitHandler(event)) as Listener
    };
  }

  _formData: Record<string, string> = {};

  render(): string {
    return template;
  }
}
