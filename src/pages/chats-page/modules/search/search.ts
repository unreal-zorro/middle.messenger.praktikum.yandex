import './search.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { InputField } from '@/modules';
import { Link } from '@/components';
import template from './search.hbs?raw';

export interface SearchFormControl extends Record<string, string |boolean | undefined> {
  label?: string;
  name?: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  error?: string;
}

export interface SearchLink extends Record<string, string | undefined> {
  text?: string;
  href?: string;
}

interface SearchProps extends Props {
  className?: string;
  controls?: SearchFormControl[];
  navLink?: SearchLink;
}

export class Search extends Block {
  constructor(props: SearchProps) {
    super(props);

    this.children.controls = (this.props.controls as SearchFormControl[])?.map(
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
          error: !!control.error,
          text: control.error,
          settings: {
            withInternalID: true
          }
        })
    );

    this.children.navLinkChild = new Link({
      className: 'search__link',
      href: (this.props.navLink as SearchLink)?.href as string,
      text: (this.props.navLink as SearchLink)?.text as string,
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
