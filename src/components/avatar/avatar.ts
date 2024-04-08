import './avatar.scss';
import { Block } from '@/base';
import type { Props } from '@/base';
import { baseURL } from '@/consts';
import template from './avatar.hbs?raw';

export interface AvatarProps extends Props {
  className?: string;
  imgSrc?: string;
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);

    const newImgSrc = `${baseURL}/resources${props.imgSrc}`;
    this.setProps({ imgSrc: newImgSrc });
  }

  render(): string {
    return template;
  }
}
