"use client";
import { useEffect, useRef, useState } from "react";
import { Simulation } from "@/simulation/Simulation";
import { SimulationLoop } from "@/simulation/SimulationLoop";
import type { PhysicsObject } from "@/physics/types";
import useControlPanelStore from "@/store/useControlPanelStore";
import { SimulationConfig } from "@/simulation/types";
import useCanvasScreenStore from "@/store/useCanvasScreenStore";
import { syncPpm } from "@/lib/ppmSyncer";
import { fitObjectToWorld } from "@/lib/fitObjectToWorld";
import { notifySimulationStopped } from "@/lib/simulationToasts";
import useTelemetryStore from "@/store/useTelemetryStore";

interface simulationInput {
  createObject: (obect: PhysicsObject) => void;
}
interface simulationReturnType {
  playSimulation: () => void;
  resetSimulation: () => void;
  pauseSimulation: () => void;
  applyConfig: () => void;
  isPlaying: boolean;
}
const useSimulation = ({
  createObject,
}: simulationInput): simulationReturnType => {
  const simulationRef = useRef<Simulation | null>(null);
  const loopRef = useRef<SimulationLoop | null>(null);
  const renderFrameRef = useRef<number | null>(null);
  const playingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasMountedCanvasRef = useRef(false);

  const drawOneFrame = () => {
    const simulation = simulationRef.current;
    if (!simulation) return;
    const { object, time } = simulation.getState();
    createObject(object);
    const speed = Math.hypot(object.velocity.x, object.velocity.y);
    useTelemetryStore.getState().pushSample({
      t: time,
      x: object.position.x,
      y: object.position.y,
      vx: object.velocity.x,
      vy: object.velocity.y,
      ax: object.acceleration.x,
      ay: object.acceleration.y,
      speed,
      ke: 0.5 * object.mass * speed * speed,
    });
  };

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

    drawOneFrame();
  };

  const playSimulation = () => {
    if (!simulationRef.current) {
      applyConfig();
    }

    if (playingRef.current) return;

    playingRef.current = true;
    setIsPlaying(true);

    loopRef.current?.start();

    const loop = loopRef.current;

    if (!loop) return;

    const render = () => {
      if (!playingRef.current) return;
      drawOneFrame();
      renderFrameRef.current = requestAnimationFrame(render);
    };

    render();
  };
  const resetSimulation = () => {
    const wasPlaying = playingRef.current;
    fitObjectToWorld();
    applyConfig();
    if (wasPlaying) {
      notifySimulationStopped("reset");
    }
  };

  const pauseSimulation = () => {
    playingRef.current = false;
    setIsPlaying(false);
    loopRef.current?.pause();

    if (renderFrameRef.current !== null) {
      cancelAnimationFrame(renderFrameRef.current);
      renderFrameRef.current = null;
    }
  };

  const applyConfig = () => {
    useTelemetryStore.getState().clearSamples();
    pauseSimulation();
    createSimulation();
  };

  const { x, y } = useCanvasScreenStore((s) => s.canvasDimensions);
  useEffect(() => {
    if (x <= 0 || y <= 0) return;

    const wasPlaying = playingRef.current;
    syncPpm("canvas");
    fitObjectToWorld();
    applyConfig();

    // Skip the initial canvas measure — only toast real resizes while playing.
    if (hasMountedCanvasRef.current && wasPlaying) {
      notifySimulationStopped("resize");
    }
    hasMountedCanvasRef.current = true;
  }, [x, y]);

  return {
    playSimulation,
    pauseSimulation,
    resetSimulation,
    applyConfig,
    isPlaying,
  };
};

export default useSimulation;
