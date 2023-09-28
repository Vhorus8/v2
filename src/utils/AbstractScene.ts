import { Container } from "pixi.js";


export abstract class SceneBase extends Container {    // Container updateable

    public abstract update( deltaFrame:number, deltaTime?:number ): void
    
}


// Esta clase (abstracta) no se puede instanciar, sólo se puede 'heredar' d ella