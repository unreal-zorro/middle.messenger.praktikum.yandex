import './svg.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import template from './svg.hbs?raw';

interface SvgProps extends Props {
  className?: string;
  href?: string;
}

export class Svg extends Block {
  constructor(props: SvgProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
