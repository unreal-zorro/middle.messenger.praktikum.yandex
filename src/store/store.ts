import { EventBus } from '@/base';
import { set } from '@/utils';

export enum StoreEvents {
  Updated = 'updated'
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
  private state: Indexed = {};

  constructor() {
    super();
  }

  public getState(): Indexed {
    return this.state;
  }

  public set(path: string, value: unknown): void {
    set(this.state, path, value);

    // метод EventBus
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
