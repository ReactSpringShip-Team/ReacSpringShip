import { EntityManager } from "../ecs/EntityManager";

export class RenderSystem {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public update(entityManager: EntityManager) {
    const entities = entityManager.getEntitiesWithComponents("position", "render");

    for (const id of entities) {
      const pos = entityManager.getComponent(id, "position")!;
      const render = entityManager.getComponent(id, "render")!;
      const health = entityManager.getComponent(id, "health");

      if (health?.isInvulnerable) {
        if (Math.floor(Date.now() / 100) % 2 === 0) continue;
      }

      this.ctx.save();

      // Translate to entity center
      this.ctx.translate(pos.x, pos.y);

      // Apply rotation with a 90-degree offset to align the sprite
      const rotation = pos.angle + Math.PI / 2;
      this.ctx.rotate(rotation);

      if (render.image && render.isImageLoaded) {
        this.ctx.drawImage(
          render.image,
          -render.width / 2,
          -render.height / 2,
          render.width,
          render.height
        );
      } else {
        this.ctx.fillStyle = render.color || "#22d3ee";
        this.ctx.fillRect(
          -render.width / 2,
          -render.height / 2,
          render.width,
          render.height
        );
      }

      this.ctx.restore();
    }
  }
}
