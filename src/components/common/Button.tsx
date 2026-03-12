import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "gnb" | "text";
type ButtonSize = "small" | "default" | "large";
type ButtonState = "default" | "hover" | "disable";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  arrow?: boolean;
  children?: ReactNode;
  size?: ButtonSize;
  state?: ButtonState;
  variant?: ButtonVariant;
};

type ButtonStyleConfig = {
  container: string;
  text: string;
  iconSize: string;
};

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function getButtonStyle(
  variant: ButtonVariant,
  size: ButtonSize,
  state: ButtonState,
): ButtonStyleConfig {
  if (variant === "text") {
    return {
      container: cx(
        "inline-flex items-center justify-center gap-1.5 rounded-button bg-transparent p-0 transition-colors",
        state === "disable" && "opacity-40",
      ),
      text: cx(
        "font-pretendard type-body-md hover:text-mute-fg transition-colors",
        state === "hover" ? "text-mute-fg" : "text-fg",
      ),
      iconSize: "h-4 w-4",
    };
  }

  if (variant === "gnb") {
    return {
      container: cx(
        "inline-flex items-center justify-center gap-1.5 rounded-button px-4 py-2 transition-colors hover:bg-primary",
        state === "hover" ? "bg-primary" : "bg-secondary",
        state === "disable" && "opacity-40",
      ),
      text: cx(
        "font-pretendard type-body-md hover:text-bg transition-colors",
        state === "hover" ? "text-bg" : "text-fg",
      ),
      iconSize: "h-4 w-4",
    };
  }

  const isLarge = size === "large";

  return {
    container: cx(
      "inline-flex items-center justify-center rounded-button transition-colors",
      isLarge ? "gap-2 px-7 py-3" : "gap-1.5 px-5 py-2.5",
      variant === "outline" &&
        cx(
          state === "hover" ? "border border-primary bg-transparent" : "border border-secondary bg-transparent",
          "hover:border-primary",
        ),
      variant === "primary" &&
        cx(state === "hover" ? "bg-secondary" : "bg-primary", "hover:bg-secondary"),
      variant === "secondary" &&
        cx(state === "hover" ? "bg-primary" : "bg-secondary", "hover:bg-primary"),
      state === "disable" && "opacity-40",
    ),
    text: cx(
      "font-pretendard type-button transition-colors",
      variant === "primary" || (variant === "secondary" && state === "hover")
        ? "text-bg"
        : "text-fg",
      variant === "secondary" && "hover:text-bg",
    ),
    iconSize: "h-4 w-4",
  };
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 6.5L21.5 12.5M21.5 12.5L15.5 18.5M21.5 12.5H3.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Button({
  arrow = true,
  children = "Button",
  className,
  disabled,
  size = "small",
  state = "default",
  type = "button",
  variant = "gnb",
  ...props
}: ButtonProps) {
  const resolvedState = disabled ? "disable" : state;
  const styles = getButtonStyle(variant, size, resolvedState);

  return (
    <button
      className={cx(
        styles.container,
        styles.text,
        "cursor-pointer disabled:cursor-not-allowed",
        className,
      )}
      disabled={resolvedState === "disable"}
      type={type}
      {...props}
    >
      <span>{children}</span>
      {arrow ? <ArrowRightIcon className={styles.iconSize} /> : null}
    </button>
  );
}
