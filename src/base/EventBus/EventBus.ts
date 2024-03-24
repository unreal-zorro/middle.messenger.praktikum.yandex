export type Listener<T = unknown> = (...args: T[]) => void;

export class EventBus<T = unknown> {
  private readonly listeners: Record<string, Listener<T>[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Listener<T>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Listener<T>): void | never {
    const callbacks = this.listeners[event];

    if (!callbacks) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = callbacks.filter((item) => item !== callback);
  }

  emit(event: string, ...args: T[]): void | never {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => listener.apply(this, args));
  }
}
