import { Container, Graphics, Rectangle } from "pixi.js";
import { IHitbox } from "./IHitbox";

export class Hb1 extends Container implements IHitbox {    
    private hb: Graphics;    
    constructor(){
        super();        
        this.hb = new Graphics();
        this.hb.beginFill(0x0000ff, 1);
        this.hb.drawRect(0,150,39,390);
        this.hb.endFill();
        this.addChild(this.hb);
    }
    public getHitbox(): Rectangle {
        return this.hb.getBounds()
    }}

export class Hb2 extends Container implements IHitbox {    
    private hb: Graphics;    
    constructor(){
        super();        
        this.hb = new Graphics();
        this.hb.beginFill(0x0000ff, 0.5);
        this.hb.drawRect(-19.5,-20,39,39);
        this.hb.endFill();
        this.addChild(this.hb);
    }
    public getHitbox(): Rectangle {
        return this.hb.getBounds()
    }}

export class Hb3 extends Container implements IHitbox {    
    private hb: Graphics;    
    constructor(){
        super();        
        this.hb = new Graphics();
        this.hb.beginFill(0x0000ff, 0.5);
        this.hb.drawRect(-19.5,-20,39,39);
        this.hb.endFill();
        this.addChild(this.hb);
    }
    public getHitbox(): Rectangle {
        return this.hb.getBounds()
    }}

export class Hb4 extends Container implements IHitbox {    
    private hb: Graphics;    
    constructor(){
        super();        
        this.hb = new Graphics();
        this.hb.beginFill(0x0000ff, 0.5);
        this.hb.drawRect(-19.5,-20,39,39);
        this.hb.endFill();
        this.addChild(this.hb);
    }
    public getHitbox(): Rectangle {
        return this.hb.getBounds()
    }}