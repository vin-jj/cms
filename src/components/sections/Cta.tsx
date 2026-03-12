import type { ReactNode } from "react";
import Button from "../common/Button";

type CtaProps = {
  actionLabel?: string;
  className?: string;
  eyebrow?: ReactNode;
  description?: ReactNode;
  title?: ReactNode;
};

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function Cta({
  actionLabel = "Get Start!",
  className,
  description = "Sign up in seconds and secure your 14-day free trial now.",
  eyebrow = "Stop Thinking.",
  title = "Start Transforming.",
}: CtaProps) {
  return (
    <section className={cx("flex w-full justify-center pt-20", className)}>
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-[30px] text-center">
        <div className="min-w-full type-h1">
          <p className="mb-0 text-mute-fg">{eyebrow}</p>
          <p className="mb-0 text-fg">{title}</p>
        </div>
        <p className="m-0 min-w-full font-pretendard type-body-md text-mute-fg">
          {description}
        </p>
        <Button arrow={false} size="large" variant="secondary">
          {actionLabel}
        </Button>
      </div>
    </section>
  );
}
