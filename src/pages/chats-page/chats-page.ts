import './chats-page.scss';
import { Block } from '@/base/';
import type { Props } from '@/base/';
import { Content, List, NewMessage, Search } from './modules';
import type {
  NewMessageButton,
  NewMessageControl,
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
  date?: string[],
  messages?: OneMessage[];
  messageContent?: MessageContentItem[];
  currentChat?: CurrentChat;
  attachMenu?: MenuItem[];
  userMenu?: MenuItem[];
  // userDeleteModal?: ;
  controlNewMessage?: NewMessageControl;
  attachButtonNewMessage?: NewMessageButton;
  sendButtonNewMessage?: NewMessageButton;
}

export class ChatsPage extends Block {
  constructor(props: ChatsPageProps) {
    super(props);

    this.children.search = new Search({
      className: 'chats__search',
      controls: this.props.controlsSearch as SearchFormControl[],
      navLink: this.props.navLinkSearch as SearchLink,
      settings: {
        withInternalID: false
      }
    });

    console.log(this.props.chatMenu);

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
      date: this.props.date as string[],
      messages: this.props.messages as OneMessage[],
      messageContent: this.props.messageContent as MessageContentItem[],
      currentChat: this.props.currentChat as CurrentChat,
      attachMenuItems: this.props.attachMenu as MenuItem[],
      userMenuItems: this.props.userMenu as MenuItem[],
      // classNameModal: '',
      // modalTitle: this.props.currentChatMessages as Array<MenuItem>,
      // modalItems: this.props.currentChatMessages as Array<MenuItem>,

      settings: {
        withInternalID: false
      }
    });

    this.children.newMessage = new NewMessage({
      className: 'chats__new-message',
      control: this.props.controlNewMessage as NewMessageControl,
      attachButton: this.props.attachButtonNewMessage as NewMessageButton,
      sendButton: this.props.sendButtonNewMessage as NewMessageButton,
      settings: {
        withInternalID: false
      }
    });
  }

  render(): string {
    return template;
  }
}
