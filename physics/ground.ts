import type { GroundDimensions, PhysicsObject } from "./types";

/*please note the the code written here only applies restituion on the bottom wall but we can also apply restituion on the upper walls too
 * if i decided in the architecture somehow but for now it's not needed so avinoor if your'e reading this just think about it. it's you who wrote this:) i'm just ur dumb past self.*/
export function resolveGroundCollision(
  object: PhysicsObject,
  ground: GroundDimensions,
  restitution?: number,
): PhysicsObject {
  const newObject: PhysicsObject = {
    ...object,
    position: { ...object.position },
    velocity: { ...object.velocity },
  };

  const top = newObject.position.y + newObject.radius;
  if (top >= ground.y) {
    newObject.position.y = ground.y - newObject.radius;
    newObject.velocity.y = -newObject.velocity.y;
  }

  const bottom = newObject.position.y - newObject.radius;
  if (bottom <= 0) {
    newObject.position.y = newObject.radius;
    newObject.velocity.y = -newObject.velocity.y * (restitution ?? 1);
  }

  const left = newObject.position.x - newObject.radius;
  if (left <= 0) {
    newObject.position.x = newObject.radius;
    newObject.velocity.x = -newObject.velocity.x;
  }

  const right = newObject.position.x + newObject.radius;
  if (right >= ground.x) {
    newObject.position.x = ground.x - newObject.radius;
    newObject.velocity.x = -newObject.velocity.x;
  }

  return newObject;
}
