import type { EntryInput } from "@diary/api/types";
import type { FC } from "react";
import { useForm } from "react-hook-form";

type Props = {
  title: string;
  content: string;
  pending: boolean;
  onSubmit: (input: EntryInput) => void;
  onCancel: () => void;
};

export const EntryForm: FC<Props> = ({ title, content, pending, onSubmit, onCancel }) => {
  const { register, handleSubmit } = useForm<EntryInput>({ defaultValues: { title, content } });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <input
        type="text"
        {...register("title")}
        placeholder="Title"
        className="rounded border border-gray-300 px-2 py-1"
      />
      <textarea
        {...register("content")}
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
