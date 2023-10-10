import { ExtensionType, Loader, extensions } from 'pixi.js'
import { assets } from './assets';
import { SceneManager } from './utils/SceneManager';
import { UnlockScene } from './escenas/UnlockScene';
import { WebfontLoaderPlugin } from 'pixi-webfont-loader';


Loader.shared.add(assets);

// Loader.registerPlugin(WebfontLoaderPlugin);

extensions.add({
    type: ExtensionType.Loader,
    ref: WebfontLoaderPlugin,
});

Loader.shared.onComplete.add( ()=> {    
	// const menuSc = new MenuScene();
    const unlockSc = new UnlockScene();
    SceneManager.initialize();    
    SceneManager.changeScene(unlockSc);
});

Loader.shared.load();