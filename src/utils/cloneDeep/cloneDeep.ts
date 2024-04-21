export function cloneDeep<T extends object = object>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((value: T) => cloneDeep(value)) as T;
  }

  const result = {} as T;

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      result[key] = obj[key];
    }
  }

  return result;
}
