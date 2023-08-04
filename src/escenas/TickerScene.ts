import { Container, Sprite, Texture } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { P1 } from "../game/Player";
import { Br, Pla } from "../game/Platform";
import { HEIGHT, WIDTH } from "..";
import { checkCollision } from "../game/IHitbox";
// import { Hb1 } from "../game/Bordes";

export class TickerSc extends Container implements IUpdateable {
    private beet: P1;
    private plas: Pla[];
    private brs: Br[];
    private w: Container; // World
    constructor(){
        super();

        this.w = new Container();
        // let h1: Hb1 = new Hb1();

        this.plas = [];
        this.brs = [];

        const bg: Sprite = new Sprite(Texture.from("Bg"));
        this.w.addChild(bg);

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
        this.beet.x = 275;
        this.beet.y = 60;
        
        this.addChild(this.w);
        // this.addChild(h1);
        this.addChild(this.beet);
    }

    public update(deltaTime: number, _deltaFrame: number): void {
        this.beet.update(deltaTime);  // update animation
        
        for (let pla of this.plas){
            const overlap = checkCollision(this.beet, pla);
            if (overlap != null){
                this.beet.separate(overlap, pla.position);
                if (this.beet.y <= pla.y - 34 && this.beet.break == true){
                    this.beet.break = false;
                    this.beet.speed.y = -90;
                }}}

        // Eventos brick
        for (let br of this.brs){
            const overlap = checkCollision(this.beet, br);
            if (overlap != null){  // (si hay colisión)

                if (this.beet.roll == false){
                    this.beet.separate(overlap, br.position);

                } else if (this.beet.roll == true){
                    if (this.beet.y > br.y - 34){  //Rueda: colisión lateral
                        const brPos = this.brs.indexOf(br);
                        this.brs.splice(brPos,1);  // eliminar (o reemplazar) del array
                        this.beet.speed.y = -160;
                        this.w.removeChild(br);
                        // agregar rebote lateral?
                        
                    } else if (this.beet.y <= br.y - 34 && this.beet.break == true){  //salto Rueda: colisión superior (38.5 distancia vertical justa)
                        this.beet.break = false;
                        const brPos = this.brs.indexOf(br);
                        this.brs.splice(brPos,1);  // eliminar (o reemplazar) del array
                        this.w.removeChild(br);
                        this.beet.speed.y = -160;
                    } else {
                        this.beet.separate(overlap, br.position);
                    }}}}

        // límite bordes laterales
        if (this.beet.x > WIDTH){
            this.beet.x = WIDTH;
        } else if (this.beet.x < 0){ this.beet.x = 0; }

        // límite borde inferior
        if (this.beet.y > HEIGHT - 19){
            this.beet.y = HEIGHT - 19;
            this.beet.speed.y = 0;
            this.beet.canJump = true;
        }

        // this.world.x = -this.beetle.x * this.worldTransform.a + WIDTH / 4; // worldTransform: transformación GLOBAL d un objeto, en forma de matriz (la escala en X está en A, y la escala en Y está en D)
        // this.bg.tilePosition.x = this.world.x * 0.3; // tilePosition: dónde empieza la textura q está en el tilingSprite
    }
}