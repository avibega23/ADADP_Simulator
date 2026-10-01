"use client";
import { useRef } from "react";
import { Simulation } from "@/simulation/Simulation";
import { SimulationLoop } from "@/simulation/SimulationLoop";
import type { PhysicsObject } from "@/physics/types";
import { EARTH_GRAVITY } from "@/physics/constants";

interface simulationInput {
  createObject: (obect: PhysicsObject) => void;
}
interface simulationReturnType {
  playSimulation: () => void;
  resetSimulation: () => void;
  pauseSimulation: () => void;
}
const useSimulation = ({
  createObject,
}: simulationInput): simulationReturnType => {
  const simulationRef = useRef<Simulation | null>(null);
  const loopRef = useRef<SimulationLoop | null>(null);
  const renderFrameRef = useRef<number | null>(null);

  const createSimulation = () => {
    const object: PhysicsObject = {
      position: {
        x: 0.1,
        y: 0.3125 - 10 / 1600,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      acceleration: {
        x: 0,
        y: -EARTH_GRAVITY,
      },
      radius: 10 / 1600,
      mass: 1,
    };

    const simulation = new Simulation(object);
    const simulationLoop = new SimulationLoop(simulation);

    simulationRef.current = simulation;
    loopRef.current = simulationLoop;

    createObject(object);
  };

  const playSimulation = () => {
    if (!simulationRef.current) {
      createSimulation();
    }

    const loop = loopRef.current;

    if (!loop) return;

    const render = () => {
      const simulation = simulationRef.current;
      if (!simulation) return;
      const state = simulation.getState();
      createObject(state.object);
      renderFrameRef.current = requestAnimationFrame(render);
    };

    loopRef.current?.start();
    render();
  };
  const resetSimulation = () => {
    loopRef.current?.pause();

    if (renderFrameRef.current !== null) {
      cancelAnimationFrame(renderFrameRef.current);
      renderFrameRef.current = null;
    }
    createSimulation();
  };

  const pauseSimulation = () => {
    loopRef.current?.pause();
  };

  return {
    playSimulation,
    pauseSimulation,
    resetSimulation,
  };
};

export default useSimulation;
