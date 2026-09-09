import type { FC } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  date: string;
  title: string;
  content: string;
};

export const EntryView: FC<Props> = ({ date, title, content }) => (
  <article>
    <header className="mb-6">
      <time dateTime={date} className="text-gray-500 tabular-nums">
        {date}
      </time>
      <h1 className="text-2xl font-semibold">{title || "Untitled"}</h1>
    </header>
    <div className="markdown">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  </article>
);
