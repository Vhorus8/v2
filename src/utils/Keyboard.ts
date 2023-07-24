import { utils } from "pixi.js";

export class Keyboard {

    public static readonly state: Map<string, boolean> = new Map();
    public static readonly down: utils.EventEmitter = new utils.EventEmitter();
    public static readonly up: utils.EventEmitter = new utils.EventEmitter();

    private constructor(){} //para no poder instanciarla desde afuera (new)

    private static initialized:boolean = false;
    public static initialize():void {
        if (Keyboard.initialized){
            return;
        }

        Keyboard.initialized = true; //con las estáticas hay q usar el nombre d la clase para accesarla (en lugar d 'this')
        document.addEventListener("keydown", Keyboard.onKeyDown);
        document.addEventListener("keyup", Keyboard.onKeyUp);
    }

    private static onKeyDown(e:KeyboardEvent){  // "e" de "evento"
        if (Keyboard.state.get(e.code) != true){
            Keyboard.down.emit(e.code);

            console.log(e); // ver Código Tecla
        }
        Keyboard.state.set(e.code, true);
    }

    private static onKeyUp(e:KeyboardEvent){
        Keyboard.up.emit(e.code);
        Keyboard.state.set(e.code, false);
    }
}