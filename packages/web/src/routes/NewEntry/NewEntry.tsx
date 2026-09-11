import type { FC } from "react";
import { Link, useNavigate } from "react-router";
import { EntryForm } from "../../components/EntryForm";
import { useCreateEntry } from "./api/use-create-entry";

export const NewEntry: FC = () => {
  const navigate = useNavigate();
  const create = useCreateEntry();

  return (
    <main className="mx-auto max-w-2xl p-6">
      <nav className="mb-6">
        <Link to="/" className="underline">
          ← Back to diary
        </Link>
      </nav>
      <h1 className="mb-6 text-2xl font-semibold">New entry</h1>
      <EntryForm
        title=""
        content=""
        pending={create.isPending}
        onSubmit={(input) =>
          create.mutate(input, {
            onSuccess: (entry) => void navigate(`/entries/${entry.id}`, { replace: true }),
          })
        }
        onCancel={() => void navigate("/")}
      />
    </main>
  );
};
