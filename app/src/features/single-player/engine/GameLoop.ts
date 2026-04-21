import { RenderSystem } from './systems/RenderSystem';
import { InputSystem } from './systems/InputSystem';
import { MovementSystem } from './systems/MovementSystem';
import { CollisionSystem } from './systems/CollisionSystem';
import { LevelSystem } from './systems/LevelSystem';
import { HealthSystem } from './systems/HealthSystem';
import { EntityManager } from './ecs/EntityManager';
import { createPlayer } from './ecs/EntityFactories';

export class GameLoop {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationId: number = 0;
  private lastTime: number = 0;
  private onStateChange?: (state: any) => void;

  // ECS Core
  private entityManager: EntityManager;
  private isPaused: boolean = false;
  private score: number = 0;
  private survivalTime: number = 0;

  // Systems
  private renderSystem: RenderSystem;
  private inputSystem: InputSystem;
  private movementSystem: MovementSystem;
  private collisionSystem: CollisionSystem;
  private levelSystem: LevelSystem;
  private healthSystem: HealthSystem;

  constructor(canvas: HTMLCanvasElement, onStateChange?: (state: any) => void) {
    this.canvas = canvas;
    this.onStateChange = onStateChange;
    
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
    this.healthSystem = new HealthSystem();

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

  public restart() {
    this.entityManager = new EntityManager();
    this.levelSystem = new LevelSystem();
    this.score = 0;
    this.survivalTime = 0;
    createPlayer(
      this.entityManager, 
      this.canvas.width / 2 - 20, 
      this.canvas.height - 80
    );
    this.resume();
  }

  public getGameState() {
    const player = this.entityManager.getEntitiesWithComponents("input", "health")[0];
    const health = player ? this.entityManager.getComponent(player, "health") : null;
    
    return {
      lives: health ? health.lives : 0,
      level: this.levelSystem.getLevel(),
      isGameOver: health ? health.lives <= 0 : false,
      score: this.score,
      time: Math.floor(this.survivalTime / 1000) // tiempo en segundos
    };
  }

  private update(deltaTime: number) {
    const state = this.getGameState();
    if (state.isGameOver) {
      this.pause();
      return;
    }

    this.survivalTime += deltaTime;

    // 1. Level & Spawning
    const levelBefore = this.levelSystem.getLevel();
    this.levelSystem.update(
      this.entityManager, 
      deltaTime, 
      this.canvas.width, 
      this.canvas.height
    );
    const levelAfter = this.levelSystem.getLevel();
    
    // Sumar puntos por subir de nivel
    if (levelAfter > levelBefore) {
      this.score += 1000;
    }

    // 2. Handle Input
    this.inputSystem.update(this.entityManager);

    // 3. Health logic (timers)
    this.healthSystem.update(this.entityManager, deltaTime);

    // 4. Process Physics and Movement
    this.movementSystem.update(
      this.entityManager, 
      this.canvas.width, 
      this.canvas.height
    );

    // 5. Handle Collisions
    const enemiesDestroyed = this.collisionSystem.update(this.entityManager);
    this.score += (enemiesDestroyed || 0) * 100;

    // Notify state change
    if (this.onStateChange) {
      this.onStateChange(this.getGameState());
    }
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
