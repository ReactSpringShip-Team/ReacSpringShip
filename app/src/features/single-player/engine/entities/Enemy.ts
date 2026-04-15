import type { Velocity } from "../../interfaces/Velocity.interface";
import type { Entity } from "./Entity";

export class Enemy implements Entity {
    public id: string;
    public entityType : 'player' | 'enemy' | 'bullet' | 'particle' = 'enemy';
    public  x: number;
    public y: number;
    public velocity: Velocity = {x: 0, y: 0};
    public  width: number = 40;
    public  height: number = 40;
    public  radius: number = 30;
    public  markedForDeletion: boolean = false;

    public image?: HTMLImageElement;
    public isImageLoaded: boolean = false;
    public mass: number = 3;

    constructor(x: number, y: number, radius: number = 30){
        this.id = 'enemy_' + Date.now();
        this.x = x;
        this.y = y;
        this.radius = radius;

        const initialVelocity = Math.floor(Math.random() * (10 - 4 + 1) - 4);
        this.velocity.x = initialVelocity;
        this.velocity.y = initialVelocity;
        
        this.image = new Image();
        const rand: number = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        this.image.src = '/assets/Meteors/spaceMeteors_00' + rand + '.png';
        this.image.onload = () => {
            this.isImageLoaded = true;
        }
    }

    public update(canvasWidth: number, canvasHeight: number){
        
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Border logic
        if(this.x + this.radius > canvasWidth || this.x - this.radius < 0) 
            this.velocity.x = -this.velocity.x; 

        if(this.y + this.radius > canvasHeight || this.y - this.radius < 0) 
           this.velocity.y = -this.velocity.y;

    }

}
