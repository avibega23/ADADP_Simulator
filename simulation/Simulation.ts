import type { PhysicsObject } from "@/physics/types";
import { updateFreeFall } from "@/physics/freeFall";
import { resolveGroundCollision } from "@/physics/ground";

export class Simulation {
  private object: PhysicsObject;
  private time = 0;

  constructor(object: PhysicsObject) {
    this.object = object;
  }

  update(dt: number) {
    this.object = updateFreeFall(this.object, dt);
    this.object = resolveGroundCollision(
      this.object,
      { x: 0.5, y: 0.3125 },
      10 / 1600,
      1,
    );
    this.time += dt;
  }

  getState() {
    return {
      object: this.object,
      time: this.time,
    };
  }
}
