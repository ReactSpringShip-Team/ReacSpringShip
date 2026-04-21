import { RenderSystem } from './systems/RenderSystem';
import { InputSystem } from './systems/InputSystem';
import { MovementSystem } from './systems/MovementSystem';
import { CollisionSystem } from './systems/CollisionSystem';
import { LevelSystem } from './systems/LevelSystem';
import { EntityManager } from './ecs/EntityManager';
import { createPlayer } from './ecs/EntityFactories';

export class GameLoop {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationId: number = 0;
  private lastTime: number = 0;

  // ECS Core
  private entityManager: EntityManager;
  private isPaused: boolean = false;

  // Systems
  private renderSystem: RenderSystem;
  private inputSystem: InputSystem;
  private movementSystem: MovementSystem;
  private collisionSystem: CollisionSystem;
  private levelSystem: LevelSystem;

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
    this.collisionSystem = new CollisionSystem();
    this.levelSystem = new LevelSystem();

    // Initial configuration
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas.bind(this));

    // Initialize Player
    createPlayer(
      this.entityManager, 
      this.canvas.width / 2 - 20, 
      this.canvas.height - 80
    );
  }

  private resizeCanvas = () => {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
  }

  public start() {
    this.lastTime = performance.now();
    const loop = (timestamp: number) => {
      if (this.isPaused) {
        this.lastTime = timestamp; 
        this.animationId = requestAnimationFrame(loop);
        return;
      }

      const deltaTime = timestamp - this.lastTime;
      this.lastTime = timestamp;

      this.update(deltaTime);
      this.render();
      this.animationId = requestAnimationFrame(loop);
    };
    this.animationId = requestAnimationFrame(loop);
  }

  public pause() {
    this.isPaused = true;
  }

  public resume() {
    this.isPaused = false;
    this.lastTime = performance.now();
  }

  private update(deltaTime: number) {
    // 1. Level & Spawning
    this.levelSystem.update(
      this.entityManager, 
      deltaTime, 
      this.canvas.width, 
      this.canvas.height
    );

    // 2. Handle Input
    this.inputSystem.update(this.entityManager);

    // 3. Process Physics and Movement
    this.movementSystem.update(
      this.entityManager, 
      this.canvas.width, 
      this.canvas.height
    );

    // 4. Handle Collisions
    this.collisionSystem.update(this.entityManager);
  }

  private render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.renderSystem.update(this.entityManager);
  }

  public stop() {
    cancelAnimationFrame(this.animationId);
    this.inputSystem.destroy();
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
  }
}
