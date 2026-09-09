import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Component: FC<Props> = ({ children }) => <span>{children}</span>;
