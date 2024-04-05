import { BaseAPI } from '@/base';

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  // Create chat
  createChat(data: { title: string }): Promise<XMLHttpRequest> {
    return this.transport.post('/', { data });
  }

  // Get chats
  requestChats(data: { offset?: number; limit?: number; title: string }): Promise<XMLHttpRequest> {
    return this.transport.get('/', { data });
  }

  // Upload chat avatar
  updateAvatar(data: { chatId: number; avatar: FormData }): Promise<XMLHttpRequest> {
    return this.transport.put('/avatar', { data });
  }

  // Delete chat by ID
  deleteChat(data: { chatId: number }): Promise<XMLHttpRequest> {
    return this.transport.delete('/', { data });
  }
}
