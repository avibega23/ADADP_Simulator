import type { GroundDimensions, PhysicsObject } from "./types";

export function resolveGroundCollision(
  object: PhysicsObject,
  ground: GroundDimensions,
  restitution?: number,
): PhysicsObject {
  const bottom = object.position.y - object.radius;
  const top = object.position.y + object.radius;
  const left = object.position.x - object.radius;
  const right = object.position.x + object.radius;

  const newObject = object;
  if (top >= ground.y) {
    newObject.position.y = ground.y - object.radius;
    newObject.velocity.y = -newObject.velocity.y;
  }

  if (bottom <= 0) {
    newObject.position.y = object.radius;
    newObject.velocity.y = -newObject.velocity.y * (restitution ?? 1);
  }

  if (left <= 0) {
    newObject.position.x = object.radius;
    newObject.velocity.x = -newObject.velocity.x;
  }

  if (right >= ground.x) {
    newObject.position.x = ground.x - object.radius;
    newObject.velocity.x = -newObject.velocity.x;
  }

  return newObject;
}
