import type { Velocity } from "../../interfaces/Velocity.interface";

export interface PositionComponent {
  x: number;
  y: number;
  angle: number;
}

export interface PhysicsComponent {
  velocity: Velocity;
  friction: number;
  thrust: number;
  rotationSpeed: number;
  radius: number;
  mass: number;
}

export interface RenderComponent {
  image?: HTMLImageElement;
  color?: string;
  width: number;
  height: number;
  isImageLoaded: boolean;
}

export interface InputComponent {
  isPlayerControlled: boolean;
}

export interface ComponentMap {
  position?: PositionComponent;
  physics?: PhysicsComponent;
  render?: RenderComponent;
  input?: InputComponent;
}
