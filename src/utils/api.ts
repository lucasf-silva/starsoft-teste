import { API_URL } from '@/config';

import axios, { AxiosRequestConfig } from 'axios';

const client = axios.create({
  baseURL: API_URL,
  timeout: 10_000,
});

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
