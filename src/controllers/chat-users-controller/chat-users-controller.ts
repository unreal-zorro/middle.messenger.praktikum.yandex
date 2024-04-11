import { ChatUsersAPI } from '@/api';
import { store } from '@/store';
import { router } from '@/router';
import type { ChatUserModel } from '@/models';

export class ChatUsersController {
  private chatUsersAPI: Nullable<ChatUsersAPI> = null;

  constructor() {
    this.chatUsersAPI = new ChatUsersAPI();
  }

  public async getChatUsers(id: number): Promise<ChatUserModel[] | undefined> {
    let data;

    if (this.chatUsersAPI) {
      try {
        data = await this.chatUsersAPI.requestUsers({ id });
        store.set('chatUsers', data as ChatUserModel[]);
      } catch (error: unknown) {
        console.log((error as Error).message);

        if ((error as Error).message.startsWith('status: 401')) {
          router.go('/');
        }
      }
    }

    return data as ChatUserModel[];
  }

  public async addChatUsers(users: number[], chatId: number): Promise<void> {
    if (this.chatUsersAPI) {
      try {
        await this.chatUsersAPI.addUsers({ users, chatId });
      } catch (error: unknown) {
        console.log((error as Error).message);
      }
    }
  }

  public async deleteChatUsers(users: number[], chatId: number): Promise<void> {
    if (this.chatUsersAPI) {
      try {
        await this.chatUsersAPI.deleteUsers({ users, chatId });
      } catch (error: unknown) {
        console.log((error as Error).message);
      }
    }
  }
}
