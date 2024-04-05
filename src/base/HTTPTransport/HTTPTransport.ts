import { queryStringify } from '@/utils';

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

type Options = {
  method: ReverseMap<typeof METHODS>;
  data?: Record<string, unknown>;
  timeout?: number;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  withCredentials?: boolean;
  responseType?: XMLHttpRequestResponseType;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>;

export class HTTPTransport {
  private readonly _url: string;

  constructor(baseURL: string = '') {
    this._url = baseURL;
  }

  get: HTTPMethod = (url, options = {}) => {
    const urlWithQuery = this._url + url + queryStringify(options?.data);
    return this.request(urlWithQuery, { ...options, method: METHODS.GET }, options.timeout);
  };

  put: HTTPMethod = (url, options = {}) =>
    this.request(this._url + url, { ...options, method: METHODS.PUT }, options.timeout);

  post: HTTPMethod = (url, options = {}) =>
    this.request(this._url + url, { ...options, method: METHODS.POST }, options.timeout);

  delete: HTTPMethod = (url, options = {}) =>
    this.request(this._url + url, { ...options, method: METHODS.DELETE }, options.timeout);

  request: (url: string, options: Options, timeout?: number) => Promise<XMLHttpRequest> = (
    url,
    options = { method: METHODS.GET },
    timeout = 5000
  ) => {
    const { method, data, headers = {}, withCredentials = true, responseType = 'json' } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      Object.entries(headers).forEach(([header, value]) => {
        xhr.setRequestHeader(header, value);
      });

      xhr.onload = () => {
        const status = xhr.status || 0;

        if (status >= 200 && status < 300) {
          resolve(xhr.response);
        } else {
          reject(new Error(xhr.response?.reason || ''));
        }
      };

      const handleError = (event: Event) => reject(new Error(`Error: ${event.type}`));

      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;
      xhr.responseType = responseType;

      xhr.onabort = handleError;
      xhr.onerror = handleError;
      xhr.ontimeout = handleError;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
