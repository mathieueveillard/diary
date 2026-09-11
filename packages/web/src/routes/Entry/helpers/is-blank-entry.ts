import type { EntryInput } from "@diary/api/types";

export const isBlankEntry = ({ title, content }: EntryInput): boolean =>
  title === "" && content === "";
