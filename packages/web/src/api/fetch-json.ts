const NO_CONTENT = 204;

export const fetchJson = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!response.ok) {
    throw new Error(`${init?.method ?? "GET"} ${url} failed with status ${response.status}`);
  }
  if (response.status === NO_CONTENT) {
    return null as T;
  }
  return response.json() as Promise<T>;
};
