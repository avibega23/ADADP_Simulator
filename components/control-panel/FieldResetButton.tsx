"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface FieldResetButtonProps {
  disabled?: boolean;
  onReset: () => void;
  label?: string;
}

export default function FieldResetButton({
  disabled = false,
  onReset,
  label = "Reset to default",
}: FieldResetButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      disabled={disabled}
      aria-label={label}
      title={label}
      onClick={onReset}
      className="text-muted-foreground hover:text-foreground"
    >
      <RotateCcw />
    </Button>
  );
}
