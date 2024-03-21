import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import { EventBus } from '../EventBus';
import type { Listener } from '../EventBus';

export interface Props {
  [key: string]:
    | string
    | string[]
    | boolean
    | Listener
    | Record<string, Listener>
    | Record<string, boolean>
    | undefined
    | Record<string, string | undefined>
    | Record<string, string | boolean | undefined>
    | Array<Record<string, string | undefined>>
    | Array<Record<string, string | boolean | undefined>>
    | Block;
  events?: Record<string, Listener>;
  settings?: Record<string, boolean>;
  id?: string;
}

export interface Children {
  [key: string]: Block | Block[] | string;
}

type PropsAndChildren = Children | Props;

interface Meta {
  tagName: string;
  props?: Props;
}

export abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  private _element: Nullable<HTMLElement | HTMLTemplateElement> = null;

  private readonly _meta: Nullable<Meta> = null;

  protected props: Props;

  protected children: Children = {};

  eventBus: () => EventBus<Props>;

  private _id: Nullable<string> = null;

  constructor(propsAndChildren: PropsAndChildren = {}) {
    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;
    const eventBus = new EventBus<Props>();
    this._meta = {
      tagName: 'div',
      props
    };

    if (props.settings?.withInternalID) {
      this._id = makeUUID();
      this.props = this._makePropsProxy({ ...props, _id: this._id });
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

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);

    return element;
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);

    // Object.values(this.children).forEach((child) => {
    //   child.dispatchComponentDidMount();
    // });

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((childItem) => (childItem as Block).dispatchComponentDidMount());
      } else {
        (child as Block).dispatchComponentDidMount();
      }
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
  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return oldProps !== newProps;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  compile(template: string, props: Props): Element | null {
    const propsAndStubs = { ...props };

    // Object.entries(this.children).forEach(([key, child]) => {
    //   propsAndStubs[key] = `<div data-id="${child?._id}"></div>`;
    // });

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        Object.entries(child).forEach(([childItemKey, childItem]) => {
          (propsAndStubs[key] as Children)[childItemKey] =
            `<div data-id="${childItem?._id}"></div>`;
        });
      } else {
        propsAndStubs[key] = `<div data-id="${(child as Block)?._id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    // Object.values(this.children).forEach((child) => {
    //   const stub = fragment.content.querySelector(`[data-id="${(child as Block)._id}"]`);
    //   stub?.replaceWith((child as Block).getContent()!);
    // });

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        Object.values(child).forEach((childItem) => {
          const stub = fragment.content.querySelector(`[data-id="${(childItem as Block)._id}"]`);
          stub?.replaceWith((childItem as Block).getContent()!);
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${(child as Block)._id}"]`);
        stub?.replaceWith((child as Block).getContent()!);
      }
    });

    return fragment.content.firstElementChild;
  }

  private _render() {
    const newElement = this.compile(this.render(), this.props);

    this._removeEvents();

    if (this._element) {
      this._element.replaceWith(newElement as HTMLElement);
      this._element = newElement as HTMLElement;
    }

    if (this._element && this._id) {
      this._element.setAttribute('data-id', this._id);
    }

    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  protected render(): string {
    return '<div></div>';
  }

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
