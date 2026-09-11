import type { EntryInput } from "@diary/api/types";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { join } from "../../../../helpers/join";

type Props = {
  content: string;
  pending: boolean;
  onSubmit: (input: EntryInput) => void;
  onCancel: () => void;
};

export const EntryForm: FC<Props> = ({ content, pending, onSubmit, onCancel }) => {
  const { register, handleSubmit } = useForm<EntryInput>({ defaultValues: { content } });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <textarea
        {...register("content")}
        placeholder="Write in Markdown… start with # for a title"
        rows={20}
        className="rounded border border-gray-300 p-2 font-mono text-sm"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className={join([
            pending ? "cursor-not-allowed" : "cursor-pointer",
            "rounded-md",
            "bg-violet-900 hover:bg-violet-800 transition-colors duration-[300ms] ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-950 disabled:opacity-50",
            "px-3 py-1.5",
            "text-sm font-medium text-white",
          ])}
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={join([
            "cursor-pointer",
            "rounded-md",
            "hover:bg-gray-100 transition-colors duration-[300ms] ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-950",
            "px-3 py-1.5",
            "text-sm font-medium text-gray-700",
          ])}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
