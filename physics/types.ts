export type Vector2 = {
  x: number;
  y: number;
};

export type PhysicsObject = {
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;

  mass: number;
};
