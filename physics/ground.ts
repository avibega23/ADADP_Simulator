import type { GroundDimensions, PhysicsObject } from "./types";

export function resolveGroundCollision(
  object: PhysicsObject,
  ground: GroundDimensions,
  radius: number,
  restitution?: number,
): PhysicsObject {
  const bottom = object.position.y - radius;
  const top = object.position.y + radius;
  const left = object.position.x - radius;
  const right = object.position.x + radius;

  const newObject = object;
  if (top >= ground.y) {
    newObject.position.y = ground.y - radius;
    newObject.velocity.y = -newObject.velocity.y;
  }

  if (bottom <= 0) {
    newObject.position.y = radius;
    newObject.velocity.y = -newObject.velocity.y * (restitution ?? 1);
  }

  if (left <= 0) {
    newObject.position.x = radius;
    newObject.velocity.x = -newObject.velocity.x;
  }

  if (right >= ground.x) {
    newObject.position.x = ground.x - radius;
    newObject.velocity.x = -newObject.velocity.x;
  }

  return newObject;
}
