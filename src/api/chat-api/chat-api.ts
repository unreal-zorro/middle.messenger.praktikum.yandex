import { BaseAPI } from '@/base';

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  // Get chats
  requestChats(data: { offset?: number; limit?: number; title?: string }): Promise<XMLHttpRequest> {
    return this.transport.get('/', { data });
  }

  // Create chat
  createChat(data: { title: string }): Promise<XMLHttpRequest> {
    return this.transport.post('/', { data });
  }

  // Delete chat by ID
  deleteChat(data: { chatId: number }): Promise<XMLHttpRequest> {
    return this.transport.delete('/', { data });
  }

  // Get new messages count
  requestNewMessages(data: { id: number }): Promise<XMLHttpRequest> {
    return this.transport.get(`/new/${data.id}`);
  }

  // Upload chat avatar
  updateAvatar(data: FormData): Promise<XMLHttpRequest> {
    return this.transport.put('/avatar', { data });
  }
}
