import { FIXED_DT } from "./constants";
import { Simulation } from "./Simulation";

export class SimulationLoop {
  private simulation: Simulation;
  private animationFrameId: number | null = null;
  private lastTime: number | null = null;

  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  start() {
    if (this.animationFrameId !== null) {
      return;
    }

    this.lastTime = null;

    let accumulator = 0;
    const loop = (currentTime: number) => {
      if (this.lastTime === null) {
        this.lastTime = currentTime;
      }

      const dt = (currentTime - this.lastTime) / 1000;
      accumulator += dt;
      while (accumulator >= FIXED_DT) {
        this.simulation.update(FIXED_DT);
        accumulator -= FIXED_DT;
      }

      this.lastTime = currentTime;

      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  stop() {
    if (this.animationFrameId === null) {
      return;
    }
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
    this.lastTime = null;
  }

  pause() {
    if (this.animationFrameId == null) {
      return;
    }

    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
  }
}
