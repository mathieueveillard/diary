import type { FC } from "react";
import { join } from "../../../../helpers/join";

type Props = {
  pending: boolean;
  onClick: () => void;
};

export const NewEntryButton: FC<Props> = ({ pending, onClick }) => {
  const disabled = pending;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={join([
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        "rounded-md",
        "bg-violet-900 hover:bg-violet-800 transition-colors duration-[300ms] ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-950 disabled:opacity-50",
        "px-3 py-1.5",
        "text-sm font-medium text-white",
      ])}
    >
      New entry
    </button>
  );
};
