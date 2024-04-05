import { baseURL } from '@/consts';
import { HTTPTransport } from '../HTTPTransport';

export abstract class BaseAPI {
  private _baseURL: string;

  transport: HTTPTransport;

  constructor(url: string) {
    this._baseURL = `${baseURL}${url}`;
    this.transport = new HTTPTransport(`${this._baseURL}`);
  }

  create() {
    throw new Error('Not implemented');
  }

  request() {
    throw new Error('Not implemented');
  }

  update() {
    throw new Error('Not implemented');
  }

  delete() {
    throw new Error('Not implemented');
  }
}
