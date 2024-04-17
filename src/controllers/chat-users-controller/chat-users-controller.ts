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
        const { message } = error as Error;
        const status = message.slice(8, 11);

        if (status === '401') {
          console.log(message);
          router.go('/');
        } else if (status === '500') {
          console.log(message);
          router.go('/error500');
        } else {
          console.log(message);
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
        const { message } = error as Error;
        const status = message.slice(8, 11);

        if (status === '401') {
          console.log(message);
          router.go('/');
        } else if (status === '500') {
          console.log(message);
          router.go('/error500');
        } else {
          console.log(message);
        }
      }
    }
  }

  public async deleteChatUsers(users: number[], chatId: number): Promise<void> {
    if (this.chatUsersAPI) {
      try {
        await this.chatUsersAPI.deleteUsers({ users, chatId });
      } catch (error: unknown) {
        const { message } = error as Error;
        const status = message.slice(8, 11);

        if (status === '401') {
          console.log(message);
          router.go('/');
        } else if (status === '500') {
          console.log(message);
          router.go('/error500');
        } else {
          console.log(message);
        }
      }
    }
  }
}
