import './avatar.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import template from './avatar.hbs?raw';

interface AvatarProps extends Props {
  className?: string;
  imgSrc?: string;
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
