"use client";

import { useEffect, useRef } from "react";
import { Simulation } from "@/simulation/Simulation";
import { SimulationLoop } from "@/simulation/SimulationLoop";
import type { PhysicsObject } from "@/physics/types";
import { EARTH_GRAVITY } from "@/physics/constants";

export default function SimulationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const object: PhysicsObject = {
      position: {
        x: 400,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      acceleration: {
        x: 0,
        y: EARTH_GRAVITY,
      },
      mass: 1,
    };

    const simulation = new Simulation(object);
    const loop = new SimulationLoop(simulation);

    const render = () => {
      const state = simulation.getState();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(0, 500);
      ctx.lineTo(canvas.width, 500);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        state.object.position.x,
        state.object.position.y,
        10,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      requestAnimationFrame(render);
    };

    loop.start();
    render();

    return () => {
      loop.stop();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={500}
      style={{ backgroundColor: "red" }}
    />
  );
}
