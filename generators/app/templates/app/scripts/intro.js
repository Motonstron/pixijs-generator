'use strict';

// Create a global reference to the game so we can reference it.
var PixiGame = PixiGame || {};

// Used by pixi
PixiGame.stage = null;
PixiGame.renderer = null;

// Game Loop Controller
PixiGame.gameLoopController = null;

// Create a reference to the scene controller
PixiGame.sceneController = null;