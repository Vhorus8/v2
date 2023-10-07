import { Container, Sprite, Texture } from "pixi.js";
import { SceneBase } from "../utils/AbstractScene";
import { SceneManager } from "../utils/SceneManager";
import { TickerScene } from "./TickerScene";
import { Button } from "../ui/Button";


export class MenuScene extends SceneBase {
    
    public update():void {}

    private bg: Sprite;
    private buttonPlay: Button;

    constructor() {
        super();

        this.bg = new Sprite(Texture.from("MenuScreen"));

        const dialog = new Container();
        dialog.x = SceneManager.WIDTH / 2;
        dialog.y = SceneManager.HEIGHT / 2;
        
                
            //     const btn = new Button(Texture.from("Button1"))    // Clase 14
            //     btn.on(Button.CLICKED_EVENT, this.goToGame, this)
            
            //     btn.x = 200;
            //     btn.y = 200;
            //     this.addChild(btn);

        // button mouse
        this.buttonPlay = new Button(
            Texture.from("Play"),
            Texture.from("PlayHover"),
            Texture.from("PlayClicked"),
            this.onButtonClick.bind(this)
        );

        this.buttonPlay.y = 110;

        
        this.addChild(this.bg);
        this.addChild(dialog);
        dialog.addChild(this.buttonPlay);      // dialog.addChild(this.buttonMouse);

    }


    private onButtonClick() {     // : void {
        SceneManager.changeScene(new TickerScene());     // Go to Game !
    }

    // private goToGame() {
    // console.log("Go to Game");
    //     SceneManager.changeScene(new TickerScene());
    // }

}