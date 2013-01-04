var routePrefix = "/arduino";

var route = {
  index : {
    all : function( req, res ) {
      res.send('Hello arduino!');
    }
  }, 
  count : {
    all : function( req, res ) {
      var teaCounter = res.app.locals.teaCounter;
      res.send(teaCounter.toString());
    }
  }
};
 
exports.init = function( server ) {
  server.all(routePrefix, route.index.all);
  server.all(routePrefix+"/count", route.count.all);
};
