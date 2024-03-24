import './error-page.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Header, Link, Text } from '@/components';
import type { HeaderProps, LinkProps, TextProps } from '@/components';
import template from './error-page.hbs?raw';

interface ErrorPageProps extends Props {
  id?: string;
  header?: HeaderProps;
  text?: TextProps;
  link?: LinkProps;
}

export class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super(props);

    this.children.headerChild = new Header({
      className: 'error-page__header',
      text: (this.props.header as HeaderProps)?.text as string,
      settings: {
        withInternalID: false
      }
    });

    this.children.textChild = new Text({
      className: 'error-page__text',
      text: (this.props.text as TextProps)?.text as string,
      settings: {
        withInternalID: false
      }
    });

    this.children.linkChild = new Link({
      className: 'error-page__link',
      href: (this.props.link as LinkProps)?.href as string,
      text: (this.props.link as LinkProps)?.text as string,
      settings: {
        withInternalID: false
      }
    });
  }

  componentDidUpdate(oldProps: ErrorPageProps, newProps: ErrorPageProps): boolean {
    if (oldProps.id !== newProps.id) {
      this.setProps({ id: newProps.id });
    }

    if (oldProps.header !== newProps.header) {
      (this.children.headerChild as Block).setProps({ header: newProps.header });
    }

    if (oldProps.text !== newProps.text) {
      (this.children.textChild as Block).setProps({ text: newProps.text });
    }

    if (oldProps.link?.href !== newProps.link?.href) {
      (this.children.linkChild as Block).setProps({ href: newProps.link?.href });
    }

    if (oldProps.link?.text !== newProps.link?.text) {
      (this.children.linkChild as Block).setProps({ text: newProps.link?.text });
    }

    return true;
  }

  render(): string {
    return template;
  }
}
