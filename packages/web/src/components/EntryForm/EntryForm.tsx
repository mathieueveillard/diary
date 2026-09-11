import type { EntryInput } from "@diary/api/types";
import type { FC } from "react";
import { useForm } from "react-hook-form";

type Props = {
  date: string;
  title: string;
  content: string;
  pending: boolean;
  onSubmit: (input: EntryInput) => void;
  onCancel: () => void;
};

export const EntryForm: FC<Props> = ({ date, title, content, pending, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EntryInput>({ defaultValues: { date, title, content } });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div className="flex gap-4">
        <input
          type="date"
          {...register("date", { required: true })}
          className="rounded border border-gray-300 px-2 py-1"
        />
        <input
          type="text"
          {...register("title")}
          placeholder="Title"
          className="flex-1 rounded border border-gray-300 px-2 py-1"
        />
      </div>
      {errors.date && <p className="text-sm text-red-600">A date is required.</p>}
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
