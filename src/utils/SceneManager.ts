import { Application, SCALE_MODES, Ticker, settings } from "pixi.js";
import { Keyboard } from "./Keyboard";
import { SceneBase } from "./AbstractScene";


export namespace SceneManager {

    export const WIDTH = 540;
    export const HEIGHT = 540;

    let currentScene: SceneBase;
    let app: Application;

    
    export function initialize() {

        if (app != undefined) {
            console.error("Don't call 'initialize' twice!")
            return;
        }

        settings.ROUND_PIXELS = true;
        settings.SCALE_MODE = SCALE_MODES.NEAREST;

        app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0xECE9DA,
            width: WIDTH,
            height: HEIGHT
        });

        Keyboard.initialize();

        // adaptar tamaño lienzo a ventana
        window.addEventListener("resize", () => {

            const scaleX = window.innerWidth / app.screen.width;
            const scaleY = window.innerHeight / app.screen.height;
            const scale = Math.min( scaleX, scaleY );         // 'floor' en vez d 'min' ?

            const gameWidth = Math.round(app.screen.width * scale);
            const gameHeight = Math.round(app.screen.height * scale);

            const marginHorizontal = Math.floor((window.innerWidth - gameWidth) / 2);
            const marginVertical = Math.floor((window.innerHeight - gameHeight) / 2);

            app.view.style.width = gameWidth + "px";
            app.view.style.height = gameHeight + "px";

            app.view.style.marginLeft = marginHorizontal + "px";
            app.view.style.marginTop = marginVertical + "px";
        });

        window.dispatchEvent(new Event("resize"));


        Ticker.shared.add(update);

    }


    export function changeScene( newScene:SceneBase ) {

        if (currentScene) {
            currentScene.destroy();
        }
        currentScene = newScene;
        app.stage.addChild(currentScene);
    }
    

    function update() {     // update( framePassed:number )
        // Group.shared.update();   // para actualizar 'Tweens'
        currentScene?.update( Ticker.shared.elapsedMS );    //  framePassed, 
    }

}