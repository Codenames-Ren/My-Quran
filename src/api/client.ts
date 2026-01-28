const BASE_URL = "https://equran.id/api/v2";

export async function apiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error("Failed to fetch API");
  }

  return res.json() as Promise<T>;
}
