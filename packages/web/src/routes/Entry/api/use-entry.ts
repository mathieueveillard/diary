import type { Entry } from "@diary/api/types";
import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../../../api/fetch-json";
import { entryKey } from "../../../api/query-keys";

export const useEntry = (id: string) =>
  useQuery({
    queryKey: entryKey(id),
    queryFn: () => fetchJson<Entry>(`/api/entries/${id}`),
  });
