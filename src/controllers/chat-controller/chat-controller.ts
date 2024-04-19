import { ChatAPI } from '@/api';
import { store } from '@/store';
import { router } from '@/router';
import type { ChatModel } from '@/models';
import { errorRedirect } from '@/utils';

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
