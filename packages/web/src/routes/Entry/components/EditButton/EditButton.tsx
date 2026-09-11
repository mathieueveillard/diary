import type { FC } from "react";
import { join } from "../../../../helpers/join";

type Props = {
  onClick: () => void;
};

export const EditButton: FC<Props> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={join([
      "cursor-pointer",
      "rounded",
      "border border-gray-300 hover:bg-gray-100 transition-colors duration-[300ms] ease-out",
      "px-3 py-1",
    ])}
  >
    Edit
  </button>
);
