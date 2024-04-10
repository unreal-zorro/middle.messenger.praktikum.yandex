import './search.scss';
import { Block } from '@/base';
import type { Listener, Props } from '@/base';
import type { InputFieldProps } from '@/modules';
import { Button, Link } from '@/components';
import type { ButtonProps, LinkProps } from '@/components';
import { SearchForm } from './modules';
import type { SearchFormProps } from './modules';
import template from './search.hbs?raw';

export interface SearchProps extends Props {
  className?: string;
  controls?: InputFieldProps[];
  navLink?: LinkProps;
  button?: ButtonProps;
  searchForm?: SearchFormProps;
  keydownSearchHandler?: Listener;
  buttonClickHandler?: Listener;
}

export class Search extends Block {
  constructor(props: SearchProps) {
    super(props);

    const submitSearchHandler: Listener<Record<string, string>[]> = (data) => {
      console.log(data);
    };

    const buttonClickHandler: Listener = () => {
      if (this.props.buttonClickHandler) {
        (this.props.buttonClickHandler as Listener)();
      }
    };

    this.children.navLinkChild = new Link({
      className: 'search__link',
      href: (this.props.navLink as LinkProps)?.href as string,
      text: (this.props.navLink as LinkProps)?.text as string,
      settings: {
        withInternalID: false
      }
    });

    this.children.searchFormChild = new SearchForm({
      input: (this.props.searchForm as SearchFormProps).input,
      error: (this.props.searchForm as SearchFormProps).error,
      submitHandler: submitSearchHandler as Listener,
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
      },
      events: {
        click: buttonClickHandler
      }
    });
  }

  render(): string {
    return template;
  }
}
