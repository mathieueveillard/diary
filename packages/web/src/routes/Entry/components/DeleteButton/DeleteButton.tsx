import type { FC } from "react";
import { join } from "../../../../helpers/join";

type Props = {
  pending: boolean;
  onClick: () => void;
};

export const DeleteButton: FC<Props> = ({ pending, onClick }) => {
  const disabled = pending;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={join([
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        "rounded",
        "border border-gray-300 hover:bg-red-50 transition-colors duration-[300ms] ease-out disabled:opacity-50",
        "px-3 py-1",
        "text-red-600",
      ])}
    >
      Delete
    </button>
  );
};
