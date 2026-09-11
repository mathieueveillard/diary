import type { FC } from "react";

type Props = {
  pending: boolean;
  onClick: () => void;
};

export const NewEntryButton: FC<Props> = ({ pending, onClick }) => (
  <button
    type="button"
    disabled={pending}
    onClick={onClick}
    className="rounded-md bg-violet-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-950 disabled:opacity-50"
  >
    New entry
  </button>
);
