import './chats-page.scss';
import { Block } from '@/base';
import type { Props } from '@/base';
import { VALIDATION_RULES } from '@/consts';
import { Content, List, NewMessageForm, Search } from './modules';
import type { NewMessageFormProps, SearchProps, ListProps, ContentProps } from './modules';
import template from './chats-page.hbs?raw';

interface ChatsPageProps extends Props {
  id?: string;
  search?: SearchProps;
  list?: ListProps;
  content?: ContentProps;
  newMessage?: NewMessageFormProps;
}

export class ChatsPage extends Block {
  constructor(props: ChatsPageProps) {
    super(props);

    const submitNewMessageHandler: (...args: Record<string, string>[]) => void = (formData) => {
      let isValid = true;

      Object.entries(formData).forEach(([key, value]) => {
        const { regExp } = VALIDATION_RULES[key];
        isValid = isValid && regExp.test(value);
      });

      if (isValid) {
        console.log(formData);
      } else {
        console.log('Invalid form data');
      }
    };

    this.children.search = new Search({
      className: 'chats__search',
      controls: (this.props.search as SearchProps).controls,
      navLink: (this.props.search as SearchProps).navLink,
      settings: {
        withInternalID: false
      }
    });

    this.children.list = new List({
      className: 'chats__list',
      chats: (this.props.list as ListProps).chats,
      classNameChatMenu: '',
      chatMenu: (this.props.list as ListProps).chatMenu,
      settings: {
        withInternalID: false
      }
    });

    this.children.content = new Content({
      className: 'chats__content',
      dates: (this.props.content as ContentProps).dates,
      messages: (this.props.content as ContentProps).messages,
      messageContent: (this.props.content as ContentProps).messageContent,
      currentChat: (this.props.content as ContentProps).currentChat,
      attachMenuItems: (this.props.content as ContentProps).attachMenu,
      userMenuItems: (this.props.content as ContentProps).userMenu,

      settings: {
        withInternalID: false
      }
    });

    this.children.newMessageForm = new NewMessageForm({
      input: (this.props.newMessage as NewMessageFormProps)?.input,
      error: (this.props.newMessage as NewMessageFormProps)?.error,
      attachButton: (this.props.newMessage as NewMessageFormProps)?.attachButton,
      sendButton: (this.props.newMessage as NewMessageFormProps)?.sendButton,
      submitNewMessageHandler,
      settings: {
        withInternalID: false
      }
    });
  }

  render(): string {
    return template;
  }
}
