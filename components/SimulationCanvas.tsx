"use client";

import useCanvasScreenStore from "@/store/useCanvasScreenStore";
import type { RefObject } from "react";
import { useEffect, useRef } from "react";

interface SimulationCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export default function SimulationCanvas({ canvasRef }: SimulationCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const canvasDimensions = useCanvasScreenStore(
    (state) => state.canvasDimensions,
  );

  const setCanvasDimensions = useCanvasScreenStore(
    (state) => state.setCanvasDimensions,
  );

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setCanvasDimensions({
        x: width,
        y: height,
      });
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [setCanvasDimensions]);

  return (
    <div
      ref={containerRef}
      className="flex h-full min-h-0 w-full items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        width={canvasDimensions.x}
        height={canvasDimensions.y}
        className="block h-full w-full"
        style={{ backgroundColor: "red" }}
      />
    </div>
  );
}
