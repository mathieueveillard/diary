import type { FC } from "react";
import { Button } from "../../../../components/Button";

type Props = {
  pending: boolean;
  onClick: () => void;
};

export const NewEntryButton: FC<Props> = ({ pending, onClick }) => (
  <Button variant="CALL_TO_ACTION" disabled={pending} onClick={onClick}>
    New entry
  </Button>
);
