import './chats-page.scss';
import { Block } from '@/base';
import type { Listener, Props } from '@/base';
import { connect } from '@/hoc';
import { ChatModel } from '@/models';
import { ChatController } from '@/controllers';
import { isEqual } from '@/utils';
import { Content, List, NewMessage, Search } from './modules';
import type { NewMessageProps, SearchProps, ListProps, ContentProps } from './modules';
import template from './chats-page.hbs?raw';

interface ChatsPageProps extends Props {
  id?: string;
  search?: SearchProps;
  list?: ListProps;
  content?: ContentProps;
  newMessage?: NewMessageProps;
  state?: Record<string, ChatModel[]>;
  isLoading?: boolean;
}

export class ChatsPage extends Block {
  private chatController: ChatController;

  constructor(props: ChatsPageProps) {
    super(props);

    this.chatController = new ChatController();

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

      if (event.target && (this.children.newMessage as NewMessage)) {
        const isAttachButton =
          (event.target as HTMLButtonElement).getAttribute('data-button') === 'attachButton';
        const isAttachButtonSvg =
          (event.target as SVGAElement).getAttribute('data-svg') === 'attachSvg';

        if (!isAttachButton && !isAttachButtonSvg) {
          (this.children.newMessage as NewMessage).setProps({
            visibleAttachMenu: false
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

      if (this.children.newMessage as NewMessage) {
        (this.children.newMessage as NewMessage).setProps({
          visibleAttachMenu: false
        });
      }
    };

    this.props.events = {
      click: ((event: Event) => clickHandler(event)) as Listener,
      wheel: wheelHandler,
      scroll: wheelHandler
    };

    const searchChatHandler: Listener<Record<string, string>[]> = (search) => {
      console.log(search);
    };

    const addNewChatHandler: (...args: Record<string, string>[]) => Promise<void> = async (
      data
    ) => {
      await this.chatController.createChat(data.newChatTitle);
      const newChats = await this.chatController.getChats();

      this.setProps({
        state: { chats: newChats }
      });

      (this.children.list as List).setProps({
        state: newChats
      });
    };

    this.setProps({
      isLoading: true
    });

    this.chatController?.getChats().then(() => {
      this.children.search = new Search({
        className: 'chats__search',
        controls: (this.props.search as SearchProps).controls,
        navLink: (this.props.search as SearchProps).navLink,
        button: (this.props.search as SearchProps).button,
        searchForm: (this.props.search as SearchProps).searchForm,
        addNewChatModal: (this.props.search as SearchProps).addNewChatModal,
        visibleAddNewChatModal: false,
        typeAddNewChatModal: '',
        keydownSearchHandler: searchChatHandler as Listener,
        addNewChatClickHandler: addNewChatHandler as Listener,
        settings: {
          withInternalID: false
        }
      });

      this.children.list = new List({
        className: 'chats__list',
        chats: (this.props.state as Record<string, ChatModel[]>).chats,
        classNameChatMenu: '',
        chatMenu: (this.props.list as ListProps).chatMenu,
        visibleChatMenu: false,
        state: (this.props.state as Record<string, ChatModel[]>).chats,
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
        contentMenu: (this.props.content as ContentProps).contentMenu,
        visibleContentMenu: false,
        userAddModal: (this.props.content as ContentProps).userAddModal,
        visibleUserAddModal: false,
        userDeleteModal: (this.props.content as ContentProps).userDeleteModal,
        visibleUserDeleteModal: false,
        settings: {
          withInternalID: false
        }
      });

      this.children.newMessage = new NewMessage({
        className: 'chats__new-message',
        newMessageForm: (this.props.newMessage as NewMessageProps).newMessageForm,
        classNameAttachMenu: '',
        attachMenu: (this.props.newMessage as NewMessageProps).attachMenu,
        visibleAttachMenu: false,
        attachPhotoModal: (this.props.newMessage as NewMessageProps).attachPhotoModal,
        visibleAttachPhotoModal: false,
        typeAttachPhotoModal: 'image',
        attachFileModal: (this.props.newMessage as NewMessageProps).attachFileModal,
        visibleAttachFileModal: false,
        typeAttachFileModal: '',
        attachLocationModal: (this.props.newMessage as NewMessageProps).attachLocationModal,
        visibleAttachLocationModal: false,
        typeAttachLocationModal: '',
        settings: {
          withInternalID: false
        }
      });
    });
  }

  async componentDidMount() {
    try {
      const newChatsData = await this.chatController?.getChats();

      this.setProps({
        state: { chats: newChatsData }
      });

      this.setProps({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(oldProps: ChatsPageProps, newProps: ChatsPageProps): boolean {
    if (oldProps.isLoading !== newProps.isLoading) {
      if (newProps.isLoading === false) {
        return true;
      }
    }

    if (!isEqual(oldProps.state?.chats as [], newProps?.chats as [])) {
      (this.children.list as List).setProps({
        state: (newProps.state as Record<string, ChatModel[]>).chats
      });

      return true;
    }

    if (!isEqual(oldProps.state as {}, newProps.state as {})) {
      return true;
    }

    return false;
  }

  _currentChat = 0;

  render(): string {
    if (this.props.isLoading || isEqual(this.props.state as {}, {})) {
      return `
      <main id={{ id }} class="chats">
        <div class="chats__wrapper">
          Загрузка...
        </div>
      </main>`;
    }

    return template;
  }
}

function mapChatsToProps(state: Indexed<ChatModel[]>): { chats: ChatModel[] } {
  return { chats: state?.chats };
}

export const withChats = connect(
  mapChatsToProps as (state: Indexed<unknown>) => { chats: ChatModel[] }
);
