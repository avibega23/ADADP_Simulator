import { PhysicsObject, Vector2 } from "@/physics/types";

export type SimulationState = {
  object: PhysicsObject;
  time: number;
  running: boolean;
};

export type SimulationConfig = {
  world: {
    width: number;
    height: number;
    gravity: Vector2;
  };

  object: {
    mass: number;
    radius: number;
    position: Vector2;
    inititalVelocity: Vector2;
  };

  collision: {
    restitution: number;
  };
};
