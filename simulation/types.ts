import { PhysicsObject } from "@/physics/types";

export type SimulationState = {
  object: PhysicsObject;
  time: number;
  running: boolean;
};
