const PREFIX = /^\$_/;

export function isDecoratorMethod(name) {
  return PREFIX.test(name);
}

/**
 * $_ GET /api/user  => {method: get, path: /api/user}
 *
 * @export
 * @param {string} name
 * @returns
 */
export function methodParse(name: string) {
  const arr = name.split(' ');
  const method = arr[0].replace(PREFIX, '').toLocaleLowerCase();
  const path = arr[1];
  return { method, path };
}
