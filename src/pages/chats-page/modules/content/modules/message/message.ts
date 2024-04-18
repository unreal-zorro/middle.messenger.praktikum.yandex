import './message.scss';
import { Block } from '@/base';
import type { Props } from '@/base';
import template from './message.hbs?raw';

export interface MessageProps extends Props {
  className?: string;
  id?: string;
  name?: string;
  date?: string;
  time?: string;
  check?: boolean;
  content?: string;
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super(props);
  }

  render(): string {
    return template;
  }
}
