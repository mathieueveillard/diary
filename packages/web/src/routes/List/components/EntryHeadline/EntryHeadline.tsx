import type { FC } from "react";
import { formatDate } from "./helpers/format-date";

type Props = {
  date: string;
  title: string;
};

export const EntryHeadline: FC<Props> = ({ date, title }) => (
  <>
    <time dateTime={date} className="shrink-0 text-gray-500 tabular-nums">
      {formatDate(date)}
    </time>
    <span>{title || "Untitled"}</span>
  </>
);
