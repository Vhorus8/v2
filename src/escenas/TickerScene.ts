import { Container, Sprite, Texture } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { P1 } from "../game/Player";
import { Borde, Br, Pla } from "../game/Platform";
import { HEIGHT, WIDTH } from "..";
import { checkCollision } from "../game/IHitbox";
import { Ene } from "../game/Enemy";

export class TickerSc extends Container implements IUpdateable {
    private beet: P1;
    private ene: Ene;
    private enes: Ene[];
    private plas: Pla[];
    private brs: Br[];
    private bors: Borde[];
    private w: Container; // World

    constructor(){
        super();

        this.w = new Container();
        this.bors = [];
        this.plas = [];
        this.brs = [];
        this.enes = [];
        const bg: Sprite = new Sprite(Texture.from("Bg"));
        this.w.addChild(bg);

        // bordes
        let bor = new Borde(); bor.position.set(-41,345); this.w.addChild(bor); this.bors.push(bor);
        bor = new Borde(); bor.position.set(470,384); this.w.addChild(bor); this.bors.push(bor);

    // piso 1:
        let br = new Br(); br.position.set(58.5,247.5); this.w.addChild(br); this.brs.push(br);
        let pla = new Pla(); pla.position.set(97.5,247.5); this.w.addChild(pla); this.plas.push(pla);
        br = new Br(); br.position.set(136.5,247.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(175.5,247.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(214.5,247.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(253.5,247.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(292.5,247.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(331.5,247.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(370.5,247.5); this.w.addChild(br); this.brs.push(br);
    // piso 2:
        br = new Br(); br.position.set(58.5,286.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(97.5,286.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(136.5,286.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(175.5,286.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(214.5,286.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(253.5,286.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(292.5,286.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(331.5,286.5); this.w.addChild(br); this.brs.push(br);
        pla = new Pla(); pla.position.set(370.5,286.5); this.w.addChild(pla); this.plas.push(pla);
    // piso 3:
        br = new Br(); br.position.set(58.5,325.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(97.5,325.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(136.5,325.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(175.5,325.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(214.5,325.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(253.5,325.5); this.w.addChild(br); this.brs.push(br);
        pla = new Pla(); pla.position.set(292.5,325.5); this.w.addChild(pla); this.plas.push(pla);
        br = new Br(); br.position.set(331.5,325.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(370.5,325.5); this.w.addChild(br); this.brs.push(br);
    // piso 4:
        br = new Br(); br.position.set(58.5,364.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(97.5,364.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(136.5,364.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(175.5,364.5); this.w.addChild(br); this.brs.push(br);
        pla = new Pla(); pla.position.set(214.5,364.5); this.w.addChild(pla); this.plas.push(pla);
        pla = new Pla(); pla.position.set(253.5,364.5); this.w.addChild(pla); this.plas.push(pla);
        br = new Br(); br.position.set(292.5,364.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(331.5,364.5); this.w.addChild(br); this.brs.push(br);
        br = new Br(); br.position.set(370.5,364.5); this.w.addChild(br); this.brs.push(br);
        
        // Player
        this.beet = new P1();
        this.beet.x = 455;
        this.beet.y = 90;
        
        this.addChild(this.w);
        this.addChild(this.beet);

        // Enemy
        this.ene = new Ene();
        this.ene.position.set(20,125);
        this.addChild(this.ene);
        this.enes.push(this.ene);
    }

    public update(deltaTime: number, _deltaFrame: number): void {
        this.beet.update(deltaTime);  // update animation
        this.ene.update(deltaTime);
        
        // Eventos brick
        for (let br of this.brs){
            const overlap = checkCollision(this.beet, br);
            if (overlap != null){
                this.beet.separate(overlap, br.position);
                if (this.beet.roll == true){
                    if (this.beet.y > br.y - 34){  //Rueda: colisión lateral
                        this.beet.speed.y = -160;
                        let brPos = this.brs.indexOf(br);
                        this.brs.splice(brPos,1);  // eliminar (o reemplazar) del array
                        this.w.removeChild(br);
                        // agregar rebote lateral?
                    }
                    else if (this.beet.y <= br.y - 34 && this.beet.break == true){  //salto Rueda: colisión superior (38.5 distancia vertical justa)
                        this.beet.break = false;
                        this.beet.speed.y = -160;
                        let brPos = this.brs.indexOf(br);
                        this.brs.splice(brPos,1);  // eliminar (o reemplazar) del array
                        this.w.removeChild(br);
                    }}}}

        // Colisión enemigos     // setTimeout(()=>{ this.beet.break = false; }, 460);  * * *
        for (let ene of this.enes){
            const overlap = checkCollision(this.beet, ene);
            if (overlap != null){
                if (this.beet.roll == true){
                    let enePos = this.enes.indexOf(ene);
                    this.enes.splice(enePos,1);
                    this.removeChild(ene);
                }
                else if (this.beet.invu == false){
                    if (this.beet.y < ene.y - 25 && this.beet.x < ene.x + 20 && this.beet.x > ene.x - 20){  // colisión desde arriba
                        let enePos = this.enes.indexOf(ene);
                        this.enes.splice(enePos,1);
                        this.removeChild(ene);  // this.w.removeChild(ene);
                        this.beet.speed.y = -160;
                    }
                    else {   // toda otra colisión
                        // bajar vida Beetle * * *
                        this.beet.invu = true;
                        setTimeout(()=>{ this.beet.invu = false; this.beet.visible = true; }, 2000);
                        // titilar (visible/invisible, tint?) * * *
                        this.beet.visible = false;  // provisorio*
                        let eneSpeed = this.ene.speed.x;
                        this.ene.speed.x = 0;
                        setTimeout(()=>{ this.ene.speed.x = eneSpeed; }, 2000);
                    }
                }
            }
        }
        
        for (let pla of this.plas){
            const overlap = checkCollision(this.beet, pla);
            if (overlap != null){
                this.beet.separate(overlap, pla.position);
                if (this.beet.y <= pla.y - 34 && this.beet.break == true){
                    this.beet.break = false;
                    this.beet.speed.y = -90;
                }}}

        for (let bor of this.bors){
            const overlap = checkCollision(this.beet, bor);
            if (overlap != null){
                this.beet.separate(overlap, bor.position);
                if (this.beet.y <= bor.y - 211 && this.beet.break == true){
                    this.beet.break = false;
                    this.beet.speed.y = -90;
                }}}

        // límite bordes laterales
        if (this.beet.x > WIDTH){
            this.beet.x = WIDTH;
        } else if (this.beet.x < 0){ this.beet.x = 0; }

        // límite borde inferior
        if (this.beet.y > HEIGHT - 58){
            this.beet.y = HEIGHT - 58;
            this.beet.speed.y = 0;
            this.beet.canJump = true;
        }

        // this.world.x = -this.beetle.x * this.worldTransform.a + WIDTH / 4; // worldTransform: transformación GLOBAL d un objeto, en forma de matriz (la escala en X está en A, la escala en Y está en D)
        // this.bg.tilePosition.x = this.world.x * 0.3; // tilePosition: dónde empieza la textura del tilingSprite
    
        // Enemy
        for (let bor of this.bors){
            const overlap = checkCollision(this.ene, bor);
            if (overlap != null){
                this.ene.separate(overlap, bor.position);
                if (this.ene.y > bor.y - 192 && this.ene.y < bor.y + 192){
                    if (this.ene.x < bor.x){
                        this.ene.speed.x = -Ene.ESPEED;
                        this.ene.eWalk.scale.x = -1;
                    }
                    else if (this.ene.x > bor.x){
                        this.ene.speed.x = Ene.ESPEED;
                        this.ene.eWalk.scale.x = 1;
                    }}}}

        for (let br of this.brs){
            const overlap = checkCollision(this.ene, br);
            if (overlap != null){
                this.ene.separate(overlap, br.position);
                if (this.ene.y > br.y - 33 && this.ene.y < br.y + 33){
                    if (this.ene.x < br.x){
                        this.ene.speed.x = -Ene.ESPEED;
                        this.ene.eWalk.scale.x = -1;
                    }
                    else if (this.ene.x > br.x){
                        this.ene.speed.x = Ene.ESPEED;
                        this.ene.eWalk.scale.x = 1;
                    }}}}

        for (let pla of this.plas){
            const overlap = checkCollision(this.ene, pla);
            if (overlap != null){
                this.ene.separate(overlap, pla.position);
                if (this.ene.y > pla.y - 33 && this.ene.y < pla.y + 33){
                    if (this.ene.x < pla.x){
                        this.ene.speed.x = -Ene.ESPEED;
                        this.ene.eWalk.scale.x = -1;
                    }
                    else if (this.ene.x > pla.x){
                        this.ene.speed.x = Ene.ESPEED;
                        this.ene.eWalk.scale.x = 1;
                    }}}}
        
        // límite bordes laterales
        if (this.ene.x > WIDTH){
            this.ene.x = WIDTH;
            this.ene.speed.x = -Ene.ESPEED;
            this.ene.eWalk.scale.x = -1;
        } else if (this.ene.x < 0){
            this.ene.x = 0;
            this.ene.speed.x = Ene.ESPEED;
            this.ene.eWalk.scale.x = 1;
        }

        // límite borde inferior
        if (this.ene.y > HEIGHT - 58){
            this.ene.y = HEIGHT - 58;
            this.ene.speed.y = 0;
        }
    }
}