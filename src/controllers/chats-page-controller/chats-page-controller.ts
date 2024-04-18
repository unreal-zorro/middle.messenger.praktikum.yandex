import { getChatsPageData } from '@/consts';
import { store } from '@/store';

export class ChatsPageController {
  private chatsPageData: Indexed<unknown> | null = null;

  constructor() {}

  public async getChatsPageData(): Promise<void> {
    this.chatsPageData = getChatsPageData();

    store.set('chatsPageData', this.chatsPageData);
  }
}
