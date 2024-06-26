import { HTTPTransport, WSTransport } from '@/base';
import { baseURL, baseWSSURL } from '@/consts';

class MessagesAPI {
  private _baseURL: string;

  private _baseWSSURL: string;

  httpTransport: HTTPTransport;

  wssTransport: WSTransport | null = null;

  private _token: string = '';

  constructor() {
    this._baseURL = baseURL;
    this._baseWSSURL = baseWSSURL;

    this.httpTransport = new HTTPTransport(`${this._baseURL}/chats/token`);
  }

  // Get token
  private async _getToken(id: number): Promise<void> {
    try {
      const data = await this.httpTransport.post(`/${id}`);
      this._token = data.token;
    } catch (error) {
      console.log(error);
    }
  }

  // Create WSS transport
  async getWSSTransport(userId: number, chatID: number): Promise<void> {
    try {
      await this._getToken(chatID);
      this.wssTransport = new WSTransport(`${this._baseWSSURL}/${userId}/${chatID}/${this._token}`);
    } catch (error) {
      console.log(error);
    }
  }

  // Connect to chat
  async connectToChat(): Promise<void> {
    try {
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
  async getMessages(message: string = '0'): Promise<void> {
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

export default new MessagesAPI();
