import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchJson } from "../../../api/fetch-json";
import { entriesKey, entryKey } from "../../../api/query-keys";

export const useDeleteEntry = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => fetchJson<null>(`/api/entries/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: entryKey(id) });
      void queryClient.invalidateQueries({ queryKey: entriesKey });
    },
  });
};
