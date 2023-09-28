import { Loader } from 'pixi.js'
import { assets } from './assets';
import { MenuScene } from './escenas/MenuScene';
import { SceneManager } from './utils/SceneManager';


Loader.shared.add(assets);

Loader.shared.onComplete.add( ()=> {
	const menuSc = new MenuScene();    
    SceneManager.initialize();    
    SceneManager.changeScene(menuSc);
});

Loader.shared.load();