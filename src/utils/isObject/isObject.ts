export function isObject(item: unknown): item is Indexed {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}
