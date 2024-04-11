import { ChatAPI } from '@/api';
import { store } from '@/store';
import { router } from '@/router';
import type { ChatModel } from '@/models';

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
        console.log((error as Error).message);

        if ((error as Error).message.startsWith('status: 401')) {
          router.go('/');
        }
      }
    }

    return data;
  }

  public async createChat(title: string): Promise<void> {
    if (this.chatAPI) {
      try {
        await this.chatAPI.createChat({ title });
      } catch (error: unknown) {
        console.log((error as Error).message);
      }
    }
  }

  public async deleteChat(chatId: number): Promise<void> {
    if (this.chatAPI) {
      try {
        await this.chatAPI.deleteChat({ chatId });
      } catch (error: unknown) {
        console.log((error as Error).message);
      }
    }
  }
}
