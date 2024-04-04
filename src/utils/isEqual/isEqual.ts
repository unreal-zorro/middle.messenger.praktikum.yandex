function isPlainObject(value: unknown): value is PlainObject<typeof value> {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is PlainObject<typeof value> | [] {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(
  lhs: PlainObject<unknown> | [] | string,
  rhs: PlainObject<unknown> | [] | string
) {
  if (typeof lhs === 'string' && typeof rhs === 'string') {
    return lhs === rhs;
  }

  if (typeof lhs !== typeof rhs) {
    return false;
  }

  if (lhs === null && rhs === null) {
    return true;
  }

  if (typeof lhs !== 'object') {
    return lhs === rhs;
  }

  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  if (typeof lhs !== 'string' && typeof rhs !== 'string') {
    for (const [key, value] of Object.entries(lhs)) {
      const rightValue = Array.isArray(rhs) ? rhs[Number(key)] : rhs[key];

      if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
        if (isEqual(value, rightValue)) {
          continue;
        }

        return false;
      }

      if (value !== rightValue) {
        return false;
      }
    }
  }

  return true;
}
