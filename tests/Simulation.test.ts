import { describe, expect, test } from "vitest";
import { Simulation } from "@/simulation/Simulation";
import type { PhysicsObject } from "@/physics/types";
import { EARTH_GRAVITY } from "@/physics/constants";

describe("Simulation", () => {
  test("should advance the simulation", () => {
    const object: PhysicsObject = {
      position: {
        x: 0,
        y: 0,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      acceleration: {
        x: 0,
        y: 9.81,
      },
      mass: 1,
    };

    const simulation = new Simulation(object);

    simulation.update(1);

    const state = simulation.getState();

    expect(state.time).toBeCloseTo(1);
    expect(state.object.velocity.y).toBeCloseTo(EARTH_GRAVITY);
    expect(state.object.position.y).toBeCloseTo(4.905);
  });
});
