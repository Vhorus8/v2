import { Application, Loader, SCALE_MODES, Ticker, settings } from 'pixi.js'
import { assets } from './assets';
import { TickerScene } from './escenas/TickerScene';
import { Keyboard } from './utils/Keyboard';

export const WIDTH = 230;
export const HEIGHT = 250;

settings.ROUND_PIXELS = true;
settings.SCALE_MODE = SCALE_MODES.LINEAR;

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: WIDTH,
	height: HEIGHT
});

Keyboard.initialize();

// adaptar tamaño lienzo a ventana
window.addEventListener("resize", ()=>{

	const scaleX = window.innerWidth / app.screen.width; //ancho navegador dividido x ancho lienzo
	const scaleY = window.innerHeight / app.screen.height;
	const scale = Math.min(scaleX,scaleY);

	const gameWidth = Math.round(app.screen.width * scale);
	const gameHeight = Math.round(app.screen.height * scale);
	
	const marginHorizontal = Math.floor((window.innerWidth - gameWidth) / 2);
	const marginVertical = Math.floor((window.innerHeight - gameHeight) / 2);

	app.view.style.width = gameWidth + "px";
	app.view.style.height = gameHeight + "px";

	app.view.style.marginLeft = marginHorizontal + "px"; //marginHorizontal.toString()  para convertir a string
	// app.view.style.marginRight = marginHorizontal + "px";
	app.view.style.marginTop = marginVertical + "px";
	// app.view.style.marginBottom = marginVertical + "px";
});
window.dispatchEvent(new Event("resize"));


Loader.shared.add(assets);

Loader.shared.onComplete.add(()=>{
	const escena = new TickerScene();
	app.stage.addChild(escena);

	Ticker.shared.add(function(deltaFrame){
		escena.update(Ticker.shared.deltaMS, deltaFrame);
	});
});

Loader.shared.load();