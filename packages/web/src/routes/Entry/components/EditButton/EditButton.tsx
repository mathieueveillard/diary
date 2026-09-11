import type { FC } from "react";
import { Button } from "../../../../components/Button";

type Props = {
  onClick: () => void;
};

export const EditButton: FC<Props> = ({ onClick }) => (
  <Button variant="OUTLINED" onClick={onClick}>
    Edit
  </Button>
);
