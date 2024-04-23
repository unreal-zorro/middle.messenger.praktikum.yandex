import { expect } from 'chai';
import Sinon from 'sinon';
import type { SinonFakeXMLHttpRequestStatic, SinonFakeXMLHttpRequest } from 'sinon';
import { baseURL } from '../../consts';
import { HTTPTransport } from './HTTPTransport';

describe('HTTPTransport tests', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[];
  let transport: HTTPTransport;

  before(async (done) => {
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

    xhr.onCreate = function (req) {
      requests.push(req);
    };

    done();
  });

  after(async (done) => {
    xhr.restore();
    requests = [];
    done();
  });

  it('should invoke get', () => {
    transport.get('/');

    expect(requests[0].method).to.equal('GET');
  });

  it('should invoke put', () => {
    transport.put('/');

    expect(requests[1].method).to.equal('PUT');
  });

  it('should invoke post', () => {
    transport.post('/');

    expect(requests[2].method).to.equal('POST');
  });

  it('should invoke delete', () => {
    transport.delete('/');

    expect(requests[3].method).to.equal('DELETE');
  });
});
