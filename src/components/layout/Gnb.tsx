"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Button from "../common/Button";

type GnbProps = {
  actionLabel?: string;
  className?: string;
  items?: string[];
  localeIcon?: ReactNode;
};

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}


export default function Gnb({
  actionLabel = "Free start!",
  className,
  items = ["Solutions", "Features", "Company", "Plans"],
  localeIcon,
}: GnbProps) {
  const [hasScrollBorder, setHasScrollBorder] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setHasScrollBorder(window.scrollY > 0);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 flex w-full items-center justify-center bg-[rgba(8,9,10,0.5)] backdrop-blur-[12px]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/15 transition-opacity duration-500",
          hasScrollBorder ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="flex h-[60px] w-full max-w-[1200px] items-center justify-between gap-6 text-fg">
        <a aria-label="QueryPie AI" className="inline-flex h-5 w-[116px] shrink-0 items-center text-fg" href="/">
          <img
            alt="QueryPie AI"
            className="block h-5 w-[116px]"
            src="/icons/querypie-ai-logo.svg"
          />
        </a>
        <div className="flex items-center gap-[30px]">
          <nav aria-label="Global" className="hidden items-center gap-[30px] md:flex">
            {items.map((item) => (
              <a
                key={item}
                className="font-pretendard type-body-md text-fg transition-colors hover:text-mute-fg"
                href="/"
              >
                {item}
              </a>
            ))}
          </nav>
          <button
            aria-label="Change language"
            className="hidden transition-opacity hover:opacity-50 md:inline-flex"
            type="button"
          >
            {localeIcon ?? (
              <img
                alt=""
                aria-hidden="true"
                className="h-6 w-6"
                src="/icons/global.svg"
              />
            )}
          </button>
          <Button arrow={false} variant="gnb">
            {actionLabel}
          </Button>
        </div>
      </div>
    </header>
  );
}
