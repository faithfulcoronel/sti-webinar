import type { TextareaHTMLAttributes } from "react";
import { Field, controlClass } from "./Field";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string };

export function TextAreaField({ label, error, ...props }: Props) {
  return (
    <Field label={label} error={error}>
      <textarea {...props} aria-invalid={error ? true : undefined} className={`${controlClass} resize-none`} />
    </Field>
  );
}
