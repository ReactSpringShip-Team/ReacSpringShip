import { EntityManager } from "../ecs/EntityManager";

export class HealthSystem {
  public update(entityManager: EntityManager, deltaTime: number) {
    const entities = entityManager.getEntitiesWithComponents("health");

    for (const id of entities) {
      const health = entityManager.getComponent(id, "health")!;

      if (health.isInvulnerable) {
        health.invulnerabilityTimer += deltaTime;
        if (health.invulnerabilityTimer >= health.invulnerabilityDuration) {
          health.isInvulnerable = false;
          health.invulnerabilityTimer = 0;
        }
      }
    }
  }
}
