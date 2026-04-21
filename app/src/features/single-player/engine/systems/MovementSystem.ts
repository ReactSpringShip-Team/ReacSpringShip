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
      const input = entityManager.getComponent(id, "input");
      const isPlayer = input?.isPlayerControlled;

      if (isPlayer) {
        // Wrap logic for player ship
        if (pos.x + physics.radius > canvasWidth) pos.x = physics.radius;
        else if (pos.x - physics.radius < 0)
          pos.x = canvasWidth - physics.radius;

        if (pos.y + physics.radius > canvasHeight) pos.y = physics.radius;
        else if (pos.y - physics.radius < 0)
          pos.y = canvasHeight - physics.radius;
      } else {
        // Bounce logic for enemies
        if (pos.x + physics.radius > canvasWidth) {
          pos.x = canvasWidth - physics.radius;
          physics.velocity.x *= -1;
        } else if (pos.x - physics.radius < 0) {
          pos.x = physics.radius;
          physics.velocity.x *= -1;
        }

        if (pos.y + physics.radius > canvasHeight) {
          pos.y = canvasHeight - physics.radius;
          physics.velocity.y *= -1;
        } else if (pos.y - physics.radius < 0) {
          pos.y = physics.radius;
          physics.velocity.y *= -1;
        }
      }
    }
  }
}
