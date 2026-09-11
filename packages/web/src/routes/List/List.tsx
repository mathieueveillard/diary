import type { FC } from "react";
import { Link, useNavigate } from "react-router";
import { useCreateEntry } from "./api/use-create-entry";
import { useEntries } from "./api/use-entries";
import { EntryHeadline } from "./components/EntryHeadline";
import { ListError } from "./components/ListError";
import { ListLoading } from "./components/ListLoading";
import { LoadMoreSentinel } from "./components/LoadMoreSentinel";
import { NewEntryButton } from "./components/NewEntryButton";
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
        <NewEntryButton
          pending={create.isPending}
          onClick={() =>
            create.mutate(
              { content: "" },
              { onSuccess: (entry) => void navigate(`/entries/${entry.id}?edit`) },
            )
          }
        />
      </header>
      {status === "pending" && <ListLoading />}
      {status === "error" && <ListError />}
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
