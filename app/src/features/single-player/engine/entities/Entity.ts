import type { Velocity } from "../../interfaces/Velocity.interface";

export interface Entity {
  id: string; 
  entityType : 'player' | 'enemy' | 'bullet' | 'particle';
  x: number;
  y: number;
  velocity: Velocity;
  width?: number;
  height?: number;
  radius: number;
  color?: string;
  markedForDeletion?: boolean;
}