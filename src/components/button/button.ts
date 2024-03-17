import './button.scss';
import Handlebars from 'handlebars';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import buttonTemplate from './button.hbs?raw';

interface ButtonProps extends Props {
  type?: string;
  text?: string;
  className?: string;
  cancel?: boolean;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  // componentDidUpdate(oldProps: ButtonProps, newProps: ButtonProps): boolean {
  //   return oldProps !== newProps;
  // }

  render(): string {
    return buttonTemplate;

    // const source: HandlebarsTemplates = buttonTemplate;
    // const template = Handlebars.compile(source);

    // return template(this.props);

    // return this.compile(buttonTemplate, this.props);
  }
}
