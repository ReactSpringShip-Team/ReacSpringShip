import { RenderSystem } from './systems/RenderSystem';
import { Ship } from './entities/Ship';
import type { Entity } from './entities/Entity';
import { InputSystem } from './systems/InputSystem';
import { Enemy } from './entities/Enemy';
import { MovementSystem } from './systems/MovementSystem';

export class GameLoop {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationId: number = 0;

  // Systems
  private renderSystem: RenderSystem;
  private inputSystem: InputSystem;
  private movementSystem: MovementSystem;

  // Game state
  private player: Ship;
  private enemy: Enemy;
  private entities: Entity[] = [];

  // FPS Limit
  

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    
    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('No se pudo obtener el contexto 2D');
    this.ctx = context;

    // Start the systems
    this.renderSystem = new RenderSystem(this.ctx);
    this.inputSystem = new InputSystem();
    this.movementSystem = new MovementSystem();

    // Initial configuration of the canvas dimensions
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas.bind(this));

    // Initalize the entyties
    this.player = new Ship(
      this.canvas.width / 2 - 20, 
      this.canvas.height - 80
    );

    this.enemy = new Enemy(50, 50);
    
    this.entities.push(this.player);
    this.entities.push(this.enemy);
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
    this.inputSystem.handleMovement(this.player);
    //this.player.update(this.canvas.width, this.canvas.height);
    this.movementSystem.update(this.entities, this.canvas.width, this.canvas.height);
  }

  private render() {
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.renderSystem.update(this.entities);

   
  }

  public stop() {
    cancelAnimationFrame(this.animationId);
    this.inputSystem.destroy();
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
  }
}