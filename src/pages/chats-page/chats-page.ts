import './chats-page.scss';
import { Block } from '@/base';
import type { Listener, Props } from '@/base';
import { Content, List, NewMessage, Search } from './modules';
import type { NewMessageProps, SearchProps, ListProps, ContentProps } from './modules';
import { NewMessageFormProps } from './modules/new-message/modules';
import template from './chats-page.hbs?raw';

interface ChatsPageProps extends Props {
  id?: string;
  search?: SearchProps;
  list?: ListProps;
  content?: ContentProps;
  newMessage?: NewMessageProps;
}

export class ChatsPage extends Block {
  constructor(props: ChatsPageProps) {
    super(props);

    const clickHandler: Listener<Event> = (event: Event) => {
      if (event.target && (this.children.list as List)) {
        const isChatButton =
          (event.target as HTMLButtonElement).getAttribute('data-button') === 'chatButton';
        const isChatButtonSvg =
          (event.target as SVGAElement).getAttribute('data-svg') === 'chatSvg';

        if (!isChatButton && !isChatButtonSvg) {
          (this.children.list as List).setProps({
            visibleChatMenu: false
          });
        }
      }

      if (event.target && (this.children.content as Content)) {
        const isContentButton =
          (event.target as HTMLButtonElement).getAttribute('data-button') === 'contentButton';
        const isContentButtonSvg =
          (event.target as SVGAElement).getAttribute('data-svg') === 'contentSvg';

        if (!isContentButton && !isContentButtonSvg) {
          (this.children.content as Content).setProps({
            visibleContentMenu: false
          });
        }
      }
    };

    const wheelHandler: Listener = () => {
      if (this.children.list as List) {
        (this.children.list as List).setProps({
          visibleChatMenu: false
        });
      }

      if (this.children.content as Content) {
        (this.children.content as Content).setProps({
          visibleContentMenu: false
        });
      }
    };

    this.props.events = {
      click: ((event: Event) => clickHandler(event)) as Listener,
      wheel: wheelHandler,
      scroll: wheelHandler
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
      visibleChatMenu: false,
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
      classNameContentMenu: '',
      contentMenuItems: (this.props.content as ContentProps).contentMenu,
      visibleContentMenu: false,
      classNameAttachMenu: '',
      attachMenuItems: (this.props.content as ContentProps).attachMenu,
      visibleAttachMenu: false,
      settings: {
        withInternalID: false
      }
    });

    this.children.newMessage = new NewMessage({
      className: 'chats__new-message',
      newMessageForm: (this.props.newMessage as NewMessageProps).form as NewMessageFormProps,
      settings: {
        withInternalID: false
      }
    });
  }

  render(): string {
    return template;
  }
}
