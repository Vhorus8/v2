import { sound } from "@pixi/sound";
import { Container, Sprite, Texture } from "pixi.js";


export class Button extends Container {

    private def: Texture;
    private over: Texture;
    private down: Texture;
    private callback: Function;    
    private spr: Sprite;
    
    constructor( def:Texture, over:Texture, down:Texture, callback:Function ) {        // uso 'def' xque 'default' ya es una variable d javascript
        super();

        this.def = def;
        this.over = over;
        this.down = down;
        this.callback = callback;

        this.spr = Sprite.from(def);
        this.spr.anchor.set(0.5);
        this.addChild(this.spr);

        this.spr.interactive = true;
        this.spr.on("mousedown", this.onMouseDown, this);
        this.spr.on("mouseup", this.onMouseUp, this);
        this.spr.on("mouseover", this.onMouseOver, this);
        this.spr.on("mouseout", this. onMouseOut, this);        
    }


    private onMouseDown():void {
        this.spr.texture = this.down;
        const sndClick = sound.find("Click");
        sndClick.play({volume:0.3});
    };

    private onMouseUp():void {
        this.callback();
        this.spr.texture = this.over;
    };

    private onMouseOver():void {
        this.spr.texture = this.over;
        const sndHover = sound.find("Hover");
        sndHover.play({volume:0.05});
    };

    private onMouseOut():void {
        this.spr.texture = this.def;
    };
    
}