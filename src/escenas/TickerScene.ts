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

    // private world: Container;
    // private bg: Sprite;

    constructor(){
        super();

        // this.world = new Container();

        this.plats = [];

        // Plataformas
        let plat = new Platform();
        plat.position.set(20,100);
        // this.world.addChild(plat);
        this.addChild(plat);
        this.plats.push(plat);

        plat = new Platform();
        plat.position.set(50,100);
        // this.world.addChild(plat);
        this.addChild(plat);
        this.plats.push(plat);

        // Player
        this.beetle = new Player();
        this.beetle.x = 50;
        this.beetle.y = 60;
        this.addChild(this.beetle);

        // this.addChild(this.world);
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
        if (this.beetle.y > HEIGHT - 6.5){
            this.beetle.y = HEIGHT - 6.5;
            this.beetle.speed.y = 0;
            this.beetle.canJump = true;
        }


        // this.world.x = -this.beetle.x * this.worldTransform.a + WIDTH / 4; // worldTransform: transformación GLOBAL d un objeto, en forma de matriz (la escala en X está en A, y la escala en Y está en D)
        // this.bg.tilePosition.x = this.world.x * 0.3; // tilePosition: dónde empieza la textura q está en el tilingSprite
    }
}