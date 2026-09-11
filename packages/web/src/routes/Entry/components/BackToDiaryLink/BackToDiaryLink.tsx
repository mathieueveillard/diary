import type { FC } from "react";
import { Link } from "react-router";

export const BackToDiaryLink: FC = () => (
  <Link to="/" className="underline">
    ← Back to diary
  </Link>
);
