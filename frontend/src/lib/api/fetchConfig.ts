export const API_BASE = import.meta.env.DEV ? "http://localhost:8080" : "/";

export interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

export const defaultHeaders = {
  "Content-Type": "application/json",
};

export function createFetchOptions(options: FetchOptions = {}): FetchOptions {
  return {
    ...options,
    credentials: "include", // This ensures cookies are sent with requests
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
}

export function createUrl(endpoint: string): string {
  return `${API_BASE}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
}
