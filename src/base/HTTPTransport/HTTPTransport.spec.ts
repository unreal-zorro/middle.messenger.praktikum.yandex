import { expect } from 'chai';
import Sinon from 'sinon';
import type { SinonFakeXMLHttpRequestStatic, SinonFakeXMLHttpRequest } from 'sinon';
import { baseURL } from '../../consts';
import { HTTPTransport } from './HTTPTransport';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[];
  let transport: HTTPTransport;

  before(() => {
    xhr = Sinon.useFakeXMLHttpRequest();
    global.XMLHttpRequest = xhr as unknown as {
      new (): XMLHttpRequest;
      prototype: XMLHttpRequest;
      readonly UNSENT: 0;
      readonly OPENED: 1;
      readonly HEADERS_RECEIVED: 2;
      readonly LOADING: 3;
      readonly DONE: 4;
    };

    transport = new HTTPTransport(`${baseURL}`);
    requests = [];
  });

  beforeEach(async () => {
    xhr.onCreate = function (req) {
      requests.push(req);
    };
  });

  afterEach(async () => {
    requests.length = 0;
  });

  it('should invoke get method', () => {
    transport.get('/');

    expect(requests[0].method).to.equal('GET');
  });

  it('should invoke get method with params', () => {
    transport.get('/users', { data: { name: 'user', password: '123' } });

    expect(requests[0].url).to.equal(`${baseURL}/users?name=user&password=123`);
  });

  it('should invoke put method', () => {
    transport.put('/');

    expect(requests[0].method).to.equal('PUT');
  });

  it('should invoke post method', () => {
    transport.post('/');

    expect(requests[0].method).to.equal('POST');
  });

  it('should invoke delete method', () => {
    transport.delete('/');

    expect(requests[0].method).to.equal('DELETE');
  });
});
