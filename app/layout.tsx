import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { inconsolata } from "./fonts";

export const metadata: Metadata = {
  title: "ADADP Simulator",
  description: "A tool to simulate atmospheric drag physics",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full", inconsolata.className)}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
