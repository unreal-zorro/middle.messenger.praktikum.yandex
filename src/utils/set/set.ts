import { isObject } from '../isObject';
import { merge } from '../merge';

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (!isObject(object)) {
    return object;
  }

  const tempResult: unknown = path
    .split('.')
    .reduceRight((accumulator: typeof value, item: string) => {
      const temp: Indexed<unknown> = {};
      temp[item] = accumulator;
      return temp;
    }, value);

  object = merge(object, tempResult as Indexed<unknown>);
  return object;
}
