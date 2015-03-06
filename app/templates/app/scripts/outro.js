document.addEventListener('DOMContentLoaded', function() {

	//
	PixiGame.stage = new PIXI.Stage(0x000000, true);
	
	//
	PixiGame.renderer = new PIXI.autoDetectRenderer(640, 960);
	PixiGame.renderer.view.setAttribute('class', 'renderer');
	document.body.appendChild(PixiGame.renderer.view);

	// 
	PixiGame.sceneController = new PixiGame.SceneController(PixiGame.MainMenuScene);

	//
	PixiGame.gameLoopController = new PixiGame.GameLoopController();
	PixiGame.gameLoopController.start();
});