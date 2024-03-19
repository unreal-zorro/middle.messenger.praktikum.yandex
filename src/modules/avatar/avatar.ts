import './avatar.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Image, Svg, Text } from '@/components';
import template from './avatar.hbs?raw';

interface AvatarImage extends Record<string, string | undefined> {
  className?: string;
  src?: string;
  alt?: string;
}

interface AvatarSvg extends Record<string, string | undefined> {
  className?: string;
  href?: string;
}

interface AvatarText extends Record<string, string | undefined> {
  className?: string;
  text?: string;
}

interface AvatarProps extends Props {
  className?: string;
  imgSrc?: string;
  imageChild?: AvatarImage;
  svgChild?: AvatarSvg;
  svgMaskChild?: AvatarSvg;
  textChild?: AvatarText;
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);

    this.children.imageChild = new Image({
      className: 'avatar__image',
      src: this.props.imgSrc as string,
      alt: 'avatar',
      settings: {
        withInternalID: false
      }
    });

    this.children.svgChild = new Svg({
      className: 'avatar__empty-icon',
      href: '#icon-avatar',
      settings: {
        withInternalID: false
      }
    });

    this.children.svgMaskChild = new Svg({
      className: 'avatar__icon',
      href: '#icon-avatar',
      settings: {
        withInternalID: false
      }
    });

    this.children.textChild = new Text({
      className: 'avatar__text',
      text: 'Поменять аватар',
      settings: {
        withInternalID: false
      }
    });
  }

  render(): string {
    return template;
  }
}
