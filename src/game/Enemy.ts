import { AnimatedSprite, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { Phys } from "./Physics";


export class Enemy extends Phys implements IHitbox {

    private static readonly GRAVITY = 700;
    public static readonly ESPEED = 120;
    public eWalk: AnimatedSprite;

    constructor() {
        super();

        this.eWalk = new AnimatedSprite([
            Texture.from("EWalk1"),
            Texture.from("EWalk2")
        ], false);

        this.eWalk.anchor.set(0.5);
        this.eWalk.play();
        this.eWalk.animationSpeed = 0.08;

        this.addChild(this.eWalk);
        this.speed.x = Enemy.ESPEED;
        this.acceleration.y = Enemy.GRAVITY;
    }

    
    public override update(deltaMS: number) {
        super.update(deltaMS / 1000);
        this.eWalk.update(deltaMS / (1000 / 60));    // deltaFrame
    }


    public getHitbox(): Rectangle {
        return this.eWalk.getBounds();
    }


    public separate(overlap: Rectangle, plat: ObservablePoint<any>) {

        if (overlap.width < overlap.height) {
            if (this.x > plat.x) {
                this.x += overlap.width;
            } else {
                this.x -= overlap.width;
            }
        } else {
            if (this.y > plat.y) {
                this.y += overlap.height;
                this.speed.y = 0;
            } else {
                this.y -= overlap.height;
                this.speed.y = 0;
            }
        }
    }

}