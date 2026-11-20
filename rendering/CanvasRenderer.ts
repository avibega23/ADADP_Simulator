"use client";
import { RefObject, useRef } from "react";
import { PhysicsObject } from "@/physics/types";
import { worldToScreen } from "./worldToScreen";
import { cssVar } from "@/lib/cssVar";

interface canvasRendererReturnType {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  createObject: (object: PhysicsObject) => void;
}
const useCanvasRenderer = (): canvasRendererReturnType => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const createObject = (object: PhysicsObject) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const screenObject = worldToScreen(object);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = cssVar("--canvas-background");
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(
      screenObject.position.x,
      screenObject.position.y,
      screenObject.radius,
      0,
      Math.PI * 2,
    );
    ctx.fillStyle = cssVar("--object-fill");
    ctx.fill();
  };

  return {
    canvasRef,
    createObject,
  };
};

export default useCanvasRenderer;
