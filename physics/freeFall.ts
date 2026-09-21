import { PhysicsObject } from "./types";
export function updateFreeFall(
  object: PhysicsObject,
  dt: number,
): PhysicsObject {
  const oldVelocity = object.velocity;
  const velocity = {
    x: object.velocity.x + object.acceleration.x * dt,
    y: object.velocity.y + object.acceleration.y * dt,
  };

  const position = {
    x: object.position.x + ((velocity.x + oldVelocity.x) / 2) * dt,
    y: object.position.y + ((velocity.y + oldVelocity.y) / 2) * dt,
  };

  return {
    ...object,
    position,
    velocity,
  };
}
