"use client";

import FieldResetButton from "@/components/control-panel/FieldResetButton";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { clamp } from "@/lib/clamp";

interface SliderFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  description?: string;
  formatValue?: (value: number) => string;
  defaultValue?: number;
  disabled?: boolean;
}

export default function SliderField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  description,
  formatValue = (v) => String(v),
  defaultValue,
  disabled = false,
}: SliderFieldProps) {
  const safeMax = max > min ? max : min + step;
  const safeValue = clamp(value, min, safeMax);
  const safeDefault =
    defaultValue === undefined
      ? undefined
      : clamp(defaultValue, min, safeMax);
  const isDefault =
    safeDefault === undefined ||
    Math.abs(safeValue - safeDefault) < (step > 0 ? step / 2 : 1e-6);

  return (
    <Field>
      <div className="flex items-center justify-between gap-3">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <div className="flex items-center gap-1">
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {formatValue(safeValue)}
          </span>
          {safeDefault !== undefined ? (
            <FieldResetButton
              disabled={disabled || isDefault}
              onReset={() => onChange(safeDefault)}
            />
          ) : null}
        </div>
      </div>
      <Slider
        id={id}
        min={min}
        max={safeMax}
        step={step}
        value={safeValue}
        disabled={disabled}
        onValueChange={(next) => {
          if (disabled) return;
          const numeric = typeof next === "number" ? next : next[0];
          onChange(clamp(numeric, min, safeMax));
        }}
      />
      {description ? <FieldDescription>{description}</FieldDescription> : null}
    </Field>
  );
}
