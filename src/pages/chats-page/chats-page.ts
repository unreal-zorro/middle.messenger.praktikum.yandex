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
  chatMenuItems?: MenuItem[];
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
      controls: this.props.controlsSearch as Array<SearchFormControl>,
      navLink: this.props.navLinkSearch as SearchLink,
      settings: {
        withInternalID: false
      }
    });

    this.children.search = new List({
      className: 'chats__list',
      chats: this.props.chats as Array<ChatProps>,
      classNameChatMenu: '',
      chatMenuItems: this.props.chatMenuItems as Array<MenuItem>,
      controls: this.props.controlsSearch as Array<SearchFormControl>,
      navLink: this.props.navLinkSearch as SearchLink,
      settings: {
        withInternalID: false
      }
    });

    this.children.search = new Content({
      className: 'chats__content',
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
      controls: this.props.controlNewMessage as NewMessageControl,
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
