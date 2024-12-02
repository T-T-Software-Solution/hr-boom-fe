import { ApiClient, type shoppingPaths } from '@tt-ss-hr/api';
import createFetchClient, { type ClientOptions } from 'openapi-fetch';
import createClient from 'openapi-react-query';

const fetcherOptions: ClientOptions = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjkxZTM3NDU5LWU4N2QtNDYzZi1iZWM2LTM3YTg5ZmIwNTZjMCIsImdpdmVuX25hbWUiOiJyYXR0aGFwb2wgc2siLCJuYmYiOjE3MjUyNjM5MzAsImV4cCI6MTcyNTM1MDMzMCwiaWF0IjoxNzI1MjYzOTMwLCJpc3MiOiJkZW1vIiwiYXVkIjoiZGVtbyJ9.Qrv1ngaZZRq3FuAqGT0ogENiePwNv7CkpeuWubU3AJI',
  },
};

const createClientWrapper = <Paths extends {}>(
  baseUrl: string,
  options?: ClientOptions,
) => {
  const fetchClient = createFetchClient<Paths>({ baseUrl, ...options });

  return createClient(fetchClient);
};

const apiClient = new ApiClient(
  (baseUrl, options) => createClientWrapper<shoppingPaths>(baseUrl, options),
  'https://localhost:7272',
  fetcherOptions,
);

export const $api = apiClient.getClient();
