import { EntityManager, type EntityId } from "../ecs/EntityManager";
import type { Velocity } from "../../interfaces/Velocity.interface";
import type { PositionComponent, PhysicsComponent, HealthComponent } from "../components";

export class CollisionSystem {
  public update(entityManager: EntityManager) {
    const entities = entityManager.getEntitiesWithComponents(
      "position",
      "physics"
    );

    const playerIds: EntityId[] = [];
    const enemyIds: EntityId[] = [];
    const bulletIds: EntityId[] = [];

    for (const id of entities) {
      const input = entityManager.getComponent(id, "input");
      const physics = entityManager.getComponent(id, "physics")!;

      if (input?.isPlayerControlled) {
        playerIds.push(id);
      } else if (physics.radius <= 5) {
        bulletIds.push(id);
      } else {
        enemyIds.push(id);
      }
    }

    this.handleEnemyEnemyCollisions(enemyIds, entityManager);
    this.handlePlayerEnemyCollisions(playerIds, enemyIds, entityManager);
    this.handleBulletEnemyCollisions(bulletIds, enemyIds, entityManager);
  }

  private handleBulletEnemyCollisions(
    bulletIds: EntityId[],
    enemyIds: EntityId[],
    entityManager: EntityManager
  ) {
    for (const bId of bulletIds) {
      const bPos = entityManager.getComponent(bId, "position");
      const bPhys = entityManager.getComponent(bId, "physics");
      if (!bPos || !bPhys) continue;

      for (const eId of enemyIds) {
        const ePos = entityManager.getComponent(eId, "position");
        const ePhys = entityManager.getComponent(eId, "physics");
        
        if (!ePos || !ePhys) continue;

        const distSqr = this.getDistanceSqr(bPos.x, bPos.y, ePos.x, ePos.y);
        const radiusSum = bPhys.radius + ePhys.radius;

        if (distSqr < radiusSum * radiusSum) {
          entityManager.removeEntity(eId);
          entityManager.removeEntity(bId);
          break; 
        }
      }
    }
  }

  private handleEnemyEnemyCollisions(
    enemyIds: EntityId[],
    entityManager: EntityManager
  ) {
    for (let i = 0; i < enemyIds.length; i++) {
      for (let j = i + 1; j < enemyIds.length; j++) {
        const id1 = enemyIds[i];
        const id2 = enemyIds[j];

        const pos1 = entityManager.getComponent(id1, "position");
        const pos2 = entityManager.getComponent(id2, "position");
        const phys1 = entityManager.getComponent(id1, "physics");
        const phys2 = entityManager.getComponent(id2, "physics");

        if (!pos1 || !pos2 || !phys1 || !phys2) continue;

        const distSqr = this.getDistanceSqr(pos1.x, pos1.y, pos2.x, pos2.y);
        const radiusSum = phys1.radius + phys2.radius;

        if (distSqr < radiusSum * radiusSum) {
          this.resolveElasticCollision(phys1, pos1, phys2, pos2);
        }
      }
    }
  }

  private handlePlayerEnemyCollisions(
    playerIds: EntityId[],
    enemyIds: EntityId[],
    entityManager: EntityManager
  ) {
    for (const pId of playerIds) {
      const pPos = entityManager.getComponent(pId, "position");
      const pPhys = entityManager.getComponent(pId, "physics");
      const pHealth = entityManager.getComponent(pId, "health");
      
      if (!pPos || !pPhys || !pHealth) continue;
      
      if (pHealth.isInvulnerable) continue;

      for (const eId of enemyIds) {
        const ePos = entityManager.getComponent(eId, "position");
        const ePhys = entityManager.getComponent(eId, "physics");

        if (!ePos || !ePhys) continue;

        const distSqr = this.getDistanceSqr(pPos.x, pPos.y, ePos.x, ePos.y);
        const radiusSum = pPhys.radius + ePhys.radius;

        if (distSqr < radiusSum * radiusSum) {
          pHealth.lives--;
          pHealth.isInvulnerable = true;
          pHealth.invulnerabilityTimer = 0;
          
          console.log(`¡Jugador golpeado! Vidas restantes: ${pHealth.lives}`);
          
          entityManager.removeEntity(eId); 
          break; 
        }
      }
    }
  }

  private getDistanceSqr(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number {
    return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
  }

  private rotate(velocity: Velocity, angle: number): Velocity {
    return {
      x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
      y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
    };
  }

  private resolveElasticCollision(
    phys1: PhysicsComponent,
    pos1: PositionComponent,
    phys2: PhysicsComponent,
    pos2: PositionComponent
  ) {
    const xDist = pos2.x - pos1.x;
    const yDist = pos2.y - pos1.y;

    const xVelocityDiff = phys1.velocity.x - phys2.velocity.x;
    const yVelocityDiff = phys1.velocity.y - phys2.velocity.y;

    // Prevent objects from getting stuck inside each other
    if (xDist * xVelocityDiff + yDist * yVelocityDiff >= 0) {
      const angle = -Math.atan2(yDist, xDist);

      const m1 = phys1.mass;
      const m2 = phys2.mass;

      const u1 = this.rotate(phys1.velocity, angle);
      const u2 = this.rotate(phys2.velocity, angle);

      const v1 = {
        x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
        y: u1.y,
      };
      const v2 = {
        x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
        y: u2.y,
      };

      const vFinal1 = this.rotate(v1, -angle);
      const vFinal2 = this.rotate(v2, -angle);

      phys1.velocity.x = vFinal1.x;
      phys1.velocity.y = vFinal1.y;

      phys2.velocity.x = vFinal2.x;
      phys2.velocity.y = vFinal2.y;
    }
  }
}
