import { Container } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { Player } from "../game/Player";
import { Brick, Platform } from "../game/Platform";
import { HEIGHT, WIDTH } from "..";
import { checkCollision } from "../game/IHitbox";

export class TickerScene extends Container implements IUpdateable {

    private beetle: Player;
    private plats: Platform[];
    // private breakable: Breakable[]; // ladrillos rompibles
    private bricks: Brick[];
    // private metal: IHitbox[];
    // private bg: Sprite;
    private world: Container;

    constructor(){
        super();

        this.world = new Container();
        this.plats = [];
        this.bricks = [];

        let brick = new Brick(); // Ladrillo
        let plat = new Platform(); // Bloque metal

        // let brik = new Breakable(); brik.position.set(236,181);  // *
        // this.world.addChild(brik); this.breakable.push(brik);

    // piso 1:
        brick = new Brick(); brick.position.set(275,181);  // 0
        this.world.addChild(brick); this.bricks.push(brick);

        brick = new Brick(); brick.position.set(314,181);  // 1
        this.world.addChild(brick); this.bricks.push(brick);

        brick = new Brick(); brick.position.set(353,181);  // 2
        this.world.addChild(brick); this.bricks.push(brick);

        brick = new Brick(); brick.position.set(392,181);  // 3
        this.world.addChild(brick); this.bricks.push(brick);
    // piso 2:
        plat = new Platform(); plat.position.set(80,220);
        this.world.addChild(plat); this.plats.push(plat);

        plat = new Platform(); plat.position.set(119,220);
        this.world.addChild(plat); this.plats.push(plat);

        plat = new Platform(); plat.position.set(158,220);
        this.world.addChild(plat); this.plats.push(plat);

        plat = new Platform(); plat.position.set(197,220);
        this.world.addChild(plat); this.plats.push(plat);

        plat = new Platform(); plat.position.set(236,220);
        this.world.addChild(plat); this.plats.push(plat);

        plat = new Platform(); plat.position.set(275,220);
        this.world.addChild(plat); this.plats.push(plat);

        plat = new Platform(); plat.position.set(314,220);
        this.world.addChild(plat); this.plats.push(plat);

        plat = new Platform(); plat.position.set(353,220);
        this.world.addChild(plat); this.plats.push(plat);

        plat = new Platform(); plat.position.set(392,220);
        this.world.addChild(plat); this.plats.push(plat);

        // Player
        this.beetle = new Player();
        this.beetle.x = 275;
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

        for (let brick of this.bricks){  // eventos brick?
            const overlap = checkCollision(this.beetle, brick);
            if (overlap != null){  // (si hay colisión)
                if (this.beetle.rollState == false){
                    this.beetle.separate(overlap, brick.position);
                } else {  // (rollState = true)
                    
                    // this.bricks.splice(0,1); // Splice! - hay q eliminar los objetos del array
                    this.world.removeChild(brick);   // *
                    // this.beetle.speed.y = -100;
                    // this.beetle.speed.x = -this.beetle.speed.x;
                }
            }
        }

        // límite bordes laterales
        if (this.beetle.x > WIDTH){
            this.beetle.x = WIDTH;
        } else if (this.beetle.x < 0){
            this.beetle.x = 0;
        }

        // límite borde inferior
        if (this.beetle.y > HEIGHT - 19.5){
            this.beetle.y = HEIGHT - 19.5;
            this.beetle.speed.y = 0;
            this.beetle.canJump = true;
        }


        // this.world.x = -this.beetle.x * this.worldTransform.a + WIDTH / 4; // worldTransform: transformación GLOBAL d un objeto, en forma de matriz (la escala en X está en A, y la escala en Y está en D)
        // this.bg.tilePosition.x = this.world.x * 0.3; // tilePosition: dónde empieza la textura q está en el tilingSprite
    }
}