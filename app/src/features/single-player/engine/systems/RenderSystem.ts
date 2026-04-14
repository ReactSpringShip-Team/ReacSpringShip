export class RenderSystem {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public update(entities: any[]) {
    for (const entity of entities) {
      // Si la entidad tiene una posición, la dibujamos
      if (entity.x !== undefined && entity.y !== undefined) {
        
        this.ctx.fillStyle = entity.color || '#ffffff';
        this.ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
        
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = entity.color || '#ffffff';
      }
    }
    this.ctx.shadowBlur = 0; 
  }
}