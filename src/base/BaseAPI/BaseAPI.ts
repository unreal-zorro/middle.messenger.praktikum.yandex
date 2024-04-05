import { baseURL } from '@/consts';
import { HTTPTransport } from '../HTTPTransport';

export abstract class BaseAPI {
  private _baseURL: string;

  transport: HTTPTransport;

  constructor(url: string) {
    this._baseURL = `${baseURL}${url}`;
    this.transport = new HTTPTransport(`${this._baseURL}`);
  }

  create(data: Record<string, unknown> = {}) {
    console.log(data);

    throw new Error('Not implemented');
  }

  request(data: Record<string, unknown> = {}) {
    console.log(data);

    throw new Error('Not implemented');
  }

  update(data: Record<string, unknown> = {}) {
    console.log(data);

    throw new Error('Not implemented');
  }

  delete(data: Record<string, unknown> = {}) {
    console.log(data);

    throw new Error('Not implemented');
  }
}
