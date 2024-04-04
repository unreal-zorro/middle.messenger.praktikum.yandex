const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

function queryStringify(data: Record<string, unknown> = {}): string {
  return data
    ? Object.entries(data)
        .map(([key, value]) => `${key}=${String(value)}`)
        .reduce((akk, item) => `${akk}${item}&`, '?')
        .slice(0, -1)
    : '';
}

type Options = {
  method: ReverseMap<typeof METHODS>;
  data?: Record<string, unknown>;
  timeout?: number;
  headers?: Record<string, string>;
  params?: Record<string, string>;
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
    const { method, data, headers = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      Object.entries(headers).forEach(([header, value]) => {
        xhr.setRequestHeader(header, value);
      });

      xhr.onload = () => resolve(xhr);

      const handleError = (event: Event) => reject(new Error(`Error: ${event.type}`));

      xhr.timeout = timeout;

      xhr.onabort = handleError;
      xhr.onerror = handleError;
      xhr.ontimeout = handleError;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
