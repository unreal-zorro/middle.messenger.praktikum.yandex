import { Block } from '@/base/';
import type { Props } from '@/base/';
import template from './svg.hbs?raw';

export interface SvgProps extends Props {
  className?: string;
  href?: string;
  dataSvg?: string;
}

export class Svg extends Block {
  constructor(props: SvgProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
