import { Container, Point } from "pixi.js";


export class Phys extends Container {

    public speed = new Point();
    public acceleration = new Point();

    public update(deltaSeconds:number) {

        this.x += this.speed.x * deltaSeconds + 1/2 * this.acceleration.x * Math.pow(deltaSeconds,2); // Verlet
        this.y += this.speed.y * deltaSeconds + 1/2 * this.acceleration.y * Math.pow(deltaSeconds,2);
        
        this.speed.x += this.acceleration.x * deltaSeconds;
        this.speed.y += this.acceleration.y * deltaSeconds;
    }
}