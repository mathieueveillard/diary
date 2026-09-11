import type { FC } from "react";
import { Link, useNavigate } from "react-router";
import { useCreateEntry } from "./api/use-create-entry";
import { useEntries } from "./api/use-entries";
import { EntryHeadline } from "./components/EntryHeadline";
import { LoadMoreSentinel } from "./components/LoadMoreSentinel";
import { extractTitle } from "./helpers/extract-title";
import { useRestoreScrollPosition } from "./hooks/use-restore-scroll-position";

export const List: FC = () => {
  const navigate = useNavigate();
  const create = useCreateEntry();
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } = useEntries();
  useRestoreScrollPosition(status === "success");

  const items = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <main className="mx-auto max-w-2xl p-6">
      <header className="mb-6 flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">Diary</h1>
        <button
          type="button"
          disabled={create.isPending}
          onClick={() =>
            create.mutate(
              { content: "" },
              { onSuccess: (entry) => void navigate(`/entries/${entry.id}?edit`) },
            )
          }
          className="rounded-md bg-violet-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-950 disabled:opacity-50"
        >
          New entry
        </button>
      </header>
      {status === "pending" && <p className="text-gray-500">Loading…</p>}
      {status === "error" && <p className="text-red-600">Failed to load entries.</p>}
      <ul className="divide-y divide-gray-200">
        {items.map(({ id, createdAt, content }) => (
          <li key={id}>
            <Link to={`/entries/${id}`} className="flex gap-4 py-3 hover:bg-gray-50">
              <EntryHeadline createdAt={createdAt} title={extractTitle(content)} />
            </Link>
          </li>
        ))}
      </ul>
      {hasNextPage && <LoadMoreSentinel onVisible={fetchNextPage} disabled={isFetchingNextPage} />}
    </main>
  );
};
