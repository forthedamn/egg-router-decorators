import { isDecoratorMethod, methodParse } from './util';

/**
 * routr.get('/', controller.home.index)
 *
 * @export
 * @param {*} app
 */
export function loadRoute(app) {
  const { router, controller } = app;
  Object.keys(controller).forEach((key) => {
    const controllerClass = controller[key];
    if (controllerClass) {
      Object.keys(controllerClass).forEach((methodName) => {
        if (isDecoratorMethod(methodName)) {
          const { method, path } = methodParse(methodName);
          router[method](path, controllerClass[methodName]);
        }
      })
    }
  });
}
