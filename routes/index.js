var fs = require('fs'),
    colors = require('colors');
 
module.exports = function(server) {
  var modules = [
    'arduino'
  ];
 
  modules.forEach(function(module, index){
    console.log(('Loading: '+require.resolve(__dirname+'/'+module).replace(new RegExp('('+__dirname+'|index|\\.js|/)', 'gi'), '').bold).green);
    require(__dirname+'/'+module).init(server);
  });
};
