import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import { EventBus } from '../EventBus';
import type { Listener } from '../EventBus';

export interface Props {
  [key: string]: string | Listener | Record<string, Listener> | undefined | Block;
  events?: Record<string, Listener>;
  settings?: Record<string, Listener>;
  id?: string;
}

export interface Children {
  [key: string]: Block;
}

export interface PropsAndChildren extends Children, Props {}

export interface Events {
  INIT: 'init';
  FLOW_CDM: 'flow:component-did-mount';
  FLOW_CDU: 'flow:component-did-update';
  FLOW_RENDER: 'flow:render';
}

interface Meta {
  tagName: string;
  props?: Props;
}

export abstract class Block {
  static EVENTS: Events;

  private _element: Nullable<HTMLElement | HTMLTemplateElement> = null;

  private readonly _meta: Nullable<Meta> = null;

  protected props: Props;

  protected children: Children = {};

  eventBus: () => EventBus<Props>;

  private _id: Nullable<string> = null;

  constructor(tagName: string = 'div', propsAndChildren: PropsAndChildren = {}) {
    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;
    const eventBus = new EventBus<Props>();
    this._meta = {
      tagName,
      props
    };

    if (props.settings?.withInternalID) {
      this._id = makeUUID();
      this.props = this._makePropsProxy({ ...props, id: this._id });
    } else {
      this.props = this._makePropsProxy(props);
    }

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildren(propsAndChildren: PropsAndChildren) {
    const children: Children = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  compile(template: HandlebarsTemplates, props: Props): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child?._id}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      stub?.replaceWith(child.getContent()!);
    });

    return fragment.content;
  }

  private _registerEvents(eventBus: EventBus<Props>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const tagName = this._meta?.tagName || 'div';
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }

    this._render();
  }

  // Может переопределять пользователь, необязательно трогать
  abstract componentDidUpdate(oldProps: Props, newProps: Props): boolean;

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render() {
    const block = this.render();
    this._removeEvents();

    if (this._element) {
      this._element.innerHTML = '';
      this._element.appendChild(block);
    }

    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  protected abstract render(): DocumentFragment;

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: Props) {
    const self = this;

    return new Proxy(props, {
      get(target: Props, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Props, prop: string, value: string | Listener) {
        const oldProps = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('нет доступа');
      }
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement | HTMLTemplateElement {
    const element = document.createElement(tagName);
    if (this._id) {
      element.setAttribute('data-id', this._id);
    }
    return element;
  }

  private _addEvents(): void {
    const events: Record<string, Listener> = { ...this.props.events };

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  private _removeEvents(): void {
    const events: Record<string, Listener> = { ...this.props.events };

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  show(): void {
    this.getContent()!.style.display = 'block';
  }

  hide(): void {
    this.getContent()!.style.display = 'none';
  }
}
