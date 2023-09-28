import { Container } from "pixi.js";
import { Enemy } from "./Enemy";
import { IUpdateable } from "../utils/IUpdateable";


export class EnemySpawner extends Container implements IUpdateable {

    private enemy: Enemy = new Enemy();
    private enemies: Enemy[];
    public enemyCount: number = 0;

    constructor() {
        super();

        this.enemies = [];

        // Spawn enemies
        while (this.enemyCount < 4) {
            this.enemyCount ++;
            setTimeout(() => {
                this.enemy = new Enemy();
                this.enemy.position.set(20, 125);
                this.addChild(this.enemy);
                this.enemies.push(this.enemy);
            }, 1500);
        }

    }


    public update(deltaTime: number): void {

        this.enemy.update(deltaTime);

        // Spawn enemies
        // while (this.enemyCount < 4) {
        //     this.enemyCount ++;
        //     setTimeout(() => {
        //         this.enemy = new Enemy();
        //         this.enemy.position.set(20, 125);
        //         this.addChild(this.enemy);
        //         this.enemies.push(this.enemy);
        //     }, 1500);
        // }

    }

}


// public override update(deltaMS: number) {
//     super.update(deltaMS / 1000);   // 'super.update' llama al update del padre
//     this.bIdle.update(deltaMS / (1000/60));   // deltaFrame
// }