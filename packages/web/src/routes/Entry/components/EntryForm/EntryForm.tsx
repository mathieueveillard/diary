import type { EntryInput } from "@diary/api/types";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { CancelButton } from "./components/CancelButton";
import { SaveButton } from "./components/SaveButton";

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
        <SaveButton pending={pending} />
        <CancelButton onClick={onCancel} />
      </div>
    </form>
  );
};
