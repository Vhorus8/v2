import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";

// export class Brick

export class Platform extends Container implements IHitbox {

    private hitbox: Graphics;

    constructor(){
        super();

        const spr = Sprite.from("Brick");
        spr.anchor.set(0.5);
        this.addChild(spr);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x0000ff, 0.01);
        this.hitbox.drawRect(-19.5,-20,39,39);
        this.hitbox.endFill();
        this.addChild(this.hitbox);
    }

    public getHitbox(): Rectangle {
        return this.hitbox.getBounds()
    }
}