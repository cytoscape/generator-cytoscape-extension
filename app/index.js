var yeoman = require('yeoman-generator');
var fs = require('fs');
var mustache = require('mustache');
var path = require('path');
var options;

module.exports = yeoman.generators.Base.extend({
  constructor: function(){
    yeoman.generators.Base.apply(this, arguments);
  },

  // Your initialization methods (checking current project state, getting configs, etc)
  initializing: {},

  // Where you prompt users for options (where you'd call this.prompt())
  prompting: {

    getOpts: function(){
      var done = this.async();

      this.prompt([
        {
          type    : 'input',
          name    : 'name',
          message : 'Your extension name (e.g. for cytoscape-myextension write "myextension")',
          default : this.appname // Default to current folder name
        },

        {
          type    : 'input',
          name    : 'githubProj',
          message : 'Github project name (e.g. org/cytoscape-myextension)'
        },

        {
          type    : 'input',
          name    : 'description',
          message : 'A one-line description of your extension'
        },

        {
          type    : 'input',
          name    : 'version',
          message : 'Version number',
          default : '1.0.0'
        },

        {
          type    : 'input',
          name    : 'license',
          message : 'License',
          default : 'LGPL3+'
        }
      ], function (answers) {
        options = answers;

        options.fullName = 'cytoscape-' + options.name;

        done();
      }.bind(this));

    }

  },

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files)
  configuring: {},

  default: {},

  // Where you write the generator specific files (routes, controllers, etc)
  writing: {
    writeProj: function(){
      var self = this;
      var dir = this.sourceRoot();
      var destDir = this.destinationRoot();
      var files = fs.readdirSync( dir );

      files.forEach(function( file ){
        var contents = fs.readFileSync( path.join(dir, file), 'utf8' );

        // apply templating
        var templated = mustache.render(contents, options);

        self.dest.write(file, templated);
      });

    }
  },

  // Where installation are run (npm, bower)
  install: {
    addDeps: function(){
      this.log('Installing npm dependencies...');

      this.npmInstall();
    }
  },

  // Called last, cleanup, say good bye, etc
  end: {
    byebye: function(){
      fs.renameSync( './cytoscape-ext.js', options.fullName + '.js' ); // clean up ext file name
      
      this.log('Cytoscape extension creation complete');
    }
  }
});