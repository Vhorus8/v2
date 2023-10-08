import { Loader } from 'pixi.js'
import { assets } from './assets';
import { SceneManager } from './utils/SceneManager';
import { UnlockScene } from './escenas/UnlockScene';


Loader.shared.add(assets);

Loader.shared.onComplete.add( ()=> {
	// const menuSc = new MenuScene();
    const unlockSc = new UnlockScene();
    SceneManager.initialize();    
    SceneManager.changeScene(unlockSc);
});

Loader.shared.load();