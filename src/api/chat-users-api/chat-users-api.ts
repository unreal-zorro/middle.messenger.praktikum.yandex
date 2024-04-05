import { BaseAPI } from '@/base';

export class ChatUsersAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  // Get chat users
  request(data: { id: number; offset?: number; limit?: number; name?: string; email?: string }) {
    const { id } = data;
    const requestData = {
      offset: data.offset,
      limit: data.limit,
      name: data.name,
      email: data.email
    };

    return this.transport.get(`/${id}/users`, { data: requestData });
  }

  // Add users to chat
  add(data: { users: number[]; chatId: number }) {
    return this.transport.put('/users', { data });
  }

  // Delete users from chat
  delete(data: { users: number[]; chatId: number }) {
    return this.transport.delete('/users', { data });
  }
}
