export function queryStringify(
  data: Record<string, unknown> | undefined,
  isObject = false
): string | never {
  if (typeof data !== 'object') {
    throw new Error('input must be an object');
  }

  let result = '';

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        result += `${key}[${index}]=${item}&`;
      });
    } else if (typeof value === 'object') {
      result += isObject
        ? `[${key}]${queryStringify(value as Record<string, unknown>, true)}&`
        : `${key}${queryStringify(value as Record<string, unknown>, true)}&`;
    } else {
      result += isObject ? `[${key}]=${value}&` : `${key}=${value}&`;
      isObject = false;
    }
  });

  return result.slice(0, -1);
}
