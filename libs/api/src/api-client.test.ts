import { beforeAll, describe, expect, it, vi } from 'vitest';
import { ApiClient } from './api-client';
import { type MockClient, createMockClient } from './mock';

vi.mock('./mock-schema', () => ({
  createMockClient: vi.fn(),
}));

describe('ApiClient test with mock client', () => {
  let apiClient: ApiClient<MockClient, { headers: { 'Content-Type': string } }>;
  let mockClient: MockClient;

  beforeAll(() => {
    mockClient = createMockClient();
    apiClient = new ApiClient(() => mockClient, 'https://example.com', {
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('should fetch health check data successfully', async () => {
    const response = await apiClient.getClient().GET('/api/Health/check');

    expect(response.data).toEqual('Healthy');
  });

  it('should handle fetch error for health check', async () => {
    vi.spyOn(mockClient, 'GET').mockRejectedValueOnce(
      new Error('Network Error'),
    );

    await expect(
      apiClient.getClient().GET('/api/Health/check'),
    ).rejects.toThrow('Network Error');
  });
});
