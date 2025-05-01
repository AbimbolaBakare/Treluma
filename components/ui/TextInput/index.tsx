import { InputHTMLAttributes, ReactNode } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
}

export default function TextInput({
  label,
  icon,
  error,
  id,
  className = "",
  ...props
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}
      <div
        className={`flex items-center border border-zinc-200 dark:border-zinc-700 rounded-md px-4 py-2 bg-white dark:bg-black focus-within:ring-2 focus-within:ring-teal-500 ${className}`}
      >
        {icon && (
          <span className="mr-2 text-gray-500 dark:text-gray-400">{icon}</span>
        )}
        <input
          id={id}
          className="w-full bg-transparent outline-none text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="text-sm text-red-500"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
