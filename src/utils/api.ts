import { API_URL } from '@/config';
import { createLogger, serializeError } from '@/utils/logger';

import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

type RequestMetadata = {
  requestId: string;
  startedAt: number;
};

type ObservableAxiosRequestConfig = InternalAxiosRequestConfig & {
  metadata?: RequestMetadata;
};

const apiLogger = createLogger({ baseURL: API_URL });

const client = axios.create({
  baseURL: API_URL,
  timeout: 10_000,
});

client.interceptors.request.use((config) => {
  const observableConfig = config as ObservableAxiosRequestConfig;
  const requestId = crypto.randomUUID();

  observableConfig.metadata = {
    requestId,
    startedAt: Date.now(),
  };

  apiLogger.debug(
    {
      requestId,
      method: observableConfig.method?.toUpperCase(),
      url: observableConfig.url,
      params: observableConfig.params,
    },
    'API request started',
  );

  return observableConfig;
});

client.interceptors.response.use(
  (response) => {
    const observableConfig = response.config as ObservableAxiosRequestConfig;
    const durationMs = observableConfig.metadata
      ? Date.now() - observableConfig.metadata.startedAt
      : undefined;

    apiLogger.info(
      {
        requestId: observableConfig.metadata?.requestId,
        method: observableConfig.method?.toUpperCase(),
        url: observableConfig.url,
        status: response.status,
        durationMs,
      },
      'API request completed',
    );

    return response;
  },
  (error) => {
    const observableConfig = error.config as ObservableAxiosRequestConfig | undefined;
    const durationMs = observableConfig?.metadata
      ? Date.now() - observableConfig.metadata.startedAt
      : undefined;

    apiLogger.error(
      {
        requestId: observableConfig?.metadata?.requestId,
        method: observableConfig?.method?.toUpperCase(),
        url: observableConfig?.url,
        status: error.response?.status,
        durationMs,
        error: serializeError(error),
      },
      'API request failed',
    );

    return Promise.reject(error);
  },
);

export type GetOptions<TParams = Record<string, unknown>> = {
  params?: TParams;
  headers?: AxiosRequestConfig['headers'];
};

export const api = {
  async get<TResponse, TParams = Record<string, unknown>>(
    url: string,
    options?: GetOptions<TParams>,
  ): Promise<TResponse> {
    const { data } = await client.get<TResponse>(url, {
      params: options?.params,
      headers: options?.headers,
    });

    return data;
  },
};
