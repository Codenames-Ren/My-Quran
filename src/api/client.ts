import { API_BASE } from "./api.config";

type ApiFetchOptions = {
  basePath?: string;
  method?: "GET" | "POST";
  body?: unknown;
};

export async function apiFetch<T>(
  endpoint: string,
  options?: ApiFetchOptions,
): Promise<T> {
  const basePath = options?.basePath ?? "";
  const url = `${API_BASE}${basePath}${endpoint}`;

  const res = await fetch(url, {
    method: options?.method ?? "GET",
    headers: options?.body
      ? {
          "Content-Type": "application/json",
        }
      : undefined,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch API: ${url}`);
  }

  return res.json() as Promise<T>;
}