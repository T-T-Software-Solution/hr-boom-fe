'use client';

import { ApiClient, type shoppingPaths } from '@tt-ss-hr/api';
import createFetchClient, { type ClientOptions } from 'openapi-fetch';
import createClient from 'openapi-react-query';
import { useState } from 'react';

const fetcherOptions: ClientOptions = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjE0ODgzNTdmLWJmZjUtNDI5Mi05Yjk4LTg2NDAzMjMwZmM1OCIsImdpdmVuX25hbWUiOiJKb2huIERvZSIsIm5iZiI6MTcyNDg1OTI3MCwiZXhwIjoxNzI0OTQ1NjcwLCJpYXQiOjE3MjQ4NTkyNzAsImlzcyI6ImRlbW8iLCJhdWQiOiJkZW1vIn0.T2xDKSo9Lc6Hkqqxu6_uK5A189kNxmumx5RFxRi139w',
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

const $api = apiClient.getClient();

export default function UseOpenApiReactQueryExample() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);

  // Health API
  const {
    data: health,
    isLoading: healthLoading,
    error: healthError,
  } = $api.useQuery('get', '/api/Health', {
    parseAs: 'text',
  });

  // AuditLogs API
  const { data: auditLogs, isLoading: auditLogsLoading } = $api.useQuery(
    'get',
    '/api/AuditLogs',
    {
      params: { query: { pageNo: 1, pageSize: 10 } },
    },
  );

  // Carts API
  const createCartMutation = $api.useMutation('post', '/api/Carts/create');
  // const { data: cart } = $api.useQuery('get', '/api/Carts/{id}', { params: { path: { id: 'example-id' } } });
  const { data: carts } = $api.useQuery('get', '/api/Carts/list', {
    params: { query: { pageNo: 1, pageSize: 10 } },
  });
  const updateCartMutation = $api.useMutation('put', '/api/Carts/update/{id}');
  const deleteCartMutation = $api.useMutation(
    'delete',
    '/api/Carts/delete/{id}',
  );

  // Products API
  const createProductMutation = $api.useMutation(
    'post',
    '/api/Products/create',
  );
  // const { data: product } = $api.useQuery('get', '/api/Products/{id}', { params: { path: { id: 'example-id' } } });
  const { data: products } = $api.useQuery('get', '/api/Products/list', {
    params: { query: { pageNo: 1, pageSize: 10 } },
  });
  const updateProductMutation = $api.useMutation(
    'put',
    '/api/Products/update/{id}',
  );
  const deleteProductMutation = $api.useMutation(
    'delete',
    '/api/Products/delete/{id}',
  );

  // Users API
  const createUserMutation = $api.useMutation('post', '/api/Users/create');
  // const { data: user } = $api.useQuery('get', '/api/Users/{id}', { params: { path: { id: 'example-id' } } });
  const { data: users } = $api.useQuery('get', '/api/Users/list', {
    params: { query: { pageNo: 1, pageSize: 10 } },
  });
  const updateUserMutation = $api.useMutation('put', '/api/Users/update/{id}');
  const deleteUserMutation = $api.useMutation(
    'delete',
    '/api/Users/delete/{id}',
  );

  // Tokens API
  const createTokenMutation = $api.useMutation('post', '/api/Tokens');
  const { data: authCheck } = $api.useQuery('get', '/api/Tokens/CheckAuth', {
    parseAs: 'text',
  });

  // Learns API
  const { data: oneWayLearn } = $api.useQuery(
    'get',
    '/api/Learns/1/OneWay/{input}',
    { params: { path: { input: 'example' } } },
  );
  const twoWayLearnMutation = $api.useMutation('post', '/api/Learns/2/TwoWay');
  const chainCallsMutation = $api.useMutation(
    'put',
    '/api/Learns/3/ChainCalls',
  );
  const { data: correlation } = $api.useQuery(
    'get',
    '/api/Learns/4/Correlation',
  );

  if (healthLoading || auditLogsLoading) return <div>กำลังโหลด...</div>;
  if (healthError) return <div>เกิดข้อผิดพลาด: {JSON.stringify(healthError)}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        ตัวอย่างการใช้ OpenAPI React Query
      </h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">เลือก Endpoint:</h2>
        <select
          value={selectedEndpoint || ''}
          onChange={(e) => setSelectedEndpoint(e.target.value)}
          className="mt-2 p-2 border rounded"
        >
          <option value="">เลือก Endpoint</option>
          <option value="health">Health</option>
          <option value="auditLogs">Audit Logs</option>
          <option value="carts">Carts</option>
          <option value="products">Products</option>
          <option value="users">Users</option>
          <option value="tokens">Tokens</option>
          <option value="learns">Learns</option>
        </select>
      </div>

      {selectedEndpoint === 'health' && (
        <div>
          <h3 className="text-lg font-semibold">Health Status:</h3>
          <pre>{JSON.stringify(health, null, 2)}</pre>
        </div>
      )}

      {selectedEndpoint === 'auditLogs' && (
        <div>
          <h3 className="text-lg font-semibold">Audit Logs:</h3>
          <pre>{JSON.stringify(auditLogs, null, 2)}</pre>
        </div>
      )}

      {selectedEndpoint === 'carts' && (
        <div>
          <h3 className="text-lg font-semibold">Carts:</h3>
          <pre>{JSON.stringify(carts, null, 2)}</pre>
        </div>
      )}

      {selectedEndpoint === 'products' && (
        <div>
          <h3 className="text-lg font-semibold">Products:</h3>
          <pre>{JSON.stringify(products, null, 2)}</pre>
        </div>
      )}

      {selectedEndpoint === 'users' && (
        <div>
          <h3 className="text-lg font-semibold">Users:</h3>
          <pre>{JSON.stringify(users, null, 2)}</pre>
        </div>
      )}

      {selectedEndpoint === 'tokens' && (
        <div>
          <h3 className="text-lg font-semibold">Auth Check:</h3>
          <pre>{JSON.stringify(authCheck, null, 2)}</pre>
        </div>
      )}

      {selectedEndpoint === 'learns' && (
        <div>
          <h3 className="text-lg font-semibold">Correlation:</h3>
          <pre>{JSON.stringify(correlation, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
