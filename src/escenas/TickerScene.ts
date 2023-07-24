import { Container } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { Player } from "../game/Player";
import { Platform } from "../game/Platform";
import { HEIGHT, WIDTH } from "..";
import { checkCollision } from "../game/IHitbox";

export class TickerScene extends Container implements IUpdateable {
    
    private beetle: Player;
    private plats: Platform[];

    // private metal: IHitbox[];

    private world: Container;
    // private bg: Sprite;

    constructor(){
        super();

        this.world = new Container();

        this.plats = [];

        // Plataformas
        // piso 1:
        let plat = new Platform();
        plat.position.set(275,181);
        this.world.addChild(plat);
        this.plats.push(plat);

        plat = new Platform();
        plat.position.set(314,181);
        this.world.addChild(plat);
        this.plats.push(plat);

        // piso 2:
        plat = new Platform();
        plat.position.set(80,220);
        this.world.addChild(plat);
        this.plats.push(plat);

        plat = new Platform();
        plat.position.set(119,220);
        this.world.addChild(plat);
        this.plats.push(plat);

        plat = new Platform();
        plat.position.set(158,220);
        this.world.addChild(plat);
        this.plats.push(plat);

        plat = new Platform();
        plat.position.set(197,220);
        this.world.addChild(plat);
        this.plats.push(plat);

        plat = new Platform();
        plat.position.set(236,220);
        this.world.addChild(plat);
        this.plats.push(plat);

        plat = new Platform();
        plat.position.set(275,220);
        this.world.addChild(plat);
        this.plats.push(plat);

        plat = new Platform();
        plat.position.set(314,220);
        this.world.addChild(plat);
        this.plats.push(plat);

        // Player
        this.beetle = new Player();
        // this.beetle.scale.set(3);
        this.beetle.x = 80;
        this.beetle.y = 60;
        
        this.addChild(this.world);
        this.addChild(this.beetle);
    }

    public update(deltaTime: number, _deltaFrame: number): void {
        this.beetle.update(deltaTime);  // update animation
        
        for (let plat of this.plats){
            const overlap = checkCollision(this.beetle, plat);
            if (overlap != null){
                this.beetle.separate(overlap, plat.position);
            }
        }

        // Límite player bordes laterales
        if (this.beetle.x > WIDTH){
            this.beetle.x = WIDTH;
        } else if (this.beetle.x < 0){
            this.beetle.x = 0;
        }

        // Límite player borde inferior
        if (this.beetle.y > HEIGHT - 19.5){
            this.beetle.y = HEIGHT - 19.5;
            this.beetle.speed.y = 0;
            this.beetle.canJump = true;
        }


        // this.world.x = -this.beetle.x * this.worldTransform.a + WIDTH / 4; // worldTransform: transformación GLOBAL d un objeto, en forma de matriz (la escala en X está en A, y la escala en Y está en D)
        // this.bg.tilePosition.x = this.world.x * 0.3; // tilePosition: dónde empieza la textura q está en el tilingSprite
    }
}