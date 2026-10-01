<<<<<<< Updated upstream
=======
import { FIXED_DT } from "./constants";
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
    let accumulator = 0;
>>>>>>> Stashed changes
    const loop = (currentTime: number) => {
      if (this.lastTime === null) {
        this.lastTime = currentTime;
      }

      const dt = (currentTime - this.lastTime) / 1000;
<<<<<<< Updated upstream

      this.lastTime = currentTime;

      this.simulation.update(dt);

=======
      accumulator += dt;
      while (accumulator >= FIXED_DT) {
        this.simulation.update(FIXED_DT);
        accumulator -= FIXED_DT;
      }

      this.lastTime = currentTime;

>>>>>>> Stashed changes
      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  stop() {
    if (this.animationFrameId === null) {
      return;
    }
<<<<<<< Updated upstream

    cancelAnimationFrame(this.animationFrameId);

    this.animationFrameId = null;
    this.lastTime = null;
  }
=======
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
>>>>>>> Stashed changes
}
