import { useState, type FC } from "react";
import { Link, useParams } from "react-router";
import { EntryForm } from "../../components/EntryForm";
import { useEntry } from "./api/use-entry";
import { useUpdateEntry } from "./api/use-update-entry";
import { EntryView } from "./components/EntryView";

export const Entry: FC = () => {
  const id = Number(useParams().id);
  const { data: entry, status } = useEntry(id);
  const update = useUpdateEntry(id);
  const [editing, setEditing] = useState(false);

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
          date={entry.date}
          title={entry.title}
          content={entry.content}
          pending={update.isPending}
          onSubmit={(input) => update.mutate(input, { onSuccess: () => setEditing(false) })}
          onCancel={() => setEditing(false)}
        />
      )}
      {entry && !editing && (
        <>
          <EntryView date={entry.date} title={entry.title} content={entry.content} />
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="mt-6 rounded border border-gray-300 px-3 py-1"
          >
            Edit
          </button>
        </>
      )}
    </main>
  );
};
