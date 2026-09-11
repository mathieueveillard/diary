const TITLE_PATTERN = /^#[^\S\n]+(\S.*?)\s*$/m;

/** The text of the first level-1 Markdown heading, or "" when the entry has none. */
export const extractTitle = (content: string): string => content.match(TITLE_PATTERN)?.[1] ?? "";
