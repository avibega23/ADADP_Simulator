export type Vector2 = {
  x: number;
  y: number;
};

export type PhysicsObject = {
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
<<<<<<< Updated upstream

  mass: number;
};
=======
  radius: number;
  mass: number;
};

export type GroundDimensions = Vector2;
>>>>>>> Stashed changes
