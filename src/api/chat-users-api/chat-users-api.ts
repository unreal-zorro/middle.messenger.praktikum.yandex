import { BaseAPI, HTTPTransport } from '@/base';
import { baseURL } from '@/consts';

const chatUsersAPIInstance = new HTTPTransport(`${baseURL}/chats`);

export class ChatUsersAPI extends BaseAPI {
  // Get chat users
  request(data: { id: number; offset?: number; limit?: number; name?: string; email?: string }) {
    const { id } = data;
    const requestData = {
      offset: data.offset,
      limit: data.limit,
      name: data.name,
      email: data.email
    };

    return chatUsersAPIInstance.get(`/${id}/users`, { data: requestData });
  }

  // Add users to chat
  update(data: { users: number[]; chatId: number }) {
    return chatUsersAPIInstance.put('/users', { data });
  }

  // Delete users from chat
  delete(data: { users: number[]; chatId: number }) {
    return chatUsersAPIInstance.delete('/users', { data });
  }
}
