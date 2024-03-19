import { Block } from '@/base/';
import type { Props } from '@/base/';
import template from './image.hbs?raw';

interface ImageProps extends Props {
  className?: string;
  src?: string;
  alt?: string;
}

export class Image extends Block {
  constructor(props: ImageProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
