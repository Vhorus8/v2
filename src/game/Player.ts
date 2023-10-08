import { AnimatedSprite, Graphics, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { Phys } from "./Physics";
import { IHitbox } from "./IHitbox";
import { Keyboard } from "../utils/Keyboard";
import { TickerScene } from "../escenas/TickerScene";
import { SceneManager } from "../utils/SceneManager";
import { sound } from "@pixi/sound";


export class P1 extends Phys implements IHitbox {

    private static readonly GRAVITY = 700;
    private static readonly MOVE_SPEED = 210;
    private static readonly ROLL_SPEED = 330;

    private bIdle: AnimatedSprite;
    private bWalk: AnimatedSprite;
    private bRoll: AnimatedSprite;
    private hb: Graphics;

    public canJump = true;
    public roll = false;
    public rollStep: number = 0;
    public life: number = 5;
    public break = false;
    public invu = false;  // invulnerable


    public startBlinking() {
        let blinkCount = 0;

        const blink = ()=> {
            if (blinkCount < 8) {      // 8 blinks            
                if (this.visible) {
                    this.visible = false;
                } else {
                    this.visible = true;
                    blinkCount ++;
                }
                setTimeout(blink, 50);    // blink duration: 50 ms
            }
            else {
                this.visible = true;    // Restablecer visibilidad desp d titilar
            }
        }

        blink();
    }


    constructor() {
        super();

        // idle animation
        this.bIdle = new AnimatedSprite([
            Texture.from("BIdle1"),
            Texture.from("BIdle2"),
            Texture.from("BIdle3"),
            Texture.from("BIdle4"),
            Texture.from("BIdle5"),
            Texture.from("BIdle6")
        ], false);

        this.bIdle.anchor.set(0.5);
        this.bIdle.play();
        this.bIdle.animationSpeed = 0.14;


        // walk animation
        this.bWalk = new AnimatedSprite([
            Texture.from("BWalk1"),
            Texture.from("BWalk2")
        ], true);

        this.bWalk.anchor.set(0.5);
        this.bWalk.play();
        this.bWalk.animationSpeed = 0.14;
        this.bWalk.visible = false;


        // roll animation
        this.bRoll = new AnimatedSprite([
            Texture.from("BRoll1"),
            Texture.from("BRoll2"),
            Texture.from("BRoll3"),
            Texture.from("BRoll4"),
            Texture.from("BRoll5"),
            Texture.from("BRoll6")
        ], true);

        this.bRoll.anchor.set(0.5, 0.43);
        this.bRoll.play();
        this.bRoll.animationSpeed = 0.2;
        this.bRoll.visible = false;


        // Hitbox
        this.hb = new Graphics();
        this.hb.beginFill(0x0);
        this.hb.drawRect(-10, -14, 20, 33);
        this.hb.endFill;
        this.hb.visible = false;


        this.addChild(this.bIdle);
        this.addChild(this.bWalk);
        this.addChild(this.bRoll);
        this.addChild(this.hb);

        this.acceleration.y = P1.GRAVITY;

        Keyboard.down.on("Space", this.jump, this);

    }


    public override destroy(options: any) {    // destruir evento salto al destruir player
        super.destroy(options);
        Keyboard.down.off("Space", this.jump);
    }


    public override update(deltaMS: number) {

        super.update(deltaMS / 1000);   //'super.update' llama al update del padre
        this.bIdle.update(deltaMS / (1000 / 60));  // (deltaFrame)


        Keyboard.up.on("Digit1", () => { this.roll == false ? this.roll = true : this.roll = false });    // On/Off roll

        Keyboard.up.on("Digit2", ()=> {    // reposicionar beetle
            super.x = 236;
            super.y = 60;
        });
        

        // Movimiento lateral
        if (Keyboard.state.get("ArrowRight")) {
            if (this.roll == false) {
                this.speed.x = P1.MOVE_SPEED;
                this.bIdle.visible = false;
                this.bWalk.visible = true;
                this.bWalk.scale.x = -1;

                if (Keyboard.up) {
                    this.bIdle.scale.x = -1;
                }
            }
            else {
                this.speed.x = P1.ROLL_SPEED;
                this.bIdle.visible = false;
                this.bRoll.visible = true;
                this.bRoll.scale.x = -1;
            }
        }
        else if (Keyboard.state.get("ArrowLeft")) {
            if (this.roll == false) {
                this.speed.x = -P1.MOVE_SPEED;
                this.bIdle.visible = false;
                this.bWalk.visible = true;
                this.bWalk.scale.x = 1;

                if (Keyboard.up) {
                    this.bIdle.scale.x = 1;
                }
            }
            else {
                this.speed.x = -P1.ROLL_SPEED;
                this.bIdle.visible = false;
                this.bRoll.visible = true;
                this.bRoll.scale.x = 1;
            }
        }
        else {
            this.speed.x = 0;
            if (this.roll == false) {
                this.bRoll.visible = false;
                this.bWalk.visible = false;
                this.bIdle.visible = true;
            }
            else {
                this.bIdle.visible = false;
                this.bRoll.visible = true;
            }
        }

        // Transformación bolita
        if (this.rollStep >= 3) {
            this.rollStep = 0;
            this.roll = true;
            this.bIdle.visible = false;
            this.bWalk.visible = false;

            const sndTransform = sound.find("Transform");
            sndTransform.play({volume:0.6});

            setTimeout(() => {
                sndTransform.play({volume:0.6});
                this.roll = false;
            }, 4000 );
        }

        // Vida
        if (this.life <= 0) {
            // sound.play("Defeat");
            const sndDefeat = sound.find("Defeat");
            // sndDefeat.volume = 0.5;
            sndDefeat.play({volume:0.5});
            SceneManager.changeScene(new TickerScene());     // Pantalla derrota?
        }

    }


    // Salto
    private jump() {
        if (this.canJump) {
            this.canJump = false;
            if (this.roll == false) {
                this.speed.y = -320;  //salto normal
            }
            else {
                this.speed.y = -130;  //salto bolita
                this.break = true;
            }
        }
    }


    public getHitbox(): Rectangle {
        return this.hb.getBounds();
    }


    public separate(overlap: Rectangle, plat: ObservablePoint<any>) {

        if (overlap.width < overlap.height) {
            if (this.x > plat.x) {
                this.x += overlap.width;  //expulsar hacia la derecha
            }
            else {
                this.x -= overlap.width;  //expulsar hacia la izquierda
            }
        }
        else {
            if (this.y > plat.y) {
                this.y += overlap.height;  //expulsar hacia abajo
                this.speed.y = 0;
            }
            else {
                this.y -= overlap.height;  //expulsar hacia arriba
                this.speed.y = 0;
                this.canJump = true;
            }
        }
    }
}