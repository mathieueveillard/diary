import type { Entry, EntryInput } from "@diary/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchJson } from "../../../api/fetch-json";
import { entriesKey, entryKey } from "../../../api/query-keys";

export const useUpdateEntry = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: EntryInput) =>
      fetchJson<Entry>(`/api/entries/${id}`, { method: "PUT", body: JSON.stringify(input) }),
    onSuccess: (entry) => {
      queryClient.setQueryData(entryKey(entry.id), entry);
      void queryClient.invalidateQueries({ queryKey: entriesKey });
    },
  });
};
