import { BaseAPI, HTTPTransport } from '@/base';
import { baseURL } from '@/consts';

const chatAPIInstance = new HTTPTransport(`${baseURL}/chats`);

export class ChatAPI extends BaseAPI {
  // Create chat
  create(data: { title: string }) {
    return chatAPIInstance.post('/', { data });
  }

  // Get chats
  request(data: { offset?: number; limit?: number; title: string }) {
    return chatAPIInstance.get('/', { data });
  }

  // Upload chat avatar
  update(data: { chatId: number; avatar: FormData }) {
    return chatAPIInstance.put('/avatar', { data });
  }

  // Delete chat by ID
  delete(data: { chatId: number }) {
    return chatAPIInstance.delete('/', { data });
  }
}
