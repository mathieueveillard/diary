import type { FC } from "react";
import { Button } from "../../../../../../components/Button";

type Props = {
  pending: boolean;
};

export const SaveButton: FC<Props> = ({ pending }) => (
  <Button variant="CALL_TO_ACTION" type="submit" disabled={pending}>
    Save
  </Button>
);
