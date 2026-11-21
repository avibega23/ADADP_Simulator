import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { inconsolata } from "./fonts";
import { Toaster } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "ADADP Simulator",
  description: "A tool to simulate atmospheric drag physics",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full", inconsolata.className)}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Toaster>{children}</Toaster>
        <Analytics />
      </body>
    </html>
  );
}
