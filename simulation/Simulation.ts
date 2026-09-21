import type { PhysicsObject } from "@/physics/types";
import { updateFreeFall } from "@/physics/freeFall";

export class Simulation {
  private object: PhysicsObject;
  private time = 0;

  constructor(object: PhysicsObject) {
    this.object = object;
  }

  update(dt: number) {
    this.object = updateFreeFall(this.object, dt);
    this.time += dt;
  }

  getState() {
    return {
      object: this.object,
      time: this.time,
    };
  }
}
