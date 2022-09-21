export function isArray(object: any) {
  return Array.isArray(object);
}

export function isString(value: any) {
  return typeof value === 'string';
}

export function isNumber(value: any) {
  return typeof value === 'number';
}

export function isBoolean(value: any) {
  return typeof value === 'boolean';
}

export function isFunction(value: any) {
  return typeof value === 'function';
}

export function isSymbol(value: any) {
  return typeof value === 'symbol';
}

export function isNull(value: any) {
  return value === null;
}

export function isUndefined(value: any) {
  return value === undefined;
}

export function isNullOrUndefined(value: any) {
  return value === undefined || value === null;
}

export function isNullOrEmpty(value: any) {
  return value === undefined || value === null || value === '';
}

export function isObject(value: any) {
  return !isArray(value) && value !== null && typeof value === 'object';
}

export function isBrowser() {
  return typeof window !== 'undefined';
}
