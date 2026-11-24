import type { SelectHTMLAttributes } from "react";
import { Field, controlClass } from "./Field";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  placeholder: string;
  options: readonly string[];
};

export function SelectField({ label, error, placeholder, options, ...props }: Props) {
  return (
    <Field label={label} error={error}>
      <select {...props} defaultValue="" aria-invalid={error ? true : undefined} className={controlClass}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </Field>
  );
}
