import { API_BASE } from "./api.config";

type ApiFetchOptions = {
  basePath?: string;
};

export async function apiFetch<T>(
  endpoint: string,
  options?: ApiFetchOptions,
): Promise<T> {
  const basePath = options?.basePath ?? "";
  const url = `${API_BASE}${basePath}${endpoint}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch API: ${url}`);
  }

  return res.json() as Promise<T>;
}
