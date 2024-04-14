import { BaseAPI } from '@/base';
import { ChatUserModel } from '@/models';

export class ChatUsersAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  // Get chat users
  requestUsers(data: {
    id: number;
    offset?: number;
    limit?: number;
    name?: string;
    email?: string;
  }): Promise<ChatUserModel[]> {
    const { id } = data;
    const requestData: {
      offset?: number;
      limit?: number;
      name?: string;
      email?: string;
    } = {};

    if (data.offset) {
      requestData.offset = data.offset;
    }

    if (data.limit) {
      requestData.limit = data.limit;
    }

    if (data.name) {
      requestData.name = data.name;
    }

    if (data.email) {
      requestData.email = data.email;
    }

    return this.transport.get(`/${id}/users`, { data: requestData });
  }

  // Add users to chat
  addUsers(data: { users: number[]; chatId: number }): Promise<XMLHttpRequest> {
    return this.transport.put('/users', { data });
  }

  // Delete users from chat
  deleteUsers(data: { users: number[]; chatId: number }): Promise<XMLHttpRequest> {
    return this.transport.delete('/users', { data });
  }
}
