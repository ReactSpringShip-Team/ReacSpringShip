export class RenderSystem {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public update(entities: any[]) {
    for (const entity of entities) {
      if (entity.x !== undefined && entity.y !== undefined) {
        this.ctx.save();
        
        // Translate to entity center
        this.ctx.translate(entity.x, entity.y);

        // Apply rotation with a 90-degree offset to align the "up" sprite with the "right" 0-angle
        const rotation = (entity.angle || 0) + Math.PI / 2;
        this.ctx.rotate(rotation);

        if (entity.image && entity.isImageLoaded) {
          this.ctx.drawImage(
            entity.image, 
            -entity.width / 2, 
            -entity.height / 2, 
            entity.width, 
            entity.height
          );
        } else {
          this.ctx.fillStyle = entity.color || '#22d3ee';
          this.ctx.fillRect(
            - (entity.width || 0) / 2, 
            - (entity.height || 0) / 2, 
            entity.width || 0, 
            entity.height || 0
          );
        }
        
        this.ctx.restore();
      }
    }
  }
}