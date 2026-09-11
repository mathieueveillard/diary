import type { FC } from "react";
import { Link } from "react-router";
import { formatDateTime } from "../../../../helpers/format-date-time";

type Props = {
  id: string;
  createdAt: string;
  title: string;
};

export const EntryHeadline: FC<Props> = ({ id, createdAt, title }) => (
  <Link to={`/entries/${id}`} className="flex gap-4 py-3 hover:bg-gray-50">
    <time dateTime={createdAt} className="shrink-0 text-gray-500 tabular-nums">
      {formatDateTime(createdAt)}
    </time>
    <span>{title || "Untitled"}</span>
  </Link>
);
