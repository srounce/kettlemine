var routePrefix = "/arduino";

var route = {
  index : {
    all : function(req, res) {
      res.send('Hey buddy!');
    }
  }  
};
 
exports.init = function(server) {
  server.all(routePrefix+'/', route.index.all);
};
