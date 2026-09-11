import type { FC } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { useDeleteEntry } from "./api/use-delete-entry";
import { useEntry } from "./api/use-entry";
import { useUpdateEntry } from "./api/use-update-entry";
import { EntryForm } from "./components/EntryForm";
import { EntryView } from "./components/EntryView";
import { isBlankEntry } from "./helpers/is-blank-entry";

export const Entry: FC = () => {
  const { id = "" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: entry, status } = useEntry(id);
  const update = useUpdateEntry(id);
  const remove = useDeleteEntry(id);

  const editing = searchParams.has("edit");

  const read = () => setSearchParams({}, { replace: true });

  const discard = () => remove.mutate(undefined, { onSuccess: () => void navigate("/") });

  return (
    <main className="mx-auto max-w-2xl p-6">
      <nav className="mb-6">
        <Link to="/" className="underline">
          ← Back to diary
        </Link>
      </nav>
      {status === "pending" && <p className="text-gray-500">Loading…</p>}
      {status === "error" && <p className="text-red-600">Entry not found.</p>}
      {entry && editing && (
        <EntryForm
          title={entry.title}
          content={entry.content}
          pending={update.isPending}
          onSubmit={(input) => update.mutate(input, { onSuccess: read })}
          onCancel={() => (isBlankEntry(entry) ? discard() : read())}
        />
      )}
      {entry && !editing && (
        <>
          <EntryView createdAt={entry.createdAt} title={entry.title} content={entry.content} />
          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={() => setSearchParams("edit")}
              className="rounded border border-gray-300 px-3 py-1"
            >
              Edit
            </button>
            <button
              type="button"
              disabled={remove.isPending}
              onClick={discard}
              className="rounded border border-gray-300 px-3 py-1 text-red-600 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </main>
  );
};
