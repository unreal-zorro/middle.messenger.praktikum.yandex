import './avatar.scss';
import { Block } from '@/base';
import type { Props } from '@/base';
import { baseURL } from '@/consts';
import template from './avatar.hbs?raw';

export interface AvatarProps extends Props {
  className?: string;
  imgSrc?: string | null;
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);

    if (props.imgSrc !== null) {
      const newImgSrc = `${baseURL}/resources${props.imgSrc}`;
      this.setProps({ imgSrc: newImgSrc });
    }
  }

  componentDidUpdate(oldProps: AvatarProps, newProps: AvatarProps): boolean {
    if (oldProps.imgSrc !== newProps.imgSrc) {
      return true;
    }

    return false;
  }

  render(): string {
    return template;
  }
}
