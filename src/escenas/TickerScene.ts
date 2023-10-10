import { Container, Sprite, Texture, Text, TextStyle } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { P1 } from "../game/Player";
import { Borde, Br, Meta, Pla } from "../game/Platform";
import { checkCollision } from "../game/IHitbox";
import { Enemy } from "../game/Enemy";
import { SceneManager } from "../utils/SceneManager";
import { SceneBase } from "../utils/AbstractScene";
import { VictoryScene } from "./VictoryScene";
import { sound } from "@pixi/sound";


export class TickerScene extends SceneBase implements IUpdateable {     // extends SceneBase (en vez d Container)

    private beet: P1;
    private enemy: Enemy = new Enemy();
    private meta: Meta;
    private enemies: Enemy[];
    private enemyCount: number = 0;
    private plas: Pla[];
    private brs: Br[];
    private bors: Borde[];
    private w: Container;  // world
    private t: Text;

    private sndMusic = sound.find("StageMusic");

    // Spawn enemies
    private stopSpawn = false;

    private spawnEnemy() {

        if (!this.stopSpawn) {
            setTimeout( ()=> {                
                if (this.enemyCount < 8  &&  !this.stopSpawn) {

                    this.enemyCount ++;
                    this.enemy = new Enemy();
                    this.enemy.position.set(20, 125);
                    this.addChild(this.enemy);
                    this.enemies.push(this.enemy);
                }
                this.spawnEnemy();
            }, 1000 );
        }
    }


    constructor() {
        super();

        this.sndMusic.play({ singleInstance:true, loop:true, volume:0.08 });

        this.w = new Container();
        this.bors = [];
        this.plas = [];
        this.brs = [];
        this.enemies = [];
        
        const bg: Sprite = new Sprite(Texture.from("Bg"));
        this.w.addChild(bg);
        
        // bordes
        let bor = new Borde(); bor.position.set(-41, 345); this.w.addChild(bor); this.bors.push(bor);
        bor = new Borde(); bor.position.set(470, 384); this.w.addChild(bor); this.bors.push(bor);

        // piso 1:
        let br = new Br(); br.position.set(58.5, 247.5); this.w.addChild(br); this.brs.push(br);
        let pla = new Pla(); pla.position.set(97.5, 247.5); this.w.addChild(pla); this.plas.push(pla);
        br = new Br(); br.position.set(136.5, 247.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(175.5, 247.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(214.5, 247.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(253.5, 247.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(292.5, 247.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(331.5, 247.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(370.5, 247.5); this.w.addChild(br); this.brs.push(br);
        // piso 2:
        br = new Br(); br.position.set(58.5, 286.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(97.5, 286.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(136.5, 286.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(175.5, 286.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(214.5, 286.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(253.5, 286.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(292.5, 286.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(331.5, 286.5); this.w.addChild(br); this.brs.push(br);
        pla = new Pla(); pla.position.set(370.5, 286.5); this.w.addChild(pla); this.plas.push(pla);
        // piso 3:
        br = new Br(); br.position.set(58.5, 325.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(97.5, 325.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(136.5, 325.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(175.5, 325.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(214.5, 325.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(253.5, 325.5); this.w.addChild(br); this.brs.push(br);
        pla = new Pla(); pla.position.set(292.5, 325.5); this.w.addChild(pla); this.plas.push(pla);
        br = new Br(); br.position.set(331.5, 325.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(370.5, 325.5); this.w.addChild(br); this.brs.push(br);
        // piso 4:
        br = new Br(); br.position.set(58.5, 364.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(97.5, 364.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(136.5, 364.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(175.5, 364.5); this.w.addChild(br); this.brs.push(br);
        pla = new Pla(); pla.position.set(214.5, 364.5); this.w.addChild(pla); this.plas.push(pla);
        pla = new Pla(); pla.position.set(253.5, 364.5); this.w.addChild(pla); this.plas.push(pla);
        br = new Br(); br.position.set(292.5, 364.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(331.5, 364.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(370.5, 364.5); this.w.addChild(br); this.brs.push(br);
        // piso 5:
        br = new Br(); br.position.set(58.5, 403.5); this.w.addChild(br); this.brs.push(br);
        pla = new Pla(); pla.position.set(97.5, 403.5); this.w.addChild(pla); this.plas.push(pla);
        br = new Br(); br.position.set(136.5, 403.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(175.5, 403.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(214.5, 403.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(253.5, 403.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(292.5, 403.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(331.5, 403.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(370.5, 403.5); this.w.addChild(br); this.brs.push(br);
        // piso 6:
        pla = new Pla(); pla.position.set(58.5, 442.5); this.w.addChild(pla); this.plas.push(pla);
        br = new Br(); br.position.set(97.5, 442.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(136.5, 442.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(175.5, 442.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(214.5, 442.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(253.5, 442.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(292.5, 442.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(331.5, 442.5); this.w.addChild(br); this.brs.push(br);
        pla = new Pla(); pla.position.set(370.5, 442.5); this.w.addChild(pla); this.plas.push(pla);
        // piso 7:
        br = new Br(); br.position.set(58.5, 481.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(97.5, 481.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(136.5, 481.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(175.5, 481.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(214.5, 481.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(253.5, 481.5); this.w.addChild(br); this.brs.push(br);
        this.meta = new Meta(); this.meta.position.set(292.5, 481.5); this.w.addChild(this.meta);           // Meta!
        br = new Br(); br.position.set(331.5, 481.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(370.5, 481.5); this.w.addChild(br); this.brs.push(br);

        // Player
        this.beet = new P1();
        this.beet.x = 455;
        this.beet.y = 110;


        // Texto
        const tStyle = new TextStyle({
            fontSize: 30,
            fontFamily: "Pixelify"
        });
        this.t = new Text("life:" + this.beet.life, tStyle);
        this.t.x = 455;


        this.addChild(this.w);
        this.addChild(this.beet);
        this.addChild(this.t);
        
        this.spawnEnemy();
        
    }


    // public update( deltaTime:number, _deltaFrame:number ): void {
    public update( frame:number ) {    // (video Clase 14)     frame:number, deltaMS:number

        this.beet.update(frame);
        this.t.text = "life: " + this.beet.life;
        // this.fire.update(deltaMS/1000)    // actualiza las partículas con deltaMS/1000 (segundos)


        // Beetle/bricks
        for ( let br of this.brs ) {          
            
            const overlap = checkCollision( this.beet, br );
            const sndBreak = sound.find("Break");
            
            if ( overlap != null )
            {
                this.beet.separate(overlap, br.position);
                if (this.beet.roll == true)
                {
                    if (this.beet.y > br.y - 34)    // Rueda: colisión lateral
                    {
                        this.beet.speed.y = -100;
                        let brPos = this.brs.indexOf(br);
                        this.brs.splice(brPos, 1);   // eliminar (o reemplazar) del array
                        this.w.removeChild(br);
                        sndBreak.play({volume:0.3});
                    }
                    else if ( this.beet.y <= br.y - 34  &&  this.beet.break == true )      //salto Rueda: colisión superior (distancia vertical justa: 38.5)
                    {
                        this.beet.break = false;
                        this.beet.speed.y = -100;
                        let brPos = this.brs.indexOf(br);
                        this.brs.splice(brPos, 1);   // eliminar (o reemplazar) del array
                        this.w.removeChild(br);
                        sndBreak.play({volume:0.3});
                    }
                }
            }
        }


        // Array Enemies
        for (let ene of this.enemies) {

            ene.update(frame);    // Update!

            // colisión beetle/enemies
            const overlap = checkCollision(this.beet, ene);
            const sndKill = sound.find("Kill");

            if (overlap != null)
            {
                if (this.beet.roll == true)     // (bolita)
                {
                    let enePos = this.enemies.indexOf(ene);
                    this.enemies.splice(enePos, 1);
                    this.removeChild(ene);
                    this.enemyCount--;
                    sndKill.play({volume:0.2});
                }
                else if (this.beet.invu == false)
                {
                    if (this.beet.y < ene.y - 18 && this.beet.speed.y > 0)     // colisión desde arriba   ( this.beet.x < ene.x + 20  &&  this.beet.x > ene.x - 20 )
                    {
                        this.beet.invu = true;
                        let enePos = this.enemies.indexOf(ene);
                        this.enemies.splice(enePos, 1);
                        this.removeChild(ene);    // this.w.removeChild(ene);
                        this.beet.speed.y = -170;
                        setTimeout(()=>{
                            this.beet.invu = false
                        }, 250 );
                        this.enemyCount --;
                        this.beet.rollStep ++;
                        sndKill.play({volume:0.2});
                    }
                    else {     // toda otra colisión                    
                        this.beet.invu = true;
                        this.beet.life --;
                        let eneSpeed = ene.speed.x;
                        ene.speed.x = 0;

                        setTimeout( ()=> {
                            this.beet.invu = false;
                            ene.speed.x = eneSpeed;
                        }, 1800 );
                        this.beet.startBlinking();

                        const sndDamage = sound.find("Damage");
                        sndDamage.play({volume:0.3});
                    }
                }
            }


            // colisión Meta
            if (checkCollision(this.beet, this.meta)) {

                this.sndMusic.stop();
                const sndVictory = sound.find("Victory");
                sndVictory.play({ volume:0.1 });
                SceneManager.changeScene(new VictoryScene());     // Pantalla Victoria!
            }


            // colisiones enemy/world:
            for (let bor of this.bors) {

                const overlap = checkCollision(ene, bor);

                if (overlap != null) {

                    ene.separate(overlap, bor.position);

                    if (ene.y > bor.y - 192  &&  ene.y < bor.y + 192) {

                        if (ene.x < bor.x) {

                            ene.speed.x = -Enemy.ESPEED;
                            ene.eWalk.scale.x = -1;
                        }
                        else if (ene.x > bor.x) {

                            ene.speed.x = Enemy.ESPEED;
                            ene.eWalk.scale.x = 1;
                        }
                    }
                }
            }

            for (let br of this.brs) {
                const overlap = checkCollision(ene, br);
                if (overlap != null) {
                    ene.separate(overlap, br.position);
                    if (ene.y > br.y - 33 && ene.y < br.y + 33) {
                        if (ene.x < br.x) {
                            ene.speed.x = -Enemy.ESPEED;
                            ene.eWalk.scale.x = -1;
                        }
                        else if (ene.x > br.x) {
                            ene.speed.x = Enemy.ESPEED;
                            ene.eWalk.scale.x = 1;
                        }
                    }
                }
            }

            for (let pla of this.plas)
            {
                const overlap = checkCollision(ene, pla);
                if (overlap != null)
                {
                    ene.separate(overlap, pla.position);
                    if (ene.y > pla.y - 33 && ene.y < pla.y + 33)
                    {
                        if (ene.x < pla.x)
                        {
                            ene.speed.x = -Enemy.ESPEED;
                            ene.eWalk.scale.x = -1;
                        }
                        else if (ene.x > pla.x)
                        {
                            ene.speed.x = Enemy.ESPEED;
                            ene.eWalk.scale.x = 1;
                        }
                    }
                }
            }

            if (ene.x > SceneManager.WIDTH) {    // límite bordes laterales
                ene.x = SceneManager.WIDTH;
                ene.speed.x = -Enemy.ESPEED;
                ene.eWalk.scale.x = -1;
            }
            if (ene.x < 0) {   // else if*
                ene.x = 0;
                ene.speed.x = Enemy.ESPEED;
                ene.eWalk.scale.x = 1;
            }

            if (ene.y > SceneManager.HEIGHT - 58) {    // límite borde inferior
                ene.y = SceneManager.HEIGHT - 58;
                ene.speed.y = 0;
            }
            //

        }


        // colisiones Beetle/world:
        for ( let pla of this.plas )
        {
            const overlap = checkCollision(this.beet, pla);

            if (overlap != null)
            {
                this.beet.separate( overlap, pla.position );

                if ( this.beet.y <= pla.y - 34  &&  this.beet.break == true )
                {
                    this.beet.break = false;
                    this.beet.speed.y = -90;
                }
            }
        }


        for ( let bor of this.bors )
        {
            const overlap = checkCollision( this.beet, bor );
            if ( overlap != null )
            {
                this.beet.separate(overlap, bor.position);

                if ( this.beet.y <= bor.y - 211  &&  this.beet.break == true )
                {
                    this.beet.break = false;
                    this.beet.speed.y = -90;
                }
            }
        }

        if (this.beet.x > SceneManager.WIDTH) {   // límite bordes laterales
            this.beet.x = SceneManager.WIDTH;
        }
        if (this.beet.x < 0) {   // else if*
            this.beet.x = 0;
        }

        if (this.beet.y > SceneManager.HEIGHT - 58) {   // límite borde inferior
            this.beet.y = SceneManager.HEIGHT - 58;
            this.beet.speed.y = 0;
            this.beet.canJump = true;
        }
        
    }

}

