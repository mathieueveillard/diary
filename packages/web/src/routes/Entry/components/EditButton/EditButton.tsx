import type { FC } from "react";

type Props = {
  onClick: () => void;
};

export const EditButton: FC<Props> = ({ onClick }) => (
  <button type="button" onClick={onClick} className="rounded border border-gray-300 px-3 py-1">
    Edit
  </button>
);
