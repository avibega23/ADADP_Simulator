import { describe, expect, test } from "vitest";
import { Simulation } from "../simulation/Simulation";
import { SimulationConfig } from "../simulation/types";
import { EARTH_GRAVITY } from "../physics/constants";

describe("Simulation", () => {
  test("should advance the simulation", () => {
    const config: SimulationConfig = {
      object: {
        inititalVelocity: {
          x: 0,
          y: 0,
        },
        mass: 10,
        radius: 10,
        position: {
          x: 200,
          y: 50,
        },
      },
      world: {
        width: 800,
        height: 500,
        gravity: {
          x: 0,
          y: EARTH_GRAVITY,
        },
      },
      collision: {
        restitution: 0,
      },
    };

    const simulation = new Simulation(config);

    simulation.update(1);

    const state = simulation.getState();

    expect(state.time).toBeCloseTo(1);
    expect(state.object.velocity.y).toBeCloseTo(-EARTH_GRAVITY);
    expect(state.object.position.y).toBeCloseTo(50 - 4.905);
  });
});
