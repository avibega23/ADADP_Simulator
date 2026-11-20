"use client";

import { shantellSans } from "@/app/fonts";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pause, Play, RotateCcw } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  isPlaying: boolean;
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.22.682-.48 0-.24-.009-.87-.014-1.71-2.782.6-3.369-1.34-3.369-1.34-.454-1.16-1.11-1.47-1.11-1.47-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.09 2.91.83.092-.647.35-1.09.636-1.34-2.22-.25-4.555-1.11-4.555-4.94 0-1.09.39-1.98 1.029-2.68-.103-.253-.446-1.27.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.59 1.028 2.68 0 3.84-2.339 4.68-4.566 4.93.359.31.678.92.678 1.855 0 1.34-.012 2.42-.012 2.75 0 .27.18.58.688.48A10.01 10.01 0 0 0 22 12c0-5.523-4.477-10-10-10Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

const Navbar = ({ onPause, onPlay, onReset, isPlaying }: NavbarProps) => {
  return (
    <nav className="z-10 flex items-center justify-between bg-card px-16 py-4 shadow-cream-xs">
      <Link
        href="/"
        className={cn("cursor-pointer text-2xl", shantellSans.className)}
      >
        ADADP Simulator
      </Link>

      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={isPlaying ? onPause : onPlay}
          aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
        >
          {isPlaying ? (
            <>
              <Pause data-icon="inline-start" />
              Pause
            </>
          ) : (
            <>
              <Play data-icon="inline-start" />
              Play
            </>
          )}
        </Button>
        <Button variant="secondary" size="sm" onClick={onReset}>
          <RotateCcw data-icon="inline-start" />
          Reset
        </Button>
      </div>

      <div className="flex items-center gap-1">
        <a
          href="https://github.com/avibega23/adadp_simulator"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          <GitHubIcon className="size-3.5" />
          GitHub
        </a>
        <a
          href="https://x.com/avibega23"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          <XIcon className="size-3.5" />
          Twitter
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
