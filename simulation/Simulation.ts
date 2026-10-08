import type { PhysicsObject } from "@/physics/types";
import { updateFreeFall } from "@/physics/freeFall";
import { resolveGroundCollision } from "@/physics/ground";
import { SimulationConfig } from "./types";

export class Simulation {
  private config: SimulationConfig;
  private object: PhysicsObject;
  private time = 0;
  constructor(config: SimulationConfig) {
    this.config = config;
    this.object = {
      position: config.object.position,
      acceleration: {
        x: -config.world.gravity.x,
        y: -config.world.gravity.y,
      },
      radius: config.object.radius,
      velocity: config.object.inititalVelocity,
      mass: config.object.mass,
    };
  }

  update(dt: number) {
    this.object = updateFreeFall(this.object, dt);
    this.object = resolveGroundCollision(
      this.object,
      {
        x: this.config.world.width,
        y: this.config.world.height,
      },
      this.config.collision.restitution,
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
