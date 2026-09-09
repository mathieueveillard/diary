import type { FC } from "react";
import { Link } from "react-router";
import { useEntries } from "./api/use-entries";
import { EntryHeadline } from "./components/EntryHeadline";
import { LoadMoreSentinel } from "./components/LoadMoreSentinel";
import { useRestoreScrollPosition } from "./hooks/use-restore-scroll-position";

export const List: FC = () => {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } = useEntries();
  useRestoreScrollPosition(status === "success");

  const items = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <main className="mx-auto max-w-2xl p-6">
      <header className="mb-6 flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">Diary</h1>
        <Link to="/entries/new" className="underline">
          New entry
        </Link>
      </header>
      {status === "pending" && <p className="text-gray-500">Loading…</p>}
      {status === "error" && <p className="text-red-600">Failed to load entries.</p>}
      <ul className="divide-y divide-gray-200">
        {items.map(({ id, date, title }) => (
          <li key={id}>
            <Link to={`/entries/${id}`} className="flex gap-4 py-3 hover:bg-gray-50">
              <EntryHeadline date={date} title={title} />
            </Link>
          </li>
        ))}
      </ul>
      {hasNextPage && <LoadMoreSentinel onVisible={fetchNextPage} disabled={isFetchingNextPage} />}
    </main>
  );
};
