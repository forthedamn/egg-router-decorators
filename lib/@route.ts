import { Middleware } from 'koa';
export enum HttpMethod {
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  POST= 'POST',
  DELETE= 'DELETE'
}

const ROUTE_PREFIX = '$_';

// @router 装饰器
export function route(path: string, method?: HttpMethod, ...middleware: Array<Middleware>) {
  return (target: any, key?: string | symbol, descriptor?: any): void => {
    // Decorator applied to Class
    if (typeof target === 'function' && key === undefined && descriptor === undefined) {
      if (path) {
        const renameKey = Object.keys(target.prototype).filter(key => /^\$_/.test(key));
        renameKey.forEach(key => {
          const addRoot = key.replace(' ', ` ${path}`);
          target.prototype[addRoot] = target.prototype[key];
          delete target.prototype[key];
        });
      }
      return;
    }
    // Decorator applied to method
    else if (typeof target === 'object') {
      const renamePath = `${ROUTE_PREFIX}${method} ${path}`;
      target[renamePath] = descriptor.value;
      return;
    }
  };
}
