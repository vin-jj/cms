import type { InputHTMLAttributes } from "react";

type InputVariant = "input" | "dropdown";
type InputState = "default" | "focus" | "disable";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  state?: InputState;
  variant?: InputVariant;
};

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 8.5L12 15.5L19 8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Input({
  className,
  disabled,
  label,
  placeholder = "placeholder",
  readOnly,
  state = "default",
  value,
  variant = "input",
  ...props
}: InputProps) {
  const resolvedState = disabled ? "disable" : state;
  const isDropdown = variant === "dropdown";
  const hasBorder = resolvedState !== "default";

  return (
    <div
      className={cx(
        "inline-flex w-[240px] items-center overflow-hidden rounded-button bg-bg-content px-3 py-2.5",
        hasBorder && "border border-border",
        resolvedState === "disable" && "opacity-50",
        isDropdown && "gap-1.5",
        className,
      )}
      data-state={resolvedState}
      data-variant={variant}
    >
      {isDropdown ? (
        <>
          <span className="min-w-0 flex-1 font-pretendard type-body-md text-fg">
            {label ?? "dropdown"}
          </span>
          <ChevronDownIcon className="h-4 w-4 shrink-0 text-mute-fg" />
        </>
      ) : (
        <input
          className={cx(
            "min-w-0 flex-1 border-0 bg-transparent font-pretendard type-body-md outline-none",
            "type-body-md",
            resolvedState === "default" ? "text-mute-fg" : "text-fg",
            "placeholder:text-mute-fg",
          )}
          disabled={resolvedState === "disable"}
          placeholder={placeholder}
          readOnly={readOnly ?? resolvedState !== "default"}
          value={value}
          {...props}
        />
      )}
    </div>
  );
}
