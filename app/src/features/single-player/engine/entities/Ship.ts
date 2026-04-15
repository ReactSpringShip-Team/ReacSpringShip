import type { Entity } from "./Entity";

export class Ship implements Entity {
  public id: string = 'player_1';
  public entityType: "player" | "enemy" | "bullet" | "particle" = "player";

  public x: number;
  public y: number;
  public angle: number = -Math.PI / 2; // Initial angle points UP
  public radius: number = 30;
  public width: number = 40;
  public height: number = 40;

  public image?: HTMLImageElement;
  public isImageLoaded: boolean = false;

  public velocity = { x: 0, y: 0 };

  public color: string = '#22d3ee';

  // Physics
  private rotationSpeed: number = 0.1;
  private friction: number = 0.99;
  public thrust = 0.2;

  constructor(startX: number, startY: number) {
    this.x = startX;
    this.y = startY;

    this.image = new Image();
    this.image.src = '/assets/Ships/spaceShips_008.png';

    this.image.onload = () => {
      this.isImageLoaded = true;
    };
  }

  public update(canvasWidth: number, canvasHeight: number) {
    // Friction
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;

    // Apply velocity to position
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Border logic 
    if (this.x + this.radius > canvasWidth ) this.x = this.radius;
    else if (this.x - this.radius < 0) this.x = canvasWidth - this.radius;

    if (this.y + this.radius> canvasHeight) this.y = this.radius;
    else if (this.y - this.radius < 0) this.y = canvasHeight - this.radius;
  }

  public incRotation() {
    this.angle += this.rotationSpeed;
  }

  public decRotation() {
    this.angle -= this.rotationSpeed;
  }

  public accelerate() {
    this.velocity.x += Math.cos(this.angle) * this.thrust;
    this.velocity.y += Math.sin(this.angle) * this.thrust;
  }

  public desAccelerate() {
    this.velocity.x -= Math.cos(this.angle) * this.thrust;
    this.velocity.y -= Math.sin(this.angle) * this.thrust;
  }
}