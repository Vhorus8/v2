import { utils } from "pixi.js";

export class Keyb {

    public static readonly state: Map<string, boolean> = new Map();
    public static readonly down: utils.EventEmitter = new utils.EventEmitter();
    public static readonly up: utils.EventEmitter = new utils.EventEmitter();

    private constructor(){} //para no poder instanciarla desde afuera (new)

    private static initialized:boolean = false;
    public static initialize():void {
        if (Keyb.initialized){
            return;
        }

        Keyb.initialized = true; //con las estáticas hay q usar el nombre d la clase para accesarla (en lugar d 'this')
        document.addEventListener("keydown", Keyb.onKeyDown);
        document.addEventListener("keyup", Keyb.onKeyUp);
    }

    private static onKeyDown(e:KeyboardEvent){  // "e" de "evento"
        if (Keyb.state.get(e.code) != true){
            Keyb.down.emit(e.code);

            // console.log(e); // ver Código Tecla
        }
        Keyb.state.set(e.code, true);
    }

    private static onKeyUp(e:KeyboardEvent){
        Keyb.up.emit(e.code);
        Keyb.state.set(e.code, false);
    }
}