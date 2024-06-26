import { Block } from '@/base';
import type { Props } from '@/base';
import template from './content-chat.hbs?raw';

export interface ContentChatProps extends Props {
  className?: string;
}

export class ContentChat extends Block {
  constructor(props: ContentChatProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
