import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { motion } from "framer-motion";
import type { MotionProps } from "framer-motion";
import clsx from "clsx";
import Spinner from "@/components/ui/Loader/Spinner";

type ButtonProps = {
  children: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      isLoading = false,
      fullWidth = false,
      variant = "primary",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "px-4 py-2 rounded-md text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

    const styles = {
      primary:
        "bg-gradient-to-r from-teal-400 to-blue-500 text-white hover:opacity-90 disabled:opacity-50",
      secondary:
        "bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-600 disabled:opacity-50",
    };

    return (
      <motion.button
        ref={ref}
        type="button"
        whileTap={{ scale: 0.97 }}
        className={clsx(
          base,
          styles[variant],
          fullWidth && "w-full",
          className,
          "cursor-pointer"
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner size="md" color="zinc-200" />
            <span className="text-sm">Loading...</span>
          </div>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
