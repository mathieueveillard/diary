import type { EntryInput } from "@diary/api/types";
import { useState, type FC, type FormEvent } from "react";

type Props = {
  date: string;
  title: string;
  content: string;
  pending: boolean;
  onSubmit: (input: EntryInput) => void;
  onCancel: () => void;
};

export const EntryForm: FC<Props> = ({
  date: initialDate,
  title: initialTitle,
  content: initialContent,
  pending,
  onSubmit,
  onCancel,
}) => {
  const [date, setDate] = useState(initialDate);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ date, title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
          className="rounded border border-gray-300 px-2 py-1"
        />
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          className="flex-1 rounded border border-gray-300 px-2 py-1"
        />
      </div>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write in Markdown…"
        rows={20}
        className="rounded border border-gray-300 p-2 font-mono text-sm"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-gray-900 px-3 py-1 text-white disabled:opacity-50"
        >
          Save
        </button>
        <button type="button" onClick={onCancel} className="rounded border border-gray-300 px-3 py-1">
          Cancel
        </button>
      </div>
    </form>
  );
};
