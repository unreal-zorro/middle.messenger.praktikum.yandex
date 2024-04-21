import { isObject } from '../isObject';

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  if (rhs === undefined) {
    return lhs;
  }

  const result: Indexed = lhs;

  if (isObject(lhs) && isObject(rhs)) {
    Object.keys(rhs).forEach((key: string) => {
      if (isObject(rhs[key])) {
        if (!lhs[key]) {
          Object.assign(result, { [key]: rhs[key] });
        } else {
          result[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
        }
      } else {
        Object.assign(result, { [key]: rhs[key] });
      }
    });
  }

  return result;
}
