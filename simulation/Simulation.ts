import type { PhysicsObject } from "@/physics/types";
import { updateFreeFall } from "@/physics/freeFall";
<<<<<<< Updated upstream
=======
import { resolveGroundCollision } from "@/physics/ground";
>>>>>>> Stashed changes

export class Simulation {
  private object: PhysicsObject;
  private time = 0;

  constructor(object: PhysicsObject) {
    this.object = object;
  }

  update(dt: number) {
    this.object = updateFreeFall(this.object, dt);
<<<<<<< Updated upstream
=======
    this.object = resolveGroundCollision(
      this.object,
      { x: 0.5, y: 0.3125 },
      10 / 1600,
      2,
    );
>>>>>>> Stashed changes
    this.time += dt;
  }

  getState() {
    return {
      object: this.object,
      time: this.time,
    };
  }
}
