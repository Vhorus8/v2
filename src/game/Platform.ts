import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";

// Bloque metal
export class Pla extends Container implements IHitbox {
    private hb: Graphics;    
    constructor(){
        super();
        const spr = Sprite.from("Metal");
        spr.anchor.set(0.5);
        this.addChild(spr);
        
        this.hb = new Graphics();
        this.hb.beginFill(0x0000ff, 0.01);
        this.hb.drawRect(-19.5,-20,39,39);
        this.hb.endFill();
        this.addChild(this.hb);
    }    
    public getHitbox(): Rectangle {
        return this.hb.getBounds();
    }
}

// Brick
export class Br extends Container implements IHitbox {    
    private hb: Graphics;    
    constructor(){
        super();
        const spr = Sprite.from("Brick");
        spr.anchor.set(0.5);
        this.addChild(spr);
        
        this.hb = new Graphics();
        this.hb.beginFill(0x0000ff, 0.01);
        this.hb.drawRect(-19.5,-20,39,39);
        this.hb.endFill();
        this.addChild(this.hb);
    }
    public getHitbox(): Rectangle {
        return this.hb.getBounds()
    }
}