import { Container, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";

// Bloque metal
export class Pla extends Container implements IHitbox {    
    private spr: Sprite;
    constructor(){
        super();        
        this.spr = Sprite.from("Metal");
        this.spr.anchor.set(0.5);
        this.addChild(this.spr);
    }    
    public getHitbox(): Rectangle {
        return this.spr.getBounds();
    }}

// Brick
export class Br extends Container implements IHitbox {    
    private spr: Sprite;    
    constructor(){
        super();        
        this.spr = Sprite.from("Brick");
        this.spr.anchor.set(0.5);
        this.addChild(this.spr);
    }
    public getHitbox(): Rectangle {
        return this.spr.getBounds()
    }}

// Borde
export class Borde extends Container implements IHitbox {    
    private spr: Sprite;
    constructor(){
        super();        
        this.spr = Sprite.from("Borde");
        this.spr.anchor.set(0.5);
        this.spr.visible = false;
        this.addChild(this.spr);
    }    
    public getHitbox(): Rectangle {
        return this.spr.getBounds();
    }}