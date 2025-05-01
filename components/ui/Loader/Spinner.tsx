import { motion } from "framer-motion";
import clsx from "clsx";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-4",
};

export default function LoadingSpinner({
  size = "sm",
  color = "white",
}: LoadingSpinnerProps) {
  return (
    <motion.div
      role="status"
      aria-label="Loading"
      className={clsx(
        "rounded-full animate-spin border-t-transparent",
        sizeMap[size],
        `border-${color}`
      )}
    />
  );
}
