import { describe, expect, test } from "vitest";
import { updateFreeFall } from "@/physics/freeFall";
import { PhysicsObject } from "@/physics/types";
import { EARTH_GRAVITY } from "@/physics/constants";

describe("updateFreeFall", () => {
  test("it should increase downward velocity of the object", () => {
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
        y: EARTH_GRAVITY,
      },
      mass: 1,
    };
    const result = updateFreeFall(object, 1);
    expect(result.velocity.y).toBeCloseTo(9.81);
  });
  test("it should change the position of the object", () => {
    let object: PhysicsObject = {
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
        y: EARTH_GRAVITY,
      },
      mass: 1,
    };
    for (let i = 0; i < 5; i++) {
      object = updateFreeFall(object, 1);
    }

    expect(object?.position.y).toBeCloseTo(122.583125, 2);
  });
});
