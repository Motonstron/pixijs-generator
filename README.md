# Pixi.js Generator [![Build Status](https://secure.travis-ci.org/mindcandy/pixijs-generator.png?branch=master)](https://travis-ci.org/mindcandy/pixijs-generator)

> [Yeoman](http://yeoman.io) Pixi.js generator - Lets you quickly scaffold out a Pixi.js game with a Main Menu and Game Scene. Includes Rendering Setup, Scene Changing and Bootstrap.

Find out more about [Pixi.js](http://www.pixijs.com/), or view the [documentation](http://www.goodboydigital.com/pixijs/docs/).

## Getting Started

To start you will need [Node.js](https://nodejs.org/), [Yeoman](http://yeoman.io/) and [Grunt](http://gruntjs.com/).

Once you have these installed you can run: `npm install -g generator-pixijs`

Once this is complete you need to make sure you're in the directory you want to create the game in, once this is ok you can bring up Yeoman by typing `yo` in your terminal, or you can run `yo pixijs`. You will be presented with the following:

![Pixi.js Generator](https://cloud.githubusercontent.com/assets/194175/8824384/0f4a5d42-306d-11e5-8b9b-eab715390f78.png)

You will be presented with a list of libraries:

- [Howler](https://github.com/goldfire/howler.js/)
- [Gsap](http://greensock.com/gsap)
- [Modernizr](http://modernizr.com/)

These libraries can be utilised within your game, however if you don't want to use these libraries the scaffolding will still work without them and you can use your own. Once you've chosen your libraries, hit enter to create the project.

It may take a while to create the project, so go grab a drink and we'll see you on the other side.

### Developing your Game

Now you've got your project all set up, you're good to start developing your game. I won't go in to how to develop games in pixi.js here, but you can find demo projects using this generator [here](http://linktodemos.com).

#### Running Your Game

You can run the game simply by typing `grunt serve` in your terminal window, this will do the following:

 - Inject external dependencies in to the template.index.html
 - Create a local server.
 - Watches the app folder for any changes to files, if any are detected it will reload the game.

To stop the local server, press `ctrl+c` in your terminal window.

You may also want to run the distribution build of your game, to  do this just run `grunt serve:dist` from your terminal window. 

### Publishing Your Game

Once you're ready to publish your game you just need to run `grunt` from your terminal window, this will do the following:

- Run JS Beautify on the files.
- Concatinate all files in to one js file.
- Uglify the concatinated js file.
- Compress all image assets ready for the web.
- Copy all of the dependencies to the distribution folder.
- Inject all of the dependencies in to the index.html file.

Your published game will be located in the 'dist' folder. Upload this folder to your Web Server and you're good to go.

### Contributing to the project

We're always open to people contributing, if you want to add a feature or find a bug that you've fixed just submit a pull request. 

We're also happy for people to fork this repository to maintain a custom version. If you fork the repository just run `npm install && npm link` to maintain using the `yo pixijs` command, or choose your own.

## License

[MIT](http://opensource.org/licenses/MIT)
