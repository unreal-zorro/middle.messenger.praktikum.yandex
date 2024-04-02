import { isEqual, render } from '@/utils';
import { Block } from '../Block';
import type { Props } from '../Block';

export interface RouteProps extends Record<string, string | undefined> {
  rootQuery?: string;
}

export type BlockConstructor = new (props: Props) => Block;

export class Route {
  private _pathname: string;

  private _blockClass: BlockConstructor;

  private _block: Nullable<Block>;

  private _props: RouteProps;

  private _blockProps: Props;

  constructor(
    pathname: string,
    view: BlockConstructor,
    routeProps: RouteProps,
    blockProps: Props
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = routeProps;
    this._blockProps = blockProps;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      if (this._props.rootQuery && this._block) {
        render(this._props.rootQuery, this._block);
      }
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass(this._blockProps);

      if (this._props.rootQuery && this._block) {
        render(this._props.rootQuery, this._block);
      }

      return;
    }

    if (this._props.rootQuery && this._block) {
      render(this._props.rootQuery, this._block);
    }
  }
}
