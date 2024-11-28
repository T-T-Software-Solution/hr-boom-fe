import { env } from '../env';
import { ApiClient, type backofficePaths } from '@tt-ss-hr/api';
import createFetchClient, {
  type ClientOptions,
  type Middleware,
} from 'openapi-fetch';
import createClient from 'openapi-react-query';

const fetcherOptions: ClientOptions = {
  headers: {},
};

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    // fetch token, if it doesn't exist
    // if (!accessToken) {
    //   const authRes = await someAuthFunc();
    //   if (authRes.accessToken) {
    //     accessToken = authRes.accessToken;
    //   } else {
    //     // handle auth error
    //   }
    // }
    const accessToken = '';

    // add Authorization header to every request
    request.headers.set('Authorization', `Bearer ${accessToken}`);
    return request;
  },
};

const createFetchWrapper = <Paths extends {}>(
  baseUrl: string,
  options?: ClientOptions,
) => {
  const fetchClient = createFetchClient<Paths>({ baseUrl, ...options });
  fetchClient.use(authMiddleware);

  return fetchClient;
};

const createReactQueryWrapper = <Paths extends {}>(
  baseUrl: string,
  options?: ClientOptions,
) => {
  return createClient(createFetchWrapper<Paths>(baseUrl, options));
};

const backofficeRqClient = new ApiClient(
  (baseUrl, options) =>
    createReactQueryWrapper<backofficePaths>(baseUrl, options),
  env.NEXT_PUBLIC_API_BASE_URL,
  fetcherOptions,
);

const backofficeFetchClient = new ApiClient(
  (baseUrl, options) => createFetchWrapper<backofficePaths>(baseUrl, options),
  env.NEXT_PUBLIC_API_BASE_URL,
  fetcherOptions,
);

export interface ApiError {
  status?: number | null;
  title?: string | null;
  traceId?: string | null;
  type?: string | null;
  message?: string | null;
  errors?: {
    [key: string]: string[];
  };
}

export const $backofficeApi = {
  ...backofficeRqClient.getClient(),
  ...backofficeFetchClient.getClient(),
};
