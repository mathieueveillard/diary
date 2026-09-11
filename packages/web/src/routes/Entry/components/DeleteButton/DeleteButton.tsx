import type { FC } from "react";

type Props = {
  pending: boolean;
  onClick: () => void;
};

export const DeleteButton: FC<Props> = ({ pending, onClick }) => (
  <button
    type="button"
    disabled={pending}
    onClick={onClick}
    className="rounded border border-gray-300 px-3 py-1 text-red-600 disabled:opacity-50"
  >
    Delete
  </button>
);
