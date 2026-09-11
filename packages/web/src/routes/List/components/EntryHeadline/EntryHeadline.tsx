import type { FC } from "react";
import { formatDateTime } from "../../../../helpers/format-date-time";

type Props = {
  createdAt: string;
  title: string;
};

export const EntryHeadline: FC<Props> = ({ createdAt, title }) => (
  <>
    <time dateTime={createdAt} className="shrink-0 text-gray-500 tabular-nums">
      {formatDateTime(createdAt)}
    </time>
    <span>{title || "Untitled"}</span>
  </>
);
