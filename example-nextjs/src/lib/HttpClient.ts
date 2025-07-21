import { BACKEND_URI } from "@/env";
import urlJoin from "url-join";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
}

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {}, credentials = 'include' } = options;

    const res = await fetch(urlJoin(this.baseUrl, url), {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials,
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`HTTP error ${res.status}: ${errorBody}`);
    }

    return this.parseResponse<T>(res);
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('Content-Type');

    if (!contentType) {
      return response.text() as unknown as T;
    }

    if (contentType.includes('application/json')) {
      return response.json();
    }

    if (contentType.includes('text/')) {
      return response.text() as unknown as T;
    }

    if (contentType.includes('application/octet-stream')) {
      return response.arrayBuffer() as unknown as T;
    }

    if (contentType.includes('application/')) {
      return response.blob() as unknown as T;
    }

    return response.text() as unknown as T;
  }

  get<T>(url: string, headers?: Record<string, string>) {
    return this.request<T>(url, { method: 'GET', headers });
  }

  post<T>(url: string, body: unknown, headers?: Record<string, string>) {
    return this.request<T>(url, { method: 'POST', body, headers });
  }

  put<T>(url: string, body: unknown, headers?: Record<string, string>) {
    return this.request<T>(url, { method: 'PUT', body, headers });
  }

  delete<T>(url: string, headers?: Record<string, string>) {
    return this.request<T>(url, { method: 'DELETE', headers });
  }
}

export const BeHttpClient = new HttpClient(BACKEND_URI);