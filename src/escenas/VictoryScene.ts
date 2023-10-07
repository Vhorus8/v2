import { Container, Sprite, Texture } from "pixi.js";
import { SceneBase } from "../utils/AbstractScene";
import { SceneManager } from "../utils/SceneManager";
import { Button } from "../ui/Button";
import { MenuScene } from "./MenuScene";
import { TickerScene } from "./TickerScene";


export class VictoryScene extends SceneBase {
    
    public update():void {}

    private bg: Sprite;
    private buttonRetry: Button;
    private buttonMenu: Button;

    constructor() {
        super();

        this.bg = new Sprite(Texture.from("Bg"));    // imagen provisoria*        

        const dialog = new Container();
        dialog.x = SceneManager.WIDTH / 2;
        dialog.y = SceneManager.HEIGHT / 2;

        
        // button 1 (Menu)
        this.buttonRetry = new Button(
            Texture.from("Retry"),
            Texture.from("RetryHover"),
            Texture.from("RetryClicked"),
            this.onRetryClick.bind(this)
        );

        // button 2 (Retry)
        this.buttonMenu = new Button(
            Texture.from("Menu"),
            Texture.from("MenuHover"),
            Texture.from("MenuClicked"),
            this.onMenuClick.bind(this)
        );

        this.buttonMenu.y = 80;

        
        this.addChild(this.bg);
        this.addChild(dialog);
        dialog.addChild(this.buttonRetry);
        dialog.addChild(this.buttonMenu);

    }


    private onMenuClick() {     // : void {
        SceneManager.changeScene(new MenuScene());     // go to Menu
    }

    private onRetryClick() {     // : void {
        SceneManager.changeScene(new TickerScene());     // go to Game (Retry)
    }

}