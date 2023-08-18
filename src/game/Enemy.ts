import { AnimatedSprite, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { Phys } from "./Physics";

export class Ene extends Phys implements IHitbox {

    private static readonly GRAVITY = 700;
    public static readonly ESPEED = 140;

    public eWalk: AnimatedSprite;
    constructor(){
        super();
        this.eWalk = new AnimatedSprite([
            Texture.from("EWalk1"),
            Texture.from("EWalk2")
        ], true);
        this.eWalk.anchor.set(0.5);
        this.eWalk.play();
        this.eWalk.animationSpeed = 0.08;

        this.addChild(this.eWalk);
        this.speed.x = Ene.ESPEED;
        this.acceleration.y = Ene.GRAVITY;
    }

    public override update(deltaMS:number){
        super.update(deltaMS/1000);
        this.eWalk.update(deltaMS / (1000/60));
    }

    public getHitbox(): Rectangle {
        return this.eWalk.getBounds()
    }

    public separate(overlap: Rectangle, plat: ObservablePoint<any>){
        if (overlap.width < overlap.height){
            if (this.x > plat.x){
                this.x += overlap.width; //expulsar hacia la derecha
            } else if (this.x < plat.x){
                this.x -= overlap.width; //expulsar hacia la izquierda
            }
        } else {
            if (this.y > plat.y){
                this.y += overlap.height; //expulsar hacia abajo
                this.speed.y = 0;
            } else if (this.y < plat.y){
                this.y -= overlap.height; //expulsar hacia arriba
                this.speed.y = 0;
            }
        }
    }
}