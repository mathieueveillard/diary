import type { FC } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useDeleteEntry } from "./api/use-delete-entry";
import { useEntry } from "./api/use-entry";
import { useUpdateEntry } from "./api/use-update-entry";
import { BackToDiaryLink } from "./components/BackToDiaryLink";
import { DeleteButton } from "./components/DeleteButton";
import { EditButton } from "./components/EditButton";
import { EntryForm } from "./components/EntryForm";
import { EntryLoading } from "./components/EntryLoading";
import { EntryNotFound } from "./components/EntryNotFound";
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
        <BackToDiaryLink />
      </nav>
      {status === "pending" && <EntryLoading />}
      {status === "error" && <EntryNotFound />}
      {entry && editing && (
        <EntryForm
          content={entry.content}
          pending={update.isPending}
          onSubmit={(input) => update.mutate(input, { onSuccess: read })}
          onCancel={() => (isBlankEntry(entry) ? discard() : read())}
        />
      )}
      {entry && !editing && (
        <>
          <EntryView createdAt={entry.createdAt} content={entry.content} />
          <div className="mt-6 flex gap-2">
            <EditButton onClick={() => setSearchParams("edit")} />
            <DeleteButton pending={remove.isPending} onClick={discard} />
          </div>
        </>
      )}
    </main>
  );
};
