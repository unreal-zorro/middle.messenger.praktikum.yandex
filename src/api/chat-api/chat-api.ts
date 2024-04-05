import { BaseAPI } from '@/base';

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  // Create chat
  create(data: { title: string }) {
    return this.transport.post('/', { data });
  }

  // Get chats
  request(data: { offset?: number; limit?: number; title: string }) {
    return this.transport.get('/', { data });
  }

  // Upload chat avatar
  updateAvatar(data: { chatId: number; avatar: FormData }) {
    return this.transport.put('/avatar', { data });
  }

  // Delete chat by ID
  delete(data: { chatId: number }) {
    return this.transport.delete('/', { data });
  }
}
