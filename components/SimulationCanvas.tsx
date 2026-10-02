"use client";

import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

interface SimulationCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export default function SimulationCanvas({ canvasRef }: SimulationCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [dim, setDim] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;

      setDim({
        width,
        height,
      });
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex h-full min-h-0 w-full items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        width={dim.width}
        height={dim.height}
        className="block"
        style={{ backgroundColor: "red" }}
      />
    </div>
  );
}
