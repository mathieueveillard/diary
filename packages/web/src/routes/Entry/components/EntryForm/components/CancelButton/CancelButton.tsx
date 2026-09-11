import type { FC } from "react";
import { Button } from "../../../../../../components/Button";

type Props = {
  onClick: () => void;
};

export const CancelButton: FC<Props> = ({ onClick }) => (
  <Button variant="QUIET" onClick={onClick}>
    Cancel
  </Button>
);
