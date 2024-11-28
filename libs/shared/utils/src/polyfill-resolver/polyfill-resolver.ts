/**
 * Polyfill for Promise.withResolvers if it's not available.
 */
declare global {
  interface PromiseConstructor {
    withResolvers?<T>(): PromiseWithResolvers<T>;
  }
}

export type PromiseWithResolvers<T> = {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
};

export const polyfillPromiseWithResolvers = () => {
  if (!Promise?.withResolvers) {
    Promise.withResolvers = <T>(): PromiseWithResolvers<T> => {
      let resolve: (value: T | PromiseLike<T>) => void = () => {};
      let reject: (reason?: unknown) => void = () => {};

      const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
      });

      return { promise, resolve, reject };
    };
  }
};
