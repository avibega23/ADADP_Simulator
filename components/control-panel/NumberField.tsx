"use client";

import FieldResetButton from "@/components/control-panel/FieldResetButton";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { clamp } from "@/lib/clamp";
import { useState } from "react";

interface NumberFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  /** "live" commits valid numbers as you type; "blur" waits for blur/Enter. */
  commitMode?: "live" | "blur";
  disabled?: boolean;
}

function parseCommitted(
  raw: string,
  min?: number,
  max?: number,
): number | null {
  if (raw.trim() === "" || raw === "-" || raw === "." || raw === "-.") {
    return null;
  }

  let next = Number(raw);
  if (Number.isNaN(next)) return null;

  if (min !== undefined || max !== undefined) {
    next = clamp(
      next,
      min ?? Number.NEGATIVE_INFINITY,
      max ?? Number.POSITIVE_INFINITY,
    );
  }

  return next;
}

export default function NumberField({
  id,
  label,
  value,
  onChange,
  description,
  min,
  max,
  step = 1,
  defaultValue,
  commitMode = "blur",
  disabled = false,
}: NumberFieldProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const display = draft ?? String(value);

  const commit = (raw: string, clearDraft: boolean) => {
    const next = parseCommitted(raw, min, max);
    if (next === null) {
      if (clearDraft) setDraft(null);
      return;
    }

    if (next !== value) onChange(next);
    if (clearDraft) setDraft(null);
    else setDraft(String(next));
  };

  const isDefault =
    defaultValue === undefined || Math.abs(value - defaultValue) < 1e-9;

  return (
    <Field>
      <div className="flex items-center justify-between gap-2">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {defaultValue !== undefined ? (
          <FieldResetButton
            disabled={disabled || isDefault}
            onReset={() => {
              setDraft(null);
              onChange(defaultValue);
            }}
          />
        ) : null}
      </div>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        step={step}
        min={min}
        max={max}
        disabled={disabled}
        readOnly={disabled}
        value={display}
        onFocus={() => {
          if (disabled) return;
          setDraft(String(value));
        }}
        onChange={(event) => {
          if (disabled) return;
          const raw = event.target.value;
          setDraft(raw);
          if (commitMode === "live") {
            const next = parseCommitted(raw, min, max);
            if (next !== null && next !== value) onChange(next);
          }
        }}
        onBlur={() => {
          if (disabled) return;
          commit(draft ?? String(value), true);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
        }}
      />
      {description ? <FieldDescription>{description}</FieldDescription> : null}
    </Field>
  );
}
