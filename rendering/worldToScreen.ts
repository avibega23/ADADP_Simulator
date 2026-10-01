import type { PhysicsObject } from "@/physics/types";

const PIXELS_PER_METER = 1600;
const GROUND_Y = 500;

export function worldToScreen(object: PhysicsObject): PhysicsObject {
  return {
    ...object,
    position: {
      x: object.position.x * PIXELS_PER_METER,
      y: GROUND_Y - object.position.y * PIXELS_PER_METER,
    },
    radius: object.radius * PIXELS_PER_METER,
  };
}
