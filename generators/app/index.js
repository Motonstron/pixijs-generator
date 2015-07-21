'use strict';

var join = require('path').join;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('lodash');
var slugify = require('slugify');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);
        this.pkg = require('../../package.json');
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
    
    jshint: function() {
        this.fs.copy(
            this.templatePath('jshintrc'),
            this.destinationPath('.jshintrc')
        );
    },

    gruntfile: function() {
        this.template('Gruntfile.js');
    },

    packageJSON: function() {
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            {
                appname: slugify(this.appname)
            }
        );
    },

    git: function() {
        this.fs.copy(
            this.templatePath('gitignore'),
            this.destinationPath('.gitignore')
        );
        this.fs.copy(
            this.templatePath('gitattributes'),
            this.destinationPath('.gitgitattributesignore')
        );
    },

    bower: function() {
        var bower = {
            name: slugify(this.appname),
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
        
        this.fs.copy(
            this.templatePath('bowerrc'),
            this.destinationPath('.bowerrc')
        );

        this.write('bower.json', JSON.stringify(bower, null, 2));
    },

    editorConfig: function () {
        
        this.fs.copy(
            this.templatePath('editorconfig'),
            this.destinationPath('.editorconfig')
        );
    },

    mainStylesheet: function() {
        this.fs.copy(
            this.templatePath('main.css'),
            this.destinationPath('app/styles/main.css')
        );
    },

    app: function() {
        this.directory('app');
        mkdirp('app/scripts');
        mkdirp('app/styles');
        mkdirp('app/images');
        
        this.fs.copy(
            this.templatePath('template.index.html'),
            this.destinationPath('template.index.html')
        );
    },

    install: function() {
        this.installDependencies()
    }

});