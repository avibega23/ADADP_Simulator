"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RotateCcw } from "lucide-react";
import type { ReactNode } from "react";

interface PanelSectionProps {
  title: string;
  children: ReactNode;
  showSeparator?: boolean;
  disabled?: boolean;
  onResetSection?: () => void;
  isSectionDefault?: boolean;
}

export default function PanelSection({
  title,
  children,
  showSeparator = true,
  disabled = false,
  onResetSection,
  isSectionDefault = false,
}: PanelSectionProps) {
  const resetDisabled = disabled || isSectionDefault;

  return (
    <section className="flex flex-col gap-4">
      {showSeparator ? <Separator className="bg-border" /> : null}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {title}
        </h2>
        {onResetSection ? (
          <AlertDialog>
            <AlertDialogTrigger
              disabled={resetDisabled}
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  disabled={resetDisabled}
                  aria-label={`Reset ${title} to defaults`}
                  title={`Reset ${title} to defaults`}
                  className="text-muted-foreground hover:text-foreground"
                />
              }
            >
              <RotateCcw />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia>
                  <RotateCcw />
                </AlertDialogMedia>
                <AlertDialogTitle>Reset {title}?</AlertDialogTitle>
                <AlertDialogDescription>
                  This restores all {title.toLowerCase()} settings to their
                  defaults. Your current values in this section will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onResetSection}>
                  Reset
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
