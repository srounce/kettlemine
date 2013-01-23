var fs = require('fs'),
    path = require('path'),
    colors = require('colors'),
    IncrementStore = require('../lib/incrementstore');
 
module.exports = function(server) {
  var modules = [
    'home',
    'arduino'
  ];

  server.locals.notifyCounter = new IncrementStore();
  server.locals.teaCounter = new IncrementStore();
 
  modules.forEach(function(module, index) {
    try { 
      console.log(('Loading: '+require.resolve(__dirname+'/'+module).replace(new RegExp('('+__dirname+'|index|\\.js|/)', 'gi'), '').bold).green);
      var module = require( path.join(__dirname, module) );
      module.init(server);
    } catch( e ) {
      console.error(('Loading module "' + module.bold + '" failed:\n\t' + e.toString().bold).red);
    }
  });
};
