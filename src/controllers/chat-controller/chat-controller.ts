import { ChatAPI } from '@/api';
import { store } from '@/store';
import { router } from '@/router';
import type { ChatModel } from '@/models';
import { errorRedirect, validate } from '@/utils';

export class ChatController {
  private chatAPI: Nullable<ChatAPI> = null;

  constructor() {
    this.chatAPI = new ChatAPI();
  }

  public async getChats(): Promise<ChatModel[] | undefined> {
    let data;

    if (this.chatAPI) {
      try {
        data = await this.chatAPI.requestChats();
        store.set('chats', data as ChatModel[]);
      } catch (error: unknown) {
        errorRedirect(error, router);
      }
    }

    return data;
  }

  public async createChat(title: string): Promise<ChatModel[] | undefined> {
    let data;

    if (this.chatAPI) {
      try {
        await this.chatAPI.createChat({ title });
        store.set('activeChat', undefined);
        store.set('receivedMessages', undefined);

        data = await this.getChats();
      } catch (error: unknown) {
        errorRedirect(error, router);
      }
    }

    return data;
  }

  public async deleteChat(chatId: number): Promise<ChatModel[] | undefined> {
    let data;

    if (this.chatAPI) {
      try {
        await this.chatAPI.deleteChat({ chatId });
        store.set('activeChat', undefined);
        store.set('receivedMessages', undefined);

        data = await this.getChats();
      } catch (error: unknown) {
        errorRedirect(error, router);
      }
    }

    return data;
  }

  public async updateAvatar(chatId: number, avatar: File) {
    const avatarFileName = avatar.name;
    const isValid = validate({ avatar: avatarFileName });

    const data = new FormData();
    data.append('chatId', String(chatId));
    data.append('avatar', avatar);

    let newChatData: ChatModel | undefined;

    if (this.chatAPI && isValid) {
      try {
        newChatData = (await this.chatAPI.updateAvatar(data)) as unknown as ChatModel;

        const currentChats: ChatModel[] = (await store.getState().chats) as ChatModel[];
        const newChats = currentChats?.map((chat) =>
          chat.id === (newChatData as unknown as ChatModel).id ? newChatData : chat
        );

        store.set('chats', newChats as ChatModel[]);
        store.set('activeChat', undefined);
        store.set('receivedMessages', undefined);
      } catch (error: unknown) {
        errorRedirect(error, router);
      }
    } else {
      console.log('Invalid avatar form data');
    }

    return newChatData;
  }

  public async checkActiveChat(chatId: number): Promise<ChatModel> {
    const currentChats: ChatModel[] = (await store.getState().chats) as ChatModel[];
    const activeChat = currentChats?.find((chat) => chat.id === chatId);

    store.set('activeChat', {
      ...activeChat
    });
    store.set('receivedMessages', undefined);

    return activeChat as ChatModel;
  }
}
