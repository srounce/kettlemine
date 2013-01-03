var fs = require('fs'),
    colors = require('colors');
 
module.exports = function(server) {
  var modules = [
    'core',
    'arduino'
  ];
 
  modules.forEach(function(module, index) {
    try { 
      console.log(('Loading: '+require.resolve(__dirname+'/'+module).replace(new RegExp('('+__dirname+'|index|\\.js|/)', 'gi'), '').bold).green);
      require(__dirname+'/'+module).init(server);
    } catch( e ) {
      console.error('Loading module "' + module.bold + '" failed!'.red);
    }
  });
};
