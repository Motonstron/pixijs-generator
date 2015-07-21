PixiGame.MainMenuScene = function() {
    PIXI.Graphics.call(this);
    
    this._playButton = null;
    this.setup();
};

PixiGame.MainMenuScene.constructor = PixiGame.MainMenuScene;
PixiGame.MainMenuScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.MainMenuScene.prototype.setup = function() {
    this._playButton = new PIXI.Sprite.fromImage('images/game/play-game-btn.png');
    this._playButton.anchor = new PIXI.Point(0.5, 0.5);
    this._playButton.position.x = 320;
    this._playButton.position.y = 480;
    this._playButton.interactive = true;
    this._playButton.touchstart = this._playButton.mousedown = this.handlePlayButtonPressed.bind(this);
    this.addChild(this._playButton);
}

PixiGame.MainMenuScene.prototype.handlePlayButtonPressed = function(event){
	PixiGame.sceneController.requestSceneChange(PixiGame.GameScene);
}

PixiGame.MainMenuScene.prototype.update = function() {}

PixiGame.MainMenuScene.prototype.destroy = function() {
	this.removeChildren();
	this._playButton = null;
}
