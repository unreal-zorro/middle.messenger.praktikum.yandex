export abstract class BaseAPI {
  // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
  create(data: Record<string, unknown> = {}) {
    console.log(data);

    throw new Error('Not implemented');
  }

  request(data: Record<string, unknown> = {}) {
    console.log(data);

    throw new Error('Not implemented');
  }

  update(data: Record<string, unknown> = {}) {
    console.log(data);

    throw new Error('Not implemented');
  }

  delete(data: Record<string, unknown> = {}) {
    console.log(data);

    throw new Error('Not implemented');
  }
}
