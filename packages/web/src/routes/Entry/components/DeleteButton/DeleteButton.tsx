import type { FC } from "react";
import { Button } from "../../../../components/Button";

type Props = {
  pending: boolean;
  onClick: () => void;
};

export const DeleteButton: FC<Props> = ({ pending, onClick }) => (
  <Button variant="DESTRUCTIVE" disabled={pending} onClick={onClick}>
    Delete
  </Button>
);
