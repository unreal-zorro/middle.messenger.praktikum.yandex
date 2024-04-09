import './search.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { InputField } from '@/modules';
import type { InputFieldProps } from '@/modules';
import { Button, Link } from '@/components';
import type { ButtonProps, LinkProps } from '@/components';
import template from './search.hbs?raw';

export interface SearchProps extends Props {
  className?: string;
  controls?: InputFieldProps[];
  navLink?: LinkProps;
  button?: ButtonProps;
}

export class Search extends Block {
  constructor(props: SearchProps) {
    super(props);

    this.children.controls = (this.props.controls as InputFieldProps[])?.map(
      (control) =>
        new InputField({
          className: 'search__input-field',
          classNameLabel: '',
          classNameInput: 'search__input',
          classNameError: 'search__error',
          name: control.name,
          label: control.label,
          type: control.type,
          value: control.value,
          placeholder: control.placeholder,
          disabled: control.disabled,
          error: control.error,
          text: control.text,
          settings: {
            withInternalID: true
          }
        })
    );

    this.children.navLinkChild = new Link({
      className: 'search__link',
      href: (this.props.navLink as LinkProps)?.href as string,
      text: (this.props.navLink as LinkProps)?.text as string,
      settings: {
        withInternalID: false
      }
    });

    this.children.buttonChild = new Button({
      className: 'search__button',
      type: (this.props.button as ButtonProps)?.type as string,
      text: (this.props.button as ButtonProps)?.text as string,
      settings: {
        withInternalID: false
      }
    });
  }

  render(): string {
    return template;
  }
}
