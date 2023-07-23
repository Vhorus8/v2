import { AnimatedSprite, Graphics, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { IHitbox } from "./IHitbox";
import { Keyboard } from "../utils/Keyboard";

export class Player extends PhysicsContainer implements IHitbox {

    private static readonly GRAVITY = 500;
    private static readonly MOVE_SPEED = 45;
    // private static readonly NORMAL_MOVESPEED = 200;
    // private static readonly ROLL_MOVESPEED = 400;
    private beetleIdle: AnimatedSprite;
    private hitbox: Graphics;

    public canJump = true;

    constructor(){
        super();

        this.beetleIdle = new AnimatedSprite([
            Texture.from("BIdle1"),
            Texture.from("BIdle2"),
            Texture.from("BIdle3"),
            Texture.from("BIdle4"),
            Texture.from("BIdle5"),
            Texture.from("BIdle6")
        ], false
        );

        this.beetleIdle.anchor.set(0.5,0.5);
        this.beetleIdle.play();
        this.beetleIdle.animationSpeed = 0.14;

        const auxZero = new Graphics(); // visualizar eje
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(0,0,1);
        auxZero.endFill();

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xff00ff, 0.4);
        this.hitbox.drawRect(0,0,8,11);
        this.hitbox.endFill();
        this.hitbox.x = -4;
        this.hitbox.y = -4.5;

        this.addChild(this.beetleIdle);
        this.addChild(auxZero);
        this.beetleIdle.addChild(this.hitbox);

        this.acceleration.y = Player.GRAVITY;

        Keyboard.down.on("Space", this.jump, this); // CAMBIAR X BARRA ESPACIADORA
    }

    // destruir evento salto al destruir player
    public override destroy(options:any){
        super.destroy(options);
        Keyboard.down.off("Space", this.jump);
    }

    public override update(deltaMS:number){
        super.update(deltaMS/1000); // 'super.udate' llama al update del padre
        this.beetleIdle.update(deltaMS / (1000/60));

        // Movimiento lateral
        // if (rollState = false){
        if (Keyboard.state.get("ArrowRight")){
            this.speed.x = Player.MOVE_SPEED;
            // this.speed.x = Player.NORMAL_MOVESPEED;
            // this.beetleIdle.visible = false;
            // this.beetleWalk.visible = true;
            this.beetleIdle.scale.x = -1;
        } else if (Keyboard.state.get("ArrowLeft")){
            this.speed.x = -Player.MOVE_SPEED;
            this.beetleIdle.scale.x = 1;
        } else {
            this.speed.x = 0;
            // this.beetleWalk.visible = false;
            // this.beetleIdle.visible = true;
        }
    }

    // Salto
    private jump(){
        if (this.canJump){
            this.canJump = false;
            // if (rollState = false){
            this.speed.y = -170;
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