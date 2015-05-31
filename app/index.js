'use strict';

var join = require('path').join;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);
        this.pkg = require('../package.json');
    },

    askfor: function() {
        var done = this.async();

        if (!this.options['skip-welcome-message']) {
            this.log(require('yosay')());
            this.log(chalk.magenta(
                'Welcome to the ' + chalk.red('Pixi.js') + ' generator!'
            ));
        }

        var prompts = [{
            type: 'checkbox',
            name: 'features',
            message: 'What external libraries would you like to use?',
            choices: [{
                name: 'Howler',
                value: 'includeHowler',
                checked: false
            }, {
                name: 'Gsap',
                value: 'includeGsap',
                checked: false
            }, {
                name: 'Modernizr',
                value: 'includeModernizr',
                checked: false
            }]
        }];

        this.prompt(prompts, function(answers) {
            var features = answers.features;

            function hasFeature(feat) {
                return features && features.indexOf(feat) !== -1;
            }

            this.includeHowler = hasFeature('includeHowler');
            this.includeGsap = hasFeature('includeGsap');
            this.includeModernizr = hasFeature('includeModernizr');

            done();
        }.bind(this));
    },

    gruntfile: function() {
        this.template('Gruntfile.js');
    },

    packageJSON: function() {
        this.template('_package.json', 'package.json');
    },

    git: function() {
        this.template('gitignore', '.gitignore');
        this.copy('gitattributes', '.gitattributes');
    },

    bower: function() {
        var bower = {
            name: this._.slugify(this.appname),
            private: true,
            dependencies: {}
        };

        if (this.includeHowler) {
            bower.dependencies.howler = "~1.1.25";
        }

        if (this.includeGsap) {
            bower.dependencies.gsap = "~1.16.0";
        }

        if (this.includeModernizr) {
            bower.dependencies.modernizr = "~2.8.2";
        }

        bower.dependencies.pixi = "~3.0.0";

        this.copy('bowerrc', '.bowerrc');
        this.write('bower.json', JSON.stringify(bower, null, 2));
    },

    editorConfig: function () {
        this.copy('editorconfig', '.editorconfig');
    },

    mainStylesheet: function() {
        this.template('main.css', 'app/styles/main.css');
    },

    app: function() {
        this.directory('app');
        this.mkdir('app/scripts');
        this.mkdir('app/styles');
        this.mkdir('app/images');
        this.copy('template.index.html', 'template.index.html');
    },

    install: function() {
        this.installDependencies()
    }

});