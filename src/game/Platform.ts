import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";

// export class Brick

export class Platform extends Container implements IHitbox {

    private hitbox: Graphics;

    constructor(){
        super();

        const spr = Sprite.from("Brick");
        spr.anchor.set(0.5,0.5);
        this.addChild(spr);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00ff00, 0.4);
        this.hitbox.drawRect(-6.5,-6.5,13,13);
        this.hitbox.endFill();
        this.addChild(this.hitbox);
    }

    public getHitbox(): Rectangle {
        return this.hitbox.getBounds()
    }
}