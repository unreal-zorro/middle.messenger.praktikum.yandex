import Handlebars from 'handlebars';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { classNames, type Mods } from '@/utils';
import cls from './button.module.scss';
import buttonTemplate from './button.hbs?raw';

interface ButtonProps extends Props {
  type?: string;
  text?: string;
  className?: string;
  cancel?: boolean;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    const { cancel, className } = props;

    const mods: Mods = {
      [cls.button_cancel]: cancel
    };

    super('', {
      className: classNames(cls.button, mods, [className]),
      ...props
    });
  }

  componentDidUpdate(oldProps: ButtonProps, newProps: ButtonProps): boolean {
    return oldProps !== newProps;
  }

  render(): DocumentFragment | string {
    const source: HandlebarsTemplates = buttonTemplate;
    const template = Handlebars.compile(source);

    return template(this.props);
  }
}
