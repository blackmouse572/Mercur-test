import { cn } from "@/lib/utils"

import { LoaderIcon } from "@/icons"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "tonal" | "text" | "destructive"
  size?: "small" | "large"
  loading?: boolean
}

export function Button({
  children,
  variant = "filled",
  size = "small",
  loading = false,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    "text-md button-text rounded-sm disabled:bg-disabled disabled:text-disabled dark:bg-action-tertiary dark:hover:bg-action-tertiary-hover dark:active:bg-action-tertiary-pressed dark:disabled:bg-disabled flex items-center justify-center"

  const variantClasses = {
    filled: `bg-action text-action-on-primary hover:bg-action-hover active:bg-action-pressed ${
      loading && "button-text-filled"
    }`,
    tonal:
      "bg-action-secondary hover:bg-action-secondary-hover active:bg-action-secondary-pressed text-action-on-secondary",
    text: "bg-primary dark:bg-primary hover:bg-action-secondary-hover active:bg-action-secondary-pressed text-primary",
    destructive: `text-negative-on-primary bg-negative hover:bg-negative-hover active:bg-negative-pressed ${
      loading && "button-text-filled"
    }`,
  }

  const sizeClasses = {
    small: "h-9 px-4",
    large: "h-12 px-4",
  }

  return (
    <button
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        baseClasses,
        className
      )}
      {...props}
    >
      {loading ? <LoaderIcon className="animate-spin" /> : children}
    </button>
  )
}
