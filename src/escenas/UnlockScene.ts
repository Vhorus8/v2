import { Texture } from "pixi.js";
import { Button } from "../ui/Button";
import { SceneBase } from "../utils/AbstractScene";
import { MenuScene } from "./MenuScene";
import { SceneManager } from "../utils/SceneManager";


export class UnlockScene extends SceneBase {

    public update():void {}

    private unlock: Button;

    constructor() {
        super();

    this.unlock = new Button(
        Texture.from("Unlock"),
        Texture.from("Unlock"),
        Texture.from("Unlock"),
        this.onButtonClick.bind(this)
    );

    this.unlock.x = SceneManager.WIDTH / 2;
    this.unlock.y = SceneManager.HEIGHT / 2;

    this.addChild(this.unlock);

    }


    private onButtonClick() {
        SceneManager.changeScene(new MenuScene());     // Go to Menu
    }

}