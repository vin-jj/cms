import type { ButtonHTMLAttributes, ReactNode } from "react";

type TabState = "on" | "off" | "hover";

export type TabProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children?: ReactNode;
  state?: TabState;
};

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function Tab({
  children = "Tab",
  className,
  disabled,
  state = "on",
  type = "button",
  ...props
}: TabProps) {
  const resolvedState = disabled ? "off" : state;

  return (
    <button
      className={cx(
        "inline-flex items-center justify-center rounded-button px-5 py-2.5 font-pretendard type-button transition-colors",
        resolvedState === "on" && "bg-secondary text-fg",
        resolvedState === "hover" && "bg-transparent text-fg",
        resolvedState === "off" && "bg-transparent text-mute-fg",
        "cursor-pointer disabled:cursor-not-allowed",
        className,
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}
