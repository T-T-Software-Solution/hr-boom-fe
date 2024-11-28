export interface MockSchema {
  paths: {
    '/api/Health/check': {
      get: {
        responses: {
          /** @description Success */
          200: {
            content: {
              'text/plain': string;
              'application/json': string;
              'text/json': string;
            };
          };
        };
      };
    };
  };
}

export type MockClient = {
  GET: <T extends keyof MockSchema['paths']>(
    path: T,
    params?: Record<string, unknown>,
  ) => Promise<{
    data: MockSchema['paths'][T]['get']['responses'][200]['content']['application/json'];
  }>;
};

export const createMockClient = (): MockClient => ({
  GET: async <T extends keyof MockSchema['paths']>(
    path: T,
    params?: Record<string, unknown>,
  ): Promise<{
    data: MockSchema['paths'][T]['get']['responses'][200]['content']['application/json'];
  }> => {
    if (path === '/api/Health/check') {
      return { data: 'Healthy' };
    }
    throw new Error(`Unhandled path: ${path}`);
  },
});
