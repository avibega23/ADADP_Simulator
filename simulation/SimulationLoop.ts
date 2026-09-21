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

    const loop = (currentTime: number) => {
      if (this.lastTime === null) {
        this.lastTime = currentTime;
      }

      const dt = (currentTime - this.lastTime) / 1000;

      this.lastTime = currentTime;

      this.simulation.update(dt);

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
}
