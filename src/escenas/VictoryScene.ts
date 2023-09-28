import { Container, Sprite, Texture } from "pixi.js";
import { SceneBase } from "../utils/AbstractScene";
import { SceneManager } from "../utils/SceneManager";
import { Button } from "../ui/Button";
import { MenuScene } from "./MenuScene";
import { TickerScene } from "./TickerScene";


export class VictoryScene extends SceneBase {
    
    public update():void {}

    private bg: Sprite;
    private buttonMouse1: Button;
    private buttonMouse2: Button;

    constructor() {
        super();

        this.bg = new Sprite(Texture.from("Bg"));    // imagen provisoria*        

        const dialog = new Container();
        dialog.x = SceneManager.WIDTH / 2;
        dialog.y = SceneManager.HEIGHT / 2;

        
        // button 1 (Menu)
        this.buttonMouse1 = new Button(
            Texture.from("Button1"),
            Texture.from("Button1Over"),
            Texture.from("Button1Down"),
            this.onButton1Click.bind(this)
        );

        this.buttonMouse1.scale.set(0.2);

        // button 2 (Retry)
        this.buttonMouse2 = new Button(
            Texture.from("Button1"),
            Texture.from("Button1Over"),
            Texture.from("Button1Down"),
            this.onButton2Click.bind(this)
        );

        this.buttonMouse2.scale.set(0.2);
        this.buttonMouse2.y = 80;

        
        this.addChild(this.bg);
        this.addChild(dialog);
        dialog.addChild(this.buttonMouse1);      // dialog.addChild(this.buttonMouse);
        dialog.addChild(this.buttonMouse2);

    }


    private onButton1Click() {     // : void {
        SceneManager.changeScene(new MenuScene());     // go to Menu
    }

    private onButton2Click() {     // : void {
        SceneManager.changeScene(new TickerScene());     // go to Game (Retry)
    }

}