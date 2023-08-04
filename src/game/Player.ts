import { AnimatedSprite, Graphics, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { IHitbox } from "./IHitbox";
import { Keyb } from "../utils/Keyboard";

export class P1 extends PhysicsContainer implements IHitbox {

    private static readonly GRAVITY = 700;
    private static readonly MOVE_SPEED = 210;
    private static readonly ROLL_SPEED = 340;

    private bIdle: AnimatedSprite;
    private bWalk: AnimatedSprite;
    private bRoll: AnimatedSprite;
    private hb: Graphics;

    public canJump = true;
    public roll = false;  // al juntar 10 monedas, se activa x 8 seg.
    public break = false;

    constructor(){
        super();

        // idle
        this.bIdle = new AnimatedSprite([
            Texture.from("BIdle1"),
            Texture.from("BIdle2"),
            Texture.from("BIdle3"),
            Texture.from("BIdle4"),
            Texture.from("BIdle5"),
            Texture.from("BIdle6")
        ], false );

        this.bIdle.anchor.set(0.5);
        this.bIdle.play();
        this.bIdle.animationSpeed = 0.14;

        // Walk
        this.bWalk = new AnimatedSprite([
            Texture.from("BWalk1"),
            Texture.from("BWalk2")
        ], true );

        this.bWalk.anchor.set(0.5);
        this.bWalk.play();
        this.bWalk.animationSpeed = 0.14;

        // Roll / Rueda
        this.bRoll = new AnimatedSprite([
            Texture.from("BRoll1"),
            Texture.from("BRoll2"),
            Texture.from("BRoll3"),
            Texture.from("BRoll4"),
            Texture.from("BRoll5"),
            Texture.from("BRoll6")
        ], true );

        this.bRoll.anchor.set(0.5,0.43);
        this.bRoll.play();
        this.bRoll.animationSpeed = 0.2;

        this.hb = new Graphics();
        this.hb.beginFill(0xff00ff);
        this.hb.drawRect(0,0,20,33);
        this.hb.visible = false;
        this.hb.endFill();
        this.hb.x = -10;
        this.hb.y = -14;

        this.addChild(this.bIdle);
        this.addChild(this.bWalk);
        this.addChild(this.bRoll);
        this.bWalk.visible = false;
        this.bRoll.visible = false;
        this.bIdle.addChild(this.hb);

        this.acceleration.y = P1.GRAVITY;

        Keyb.down.on("Space", this.jump, this);
    }

    // destruir evento salto al destruir player
    public override destroy(options:any){
        super.destroy(options);
        Keyb.down.off("Space", this.jump);
    }

    public override update(deltaMS:number){
        super.update(deltaMS/1000); // 'super.update' llama al update del padre
        this.bIdle.update(deltaMS / (1000/60));

        // ON/OFF roll
        Keyb.up.on("Digit1", ()=>{ this.roll==false ? this.roll=true : this.roll=false });
        
        Keyb.up.on("Digit2", ()=>{
            super.x = 236;
            super.y = 60; });

        // Movimiento lateral
        if (Keyb.state.get("ArrowRight")){
            if (this.roll == false){
                this.speed.x = P1.MOVE_SPEED;
                this.bIdle.visible = false;
                this.bWalk.visible = true;
                this.bWalk.scale.x = -1;

                if (Keyb.up){
                    this.bIdle.scale.x = -1;
                }
            } else {  // roll = true
                this.speed.x = P1.ROLL_SPEED;
                this.bIdle.visible = false;
                this.bRoll.visible = true;
                this.bRoll.scale.x = -1;
            }
        } else if (Keyb.state.get("ArrowLeft")){
            if (this.roll == false){
                this.speed.x = -P1.MOVE_SPEED;
                this.bIdle.visible = false;
                this.bWalk.visible = true;
                this.bWalk.scale.x = 1;

                if (Keyb.up){
                    this.bIdle.scale.x = 1;
                }
            } else {  // roll = true
                this.speed.x = -P1.ROLL_SPEED;
                this.bIdle.visible = false;
                this.bRoll.visible = true;
                this.bRoll.scale.x = 1;
            }
        } else {
            this.speed.x = 0;

            if (this.roll == false){
                this.bRoll.visible = false;
                this.bWalk.visible = false;
                this.bIdle.visible = true;
                } else {
                    this.bIdle.visible = false;
                    this.bRoll.visible = true;
                }
            }
        }

    // Salto
    private jump(){
        if (this.canJump){
            this.canJump = false;
            if (this.roll == false){
                this.speed.y = -350; //salto normal
            } else {
                this.speed.y = -160; //salto bolita
                this.break = true;

                // Timer 'break'
                // setTimeout(()=>{ this.break = false; }, 460);
            }
        }
    }

    public getHitbox(): Rectangle {
        return this.hb.getBounds()
    }

    // Separar
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
                this.canJump = true;
            }
        }
    }
}