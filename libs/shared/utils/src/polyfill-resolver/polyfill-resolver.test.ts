import {
  type PromiseWithResolvers,
  polyfillPromiseWithResolvers,
} from './polyfill-resolver'; // Ensure correct path

declare global {
  interface PromiseConstructor {
    withResolvers?<T>(): PromiseWithResolvers<T>;
  }
}

describe('polyfillPromiseWithResolvers', () => {
  beforeEach(() => {
    // Reset for testing
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (Promise as any).withResolvers = undefined; // Reset the polyfill
  });

  it('should add withResolvers if not available', () => {
    expect(Promise.withResolvers).toBeUndefined();

    polyfillPromiseWithResolvers();

    expect(Promise.withResolvers).toBeDefined();
  });

  it('should return a promise, resolve, and reject', async () => {
    polyfillPromiseWithResolvers();

    if (!Promise?.withResolvers) {
      throw new Error('Promise.withResolvers is not defined');
    }

    const { promise, resolve, reject } = Promise.withResolvers<number>();

    resolve(42);
    await expect(promise).resolves.toBe(42);

    const { promise: rejectPromise, reject: rejectFunc } =
      Promise.withResolvers<number>();
    rejectFunc(new Error('Test error'));
    await expect(rejectPromise).rejects.toThrow('Test error');
  });
});
