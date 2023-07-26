import { AnimatedSprite, Graphics, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { IHitbox } from "./IHitbox";
import { Keyboard } from "../utils/Keyboard";

export class Player extends PhysicsContainer implements IHitbox {

    private static readonly GRAVITY = 700;
    private static readonly MOVE_SPEED = 210;
    private static readonly ROLL_SPEED = 360;  // *

    private beetleIdle: AnimatedSprite;
    private beetleWalk: AnimatedSprite;  // *
    private beetleRoll: AnimatedSprite;  // *
    private hitbox: Graphics;

    public canJump = true;
    public rollState = false;  // *
    // public break = false;  //(activar al saltar en roll state)

    constructor(){
        super();

        // idle
        this.beetleIdle = new AnimatedSprite([
            Texture.from("BIdle1"),
            Texture.from("BIdle2"),
            Texture.from("BIdle3"),
            Texture.from("BIdle4"),
            Texture.from("BIdle5"),
            Texture.from("BIdle6")
        ], false );

        this.beetleIdle.anchor.set(0.5);
        this.beetleIdle.play();
        this.beetleIdle.animationSpeed = 0.14;

        // Walk
        this.beetleWalk = new AnimatedSprite([  // *
            Texture.from("BWalk1"),
            Texture.from("BWalk2")
        ], true );

        this.beetleWalk.anchor.set(0.5);  // *
        this.beetleWalk.play();  // *
        this.beetleWalk.animationSpeed = 0.14;  // *

        // Roll / Rueda
        this.beetleRoll = new AnimatedSprite([  // *
            Texture.from("BRoll1"),
            Texture.from("BRoll2"),
            Texture.from("BRoll3"),
            Texture.from("BRoll4"),
            Texture.from("BRoll5"),
            Texture.from("BRoll6")
        ], true );

        this.beetleRoll.anchor.set(0.5,0.43);
        this.beetleRoll.play();
        this.beetleRoll.animationSpeed = 0.2;

        // Visualizar eje
        // const auxZero = new Graphics();
        // auxZero.beginFill(0xFF00FF);
        // auxZero.drawCircle(0,0,4);
        // auxZero.endFill();

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xff00ff, 0.01);
        this.hitbox.drawRect(0,0,20,33);
        this.hitbox.endFill();
        this.hitbox.x = -10;
        this.hitbox.y = -14;

        this.addChild(this.beetleIdle);
        this.addChild(this.beetleWalk);  // *
        this.beetleWalk.visible = false;  // *
        this.addChild(this.beetleRoll);  // *
        this.beetleRoll.visible = false;  // *
        // this.addChild(auxZero);
        this.beetleIdle.addChild(this.hitbox);

        this.acceleration.y = Player.GRAVITY;

        Keyboard.down.on("Space", this.jump, this);
    }

    // destruir evento salto al destruir player
    public override destroy(options:any){
        super.destroy(options);
        Keyboard.down.off("Space", this.jump);
    }

    public override update(deltaMS:number){
        super.update(deltaMS/1000); // 'super.update' llama al update del padre
        this.beetleIdle.update(deltaMS / (1000/60));

        if (Keyboard.state.get("Digit1")){  // ON/OFF rollState            
            if (this.rollState == false){
                this.rollState = true;
                this.beetleIdle.visible = false;
                this.beetleWalk.visible = false;
                this.beetleRoll.visible = true;
            } else {
                this.rollState = false;
                this.beetleRoll.visible = false;
            }
        }

        // Movimiento lateral
        if (Keyboard.state.get("ArrowRight")){

            if (this.rollState == false){  // *
                this.speed.x = Player.MOVE_SPEED;
                this.beetleIdle.visible = false;  // *
                this.beetleWalk.visible = true;  // *
                this.beetleWalk.scale.x = -1;  // *

                if (Keyboard.up){
                    this.beetleIdle.scale.x = -1;
                }
            } else {  // (rollState = true)  // *
                this.speed.x = Player.ROLL_SPEED;  // *
                this.beetleIdle.visible = false;  // *
                this.beetleRoll.visible = true;  // *
                this.beetleRoll.scale.x = -1;  // *
            }
        } else if (Keyboard.state.get("ArrowLeft")){

            if (this.rollState == false){
                this.speed.x = -Player.MOVE_SPEED;
                this.beetleIdle.visible = false;  // *
                this.beetleWalk.visible = true;  // *
                this.beetleWalk.scale.x = 1;  // *

                if (Keyboard.up){
                    this.beetleIdle.scale.x = 1;
                }
            } else {  // (rollState = true)  // *
                this.speed.x = -Player.ROLL_SPEED;
                this.beetleIdle.visible = false;  // *
                this.beetleRoll.visible = true;  // *
                this.beetleRoll.scale.x = 1;  // *
            }
        } else {
            this.speed.x = 0;

            if (this.rollState == false){
                this.beetleRoll.visible = false;  // *
                this.beetleWalk.visible = false;  // *
                this.beetleIdle.visible = true;  // *
                } else {  // (rollState = true)  // *
                    this.beetleIdle.visible = false;  // *
                    this.beetleRoll.visible = true;
                }
            }
        }

    // Salto
    private jump(){
        if (this.canJump){
            this.canJump = false;
            if (this.rollState == false){
                this.speed.y = -285;
            } else {
                this.speed.y = -150;
                // this.break = true;
                // por 8 seg. (timer Ticker)
            }
        }
    }

    public getHitbox(): Rectangle {
        return this.hitbox.getBounds()
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