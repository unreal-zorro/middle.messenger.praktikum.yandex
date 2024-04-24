import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<body><div id="root"></div></body>', {
  url: 'http://localhost:5173/'
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
