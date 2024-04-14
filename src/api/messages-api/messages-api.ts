import { HTTPTransport, WSTransport } from '@/base';
import { baseURL, baseWSSURL } from '@/consts';

export class MessagesAPI {
  private _baseURL: string;

  private _baseWSSURL: string;

  httpTransport: HTTPTransport;

  wssTransport: WSTransport | null = null;

  private _token: string = '';

  constructor() {
    this._baseURL = baseURL;
    this._baseWSSURL = baseWSSURL;

    this.httpTransport = new HTTPTransport(`${this._baseURL}/chats`);
  }

  // Get token
  async getToken(id: number): Promise<void> {
    try {
      const token = await this.httpTransport.get(`/${id}`);
      this._token = token;
    } catch (error) {
      console.log(error);
    }
  }

  // Create WSS transport
  async getWSSTransport(userId: number, chatID: number): Promise<void> {
    try {
      await this.getToken(chatID);

      this.wssTransport = new WSTransport(`${this._baseWSSURL}/${userId}/${chatID}/${this._token}`);
    } catch (error) {
      console.log(error);
    }
  }

  // Connect to chat
  async connectToChat(userId: number, chatID: number): Promise<void> {
    try {
      await this.getWSSTransport(userId, chatID);

      if (this.wssTransport) {
        await this.wssTransport.connect();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Send message
  async sendMessage(message: string): Promise<void> {
    try {
      if (this.wssTransport) {
        this.wssTransport.send({ content: message, type: 'message' });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Get messages
  async getMessages(message: string): Promise<void> {
    try {
      if (this.wssTransport) {
        this.wssTransport.send({ content: message, type: 'get old' });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Disconnect from chat
  async disconnectFromChat(): Promise<void> {
    try {
      if (this.wssTransport) {
        this.wssTransport.close();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
