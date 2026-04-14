// src/features/single-player/engine/GameLoop.ts

import { RenderSystem } from './systems/RenderSystem';
import { Ship } from './entities/Ship';
import type { Entity } from './entities/Entity';

export class GameLoop {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationId: number = 0;

  // Sistemas
  private renderSystem: RenderSystem;
  // En el futuro aquí irán: private collisionSystem: CollisionSystem;

  // Estado del juego
  private player: Ship;
  private entities: Entity[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    
    // Inicialización del contexto con configuración para pixel-art si fuera necesario
    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('No se pudo obtener el contexto 2D');
    this.ctx = context;

    // 1. Instanciar Sistemas
    this.renderSystem = new RenderSystem(this.ctx);

    // 2. Configuración inicial de dimensiones
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas.bind(this));

    // 3. Inicializar Entidades (Nave del jugador en el centro inferior)
    this.player = new Ship(
      this.canvas.width / 2 - 20, 
      this.canvas.height - 80
    );
    
    // Agregamos al jugador a la lista maestra de entidades
    this.entities.push(this.player);
  }

  /**
   * Ajusta la resolución interna del canvas para que coincida con el tamaño CSS.
   * Evita que los gráficos se vean borrosos o estirados.
   */
  private resizeCanvas = () => {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
  }

  /**
   * Inicia el ciclo infinito de actualización y renderizado.
   */
  public start() {
    const loop = (timestamp: number) => {
      this.update();
      this.render();
      this.animationId = requestAnimationFrame(loop);
    };
    this.animationId = requestAnimationFrame(loop);
  }

  /**
   * Lógica de físicas y actualización de estados.
   */
  private update() {
    // Actualizamos al jugador pasándole los límites del canvas
    this.player.update(this.canvas.width, this.canvas.height);

    // Aquí actualizarías el resto de entidades (balas, enemigos)
    // this.entities.forEach(entity => entity.update?.());
  }

  /**
   * Lógica de dibujo delegada a los sistemas correspondientes.
   */
  private render() {
    // 1. Limpiar el frame anterior
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 2. El RenderSystem se encarga de dibujar todas las entidades
    // Le pasamos el array de entidades para que las itere y pinte
    this.renderSystem.update(this.entities);
  }

  /**
   * Detiene el motor y limpia los listeners globales.
   */
  public stop() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
  }
}