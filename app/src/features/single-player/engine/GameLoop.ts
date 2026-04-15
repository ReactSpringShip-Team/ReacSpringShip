import { RenderSystem } from './systems/RenderSystem';
import { InputSystem } from './systems/InputSystem';
import { MovementSystem } from './systems/MovementSystem';
import { EntityManager } from './ecs/EntityManager';
import { createPlayer, createEnemy } from './ecs/EntityFactories';

export class GameLoop {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationId: number = 0;

  // ECS Core
  private entityManager: EntityManager;

  // Systems
  private renderSystem: RenderSystem;
  private inputSystem: InputSystem;
  private movementSystem: MovementSystem;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    
    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('No se pudo obtener el contexto 2D');
    this.ctx = context;

    // Initialize ECS
    this.entityManager = new EntityManager();

    // Start the systems
    this.renderSystem = new RenderSystem(this.ctx);
    this.inputSystem = new InputSystem();
    this.movementSystem = new MovementSystem();

    // Initial configuration
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas.bind(this));

    // Initialize Entities via Factories
    createPlayer(
      this.entityManager, 
      this.canvas.width / 2 - 20, 
      this.canvas.height - 80
    );

    // Create some enemies
    for (let i = 0; i < 5; i++) {
      createEnemy(
        this.entityManager,
        Math.random() * this.canvas.width,
        Math.random() * (this.canvas.height / 2)
      );
    }
  }

  private resizeCanvas = () => {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
  }

  public start() {
    const loop = (timestamp: number) => {
      this.update();
      this.render();
      this.animationId = requestAnimationFrame(loop);
    };
    this.animationId = requestAnimationFrame(loop);
  }

  private update() {
    // 1. Handle Input
    this.inputSystem.update(this.entityManager);

    // 2. Process Physics and Movement
    this.movementSystem.update(
      this.entityManager, 
      this.canvas.width, 
      this.canvas.height
    );
  }

  private render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 3. Render everything
    this.renderSystem.update(this.entityManager);
  }

  public stop() {
    cancelAnimationFrame(this.animationId);
    this.inputSystem.destroy();
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
  }
}
