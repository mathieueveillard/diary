import type { EntryInput } from "@diary/api/types";

export const isBlankEntry = ({ content }: EntryInput): boolean => content === "";
