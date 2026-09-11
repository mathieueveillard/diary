import type { FC } from "react";
import ReactMarkdown from "react-markdown";
import { formatDateTime } from "../../../../helpers/format-date-time";

type Props = {
  createdAt: string;
  title: string;
  content: string;
};

export const EntryView: FC<Props> = ({ createdAt, title, content }) => (
  <article>
    <header className="mb-6">
      <time dateTime={createdAt} className="text-gray-500 tabular-nums">
        {formatDateTime(createdAt)}
      </time>
      <h1 className="text-2xl font-semibold">{title || "Untitled"}</h1>
    </header>
    <div className="markdown">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  </article>
);
