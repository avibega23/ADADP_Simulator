export type Vector2 = {
  x: number;
  y: number;
};

export type PhysicsObject = {
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
  radius: number;
  mass: number;
};

export type GroundDimensions = Vector2;
