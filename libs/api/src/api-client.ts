interface ApiClientInterface<ClientType> {
  getClient(): ClientType;
}

export class ApiClient<ClientType, OptionsType>
  implements ApiClientInterface<ClientType>
{
  private client: ClientType;

  constructor(
    createClientFn: (baseUrl: string, options?: OptionsType) => ClientType,
    baseUrl: string,
    options?: OptionsType,
  ) {
    if (!createClientFn || typeof createClientFn !== 'function') {
      throw new Error('Invalid client creation function provided');
    }
    if (!baseUrl || typeof baseUrl !== 'string') {
      throw new Error('Invalid base URL provided');
    }

    this.client = createClientFn(baseUrl, options);
  }

  getClient(): ClientType {
    if (!this.client) {
      throw new Error('Client has not been initialized');
    }
    return this.client;
  }
}
