"use client";
import { useRef } from "react";
import { Simulation } from "@/simulation/Simulation";
import { SimulationLoop } from "@/simulation/SimulationLoop";
import type { PhysicsObject } from "@/physics/types";
import useControlPanelStore from "@/store/useControlPanelStore";
import { SimulationConfig } from "@/simulation/types";

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
    const state = useControlPanelStore.getState();
    const config: SimulationConfig = {
      world: {
        height: state.groundConfiguration.groundDimensions.y,
        width: state.groundConfiguration.groundDimensions.x,
        gravity: state.groundConfiguration.gravity,
      },
      object: {
        mass: state.objectConfiguration.mass,
        radius: state.objectConfiguration.radius,
        inititalVelocity: state.objectConfiguration.initialVelocity,
        position: state.objectConfiguration.position,
      },
      collision: {
        restitution: state.collisionConfiguration.restitution,
      },
    };

    const simulation = new Simulation(config);
    const simulationLoop = new SimulationLoop(simulation);

    simulationRef.current = simulation;
    loopRef.current = simulationLoop;

    createObject({
      position: state.objectConfiguration.position,
      acceleration: {
        x: -state.groundConfiguration.gravity.x,
        y: -state.groundConfiguration.gravity.y,
      },
      mass: state.objectConfiguration.mass,
      velocity: state.objectConfiguration.initialVelocity,
      radius: state.objectConfiguration.radius,
    });
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
