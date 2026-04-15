import { EntityManager } from "../ecs/EntityManager";

export class MovementSystem {
  public update(
    entityManager: EntityManager,
    canvasWidth: number,
    canvasHeight: number
  ) {
    const entities = entityManager.getEntitiesWithComponents("position", "physics");

    for (const id of entities) {
      const pos = entityManager.getComponent(id, "position")!;
      const physics = entityManager.getComponent(id, "physics")!;

      // Apply Friction
      physics.velocity.x *= physics.friction;
      physics.velocity.y *= physics.friction;

      // Apply velocity to position
      pos.x += physics.velocity.x;
      pos.y += physics.velocity.y;

      // Screen Border Logic
      if (pos.x + physics.radius > canvasWidth) pos.x = physics.radius;
      else if (pos.x - physics.radius < 0) pos.x = canvasWidth - physics.radius;

      if (pos.y + physics.radius > canvasHeight) pos.y = physics.radius;
      else if (pos.y - physics.radius < 0) pos.y = canvasHeight - physics.radius;
    }
  }
}
