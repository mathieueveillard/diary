import { cva, type VariantProps } from "class-variance-authority";
import type { FC, ReactNode } from "react";

const buttonVariants = cva(
  [
    "rounded-md",
    "transition-colors duration-[300ms] ease-out disabled:opacity-50",
    "px-3 py-1.5",
    "text-sm font-medium",
  ],
  {
    variants: {
      variant: {
        CALL_TO_ACTION: "bg-violet-900 text-white hover:bg-violet-800",
        QUIET: "text-gray-700 hover:bg-gray-100",
        OUTLINED: "border border-gray-300 hover:bg-gray-100",
        DESTRUCTIVE: "border border-gray-300 text-red-600 hover:bg-red-50",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);

type Variant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;

type Props = {
  variant: Variant;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

export const Button: FC<Props> = ({ variant, type = "button", disabled = false, onClick, children }) => (
  <button type={type} disabled={disabled} onClick={onClick} className={buttonVariants({ variant, disabled })}>
    {children}
  </button>
);
