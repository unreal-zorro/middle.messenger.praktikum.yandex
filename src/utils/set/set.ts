function isObject(item: unknown): item is Indexed {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
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

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  // Код
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
