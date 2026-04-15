import { EntityManager } from "../ecs/EntityManager";

export class InputSystem {
  private myKeys: Record<string, { pressed: boolean }> = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
    space: { pressed: false },
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (key === " ") this.myKeys.space.pressed = true;
    if (this.myKeys[key]) this.myKeys[key].pressed = true;
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (key === " ") this.myKeys.space.pressed = false;
    if (this.myKeys[key]) this.myKeys[key].pressed = false;
  };

  constructor() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  public destroy() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  public update(entityManager: EntityManager) {
    const entities = entityManager.getEntitiesWithComponents(
      "input",
      "physics",
      "position"
    );

    for (const id of entities) {
      const input = entityManager.getComponent(id, "input")!;
      if (!input.isPlayerControlled) continue;

      const physics = entityManager.getComponent(id, "physics")!;
      const pos = entityManager.getComponent(id, "position")!;

      if (this.myKeys.w.pressed) {
        physics.velocity.x += Math.cos(pos.angle) * physics.thrust;
        physics.velocity.y += Math.sin(pos.angle) * physics.thrust;
      }
      if (this.myKeys.s.pressed) {
        physics.velocity.x -= Math.cos(pos.angle) * physics.thrust;
        physics.velocity.y -= Math.sin(pos.angle) * physics.thrust;
      }
      if (this.myKeys.a.pressed) {
        pos.angle -= physics.rotationSpeed;
      }
      if (this.myKeys.d.pressed) {
        pos.angle += physics.rotationSpeed;
      }
    }
  }
}
