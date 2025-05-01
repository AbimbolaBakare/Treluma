import { SelectHTMLAttributes, ReactNode } from "react";

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  icon?: ReactNode;
  options: { label: string; value: string }[];
}

export default function SelectInput({
  label,
  icon,
  id,
  options,
  className = "",
  ...props
}: SelectInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}
      <div
        className={`flex items-center border border-zinc-200 dark:border-zinc-700 rounded-md px-4 py-2 bg-white dark:bg-black ${className}`}
      >
        {icon && (
          <span className="mr-2 text-gray-500 dark:text-gray-400">{icon}</span>
        )}
        <select
          id={id}
          className="w-full bg-transparent outline-none text-sm text-black dark:text-white"
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
