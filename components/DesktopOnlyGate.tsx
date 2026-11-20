import { inconsolata, shantellSans } from "@/app/fonts";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface DesktopOnlyGateProps {
  children: ReactNode;
}

export default function DesktopOnlyGate({ children }: DesktopOnlyGateProps) {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background px-8 text-center lg:hidden">
        <h1 className={cn("text-3xl text-foreground", inconsolata.className)}>
          ADADP Simulator
        </h1>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          This app is built for computer and laptop screens. Please open it on a
          desktop or laptop to experience the full simulator.
        </p>
      </div>
      <div className="hidden h-screen flex-col lg:flex">{children}</div>
    </>
  );
}
