import { useEffect, useRef, type FC } from "react";

type Props = {
  onVisible: () => void;
  disabled: boolean;
};

export const LoadMoreSentinel: FC<Props> = ({ onVisible, disabled }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || disabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) onVisible();
      },
      { rootMargin: "200px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [onVisible, disabled]);

  return <div ref={ref} className="h-px" />;
};
