PixiGame.GameScene = function() {
    PIXI.Graphics.call(this);

    this.setup();
};

PixiGame.GameScene.constructor = PixiGame.GameScene;
PixiGame.GameScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.GameScene.prototype.setup = function() {}

PixiGame.GameScene.prototype.update = function() {}

PixiGame.GameScene.prototype.destroy = function() {
	this.removeChildren();
}
