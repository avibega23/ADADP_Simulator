import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface NumberFieldProps {
  id: string;
  name: string;
  value: number;
  onChange: (value: number) => void;
  description?: string;
}

export default function NumberField({
  id,
  name,
  value,
  onChange,
  description,
}: NumberFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{name}</FieldLabel>
      <Input
        id={id}
        type="number"
        value={value === 0 ? "" : value}
        onChange={(event) => {
          const raw = event.target.value;

          if (raw === "") {
            onChange(0);
            return;
          }

          const next = Number(raw);
          if (Number.isNaN(next)) return;

          onChange(next);
        }}
      />
      {description ? <FieldDescription>{description}</FieldDescription> : null}
    </Field>
  );
}
