import type { FC } from "react";
import ReactMarkdown from "react-markdown";
import { formatDateTime } from "../../../../helpers/format-date-time";

type Props = {
  createdAt: string;
  content: string;
};

export const EntryView: FC<Props> = ({ createdAt, content }) => (
  <article>
    <header className="mb-6">
      <time dateTime={createdAt} className="text-gray-500 tabular-nums">
        {formatDateTime(createdAt)}
      </time>
    </header>
    <div className="markdown">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  </article>
);
