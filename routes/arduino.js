var routePrefix = "/arduino";

var routes = {
  index : {
    all : function( req, res ) {
      res.send('Hello arduino!');
    }
  }, 
  count : {
    all : function( req, res ) {
      var teaCounter = res.app.locals.teaCounter;
      res.send(teaCounter.toString());
    },
    del : function( req, res ) {
      var teaCounter = res.app.locals.teaCounter;
      var sessionStore = res.app.get('sessionStore');
      Object.keys(sessionStore.sessions).forEach(function( sid ) {
        var session = JSON.parse(sessionStore.sessions[sid]);
        console.log(session);
        session.wantsTea = false;
        sessionStore.sessions[sid] = JSON.stringify(session);
      }.bind(this));
      res.send( String(teaCounter.reset() ? 1 : 0) );
    }
  }
};
 
exports.init = function( server ) 
{
  server.all(routePrefix, routes.index.all);
  
  server.del(routePrefix+"/count", routes.count.del);
  server.all(routePrefix+"/count", routes.count.all);
};
