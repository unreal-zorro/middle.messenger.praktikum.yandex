import { Block } from '@/base';
import type { Props } from '@/base';

export interface ContentChatProps extends Props {
  className?: string;
}

export class ContentChat extends Block {
  constructor(props: ContentChatProps) {
    super(props);
  }
}
