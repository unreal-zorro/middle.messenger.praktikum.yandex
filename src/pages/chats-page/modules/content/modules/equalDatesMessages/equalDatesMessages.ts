import './equalDatesMessages.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Text } from '@/components';
import { isEqual } from '@/utils';
// import { connect } from '@/hoc';
import { Message } from './modules';
import type { MessageProps, MessageContent } from './modules';
import template from './equalDatesMessages.hbs?raw';

export interface EqualDatesMessagesProps extends Props {
  className?: string;
  date?: string;
  messages?: MessageProps[];
  messageContent?: MessageContent[];
  state?: Indexed<MessageProps[] | MessageContent[]>;
}

export class EqualDatesMessages extends Block {
  constructor(props: EqualDatesMessagesProps) {
    super(props);
  }

  public initDate() {
    if (this.props.date) {
      this.children.date = new Text({
        className: 'content__date',
        text: this.props.date as string,
        settings: {
          withInternalID: false
        }
      });

      const currentState = this.props.state as Indexed<MessageProps[] | MessageContent[]>;

      const messages = currentState?.messagesArray as MessageProps[];
      const messageContentArray = currentState?.messageContent as MessageContent[];

      this.children.messages = messages?.map((message) => {
        const newMessageContent: MessageContent[] = messageContentArray?.filter(
          (content) => message.id === content.messageId
        );

        return new Message({
          className: 'content__message',
          id: message.id,
          name: message.name,
          time: message.time,
          check: message.check,
          content: newMessageContent,
          settings: {
            withInternalID: true
          }
        });
      });
    }
  }

  async componentDidMount() {
    try {
      this.initDate();

      // console.log(this.children.messages);
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(
    oldProps: EqualDatesMessagesProps,
    newProps: EqualDatesMessagesProps
  ): boolean {
    if (
      !isEqual(
        (oldProps.state as Indexed<MessageProps[] | MessageContent[]>).messages as [],
        (newProps.state as Indexed<MessageProps[] | MessageContent[]>).messages as []
      )
    ) {
      this.initDate();

      return true;
    }

    if (
      !isEqual(
        (oldProps.state as Indexed<MessageProps[] | MessageContent[]>).messageContent as [],
        (newProps.state as Indexed<MessageProps[] | MessageContent[]>).messageContent as []
      )
    ) {
      this.initDate();

      return true;
    }

    return false;
  }

  render(): string {
    return template;
  }
}

// function mapEqualDatesMessagesToProps(state: Indexed<MessageProps[] | MessageContent[]>): {
//   messages?: MessageProps[];
//   messageContent?: MessageContent[];
// } {
//   return {
//     messages: state?.messages as MessageProps[],
//     messageContent: state?.messageContent as MessageContent[]
//   };
// }

// const withEqualDatesMessages = connect(
//   mapEqualDatesMessagesToProps as (state: Indexed<unknown>) => {
//     messages?: MessageProps[];
//     messageContent?: MessageContent[];
//   }
// );
