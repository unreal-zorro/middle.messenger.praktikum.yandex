import './chats-page.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Content, List, NewMessageForm, Search } from './modules';
import type {
  NewMessageFormProps,
  SearchFormControl,
  SearchLink,
  ChatProps,
  MenuItem,
  CurrentChat,
  OneMessage,
  MessageContentItem
} from './modules';
import template from './chats-page.hbs?raw';

interface ChatsPageProps extends Props {
  id?: string;
  controlsSearch?: SearchFormControl[];
  navLinkSearch?: SearchLink;
  chats?: ChatProps[];
  chatMenu?: MenuItem[];
  dates?: string[];
  messages?: OneMessage[];
  messageContent?: MessageContentItem[];
  currentChat?: CurrentChat;
  attachMenu?: MenuItem[];
  userMenu?: MenuItem[];
  newMessage?: NewMessageFormProps;
}

export class ChatsPage extends Block {
  constructor(props: ChatsPageProps) {
    super(props);

    const submitNewMessageHandler: (...args: Record<string, string>[]) => void = (formData) => {
      console.log(formData);
    };

    this.children.search = new Search({
      className: 'chats__search',
      controls: this.props.controlsSearch as SearchFormControl[],
      navLink: this.props.navLinkSearch as SearchLink,
      settings: {
        withInternalID: false
      }
    });

    this.children.list = new List({
      className: 'chats__list',
      chats: this.props.chats as Array<ChatProps>,
      classNameChatMenu: '',
      chatMenu: this.props.chatMenu as MenuItem[],
      settings: {
        withInternalID: false
      }
    });

    this.children.content = new Content({
      className: 'chats__content',
      dates: this.props.dates as string[],
      messages: this.props.messages as OneMessage[],
      messageContent: this.props.messageContent as MessageContentItem[],
      currentChat: this.props.currentChat as CurrentChat,
      attachMenuItems: this.props.attachMenu as MenuItem[],
      userMenuItems: this.props.userMenu as MenuItem[],

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
