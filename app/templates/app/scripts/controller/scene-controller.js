PixiGame.SceneController = function(Scene) {

    this._currentScene = new Scene();
    this._previousScene = null;

    PixiGame.stage.addChild(this._currentScene);
}

PixiGame.SceneController.constructor = PixiGame.SceneController;

PixiGame.SceneController.prototype.update = function() {
    this._currentScene.update();
}

PixiGame.SceneController.prototype.requestSceneChange = function(Scene) {

    if (this._currentScene !== null) {
        this._previousScene = this._currentScene;
        this._previousScene.destroy();
        PixiGame.stage.removeChild(this._previousScene);
    }

    this._currentScene = new Scene();
    PixiGame.stage.addChild(this._currentScene);
}
