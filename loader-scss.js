export async function resolve(specifier, context, next) {
  const nextResult = await next(specifier, context);
  if (!specifier.endsWith('.scss')) return nextResult;

  return {
    format: 'scss',
    shortCircuit: true,
    url: nextResult.url
  };
}

export async function load(url, context, next) {
  if (context.format !== 'scss') {
    const result = await next(url, context);
    return result;
  }

  return {
    format: 'module',
    shortCircuit: true,
    url: ''
  };
}
