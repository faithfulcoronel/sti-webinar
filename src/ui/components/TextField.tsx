import type { InputHTMLAttributes } from "react";
import { Field, controlClass } from "./Field";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string };

export function TextField({ label, error, ...props }: Props) {
  return (
    <Field label={label} error={error}>
      <input {...props} aria-invalid={error ? true : undefined} className={controlClass} />
    </Field>
  );
}
