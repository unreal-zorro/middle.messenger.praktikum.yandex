import { Route } from '../Route';
import type { Props } from '../Block';
import type { BlockConstructor } from '../Route';

export class Router {
  private routes: Route[] = [];

  private history: History = window.history;

  private _currentRoute: Nullable<Route> = null;

  private _rootQuery: string = '';

  private static __instance: Router;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: BlockConstructor, props: Props): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery }, props);
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      if ((event.currentTarget as Window)?.location) {
        this._onRoute((event.currentTarget as Window).location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string): void {
    let route = this.getRoute(pathname);

    if (!route) {
      const routesLength = this.routes.length;
      route = this.routes[routesLength - 1];
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}
