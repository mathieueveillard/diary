import type { EntryPage } from "@diary/api/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchJson } from "../../../api/fetch-json";
import { entriesKey } from "../../../api/query-keys";

const PAGE_SIZE = 30;

const STALE_TIME = 5 * 60 * 1000;

const fetchPage = (cursor: string | null) => {
  const params = new URLSearchParams({ limit: String(PAGE_SIZE) });
  if (cursor) params.set("cursor", cursor);
  return fetchJson<EntryPage>(`/api/entries?${params}`);
};

// staleTime keeps the cached pages from refetching when the user comes back from
// an entry, which is what lets the list restore its scroll position in place.
export const useEntries = () =>
  useInfiniteQuery({
    queryKey: entriesKey,
    queryFn: ({ pageParam }) => fetchPage(pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: STALE_TIME,
  });
