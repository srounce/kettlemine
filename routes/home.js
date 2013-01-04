var routePrefix = "/";

var routes = {
  index : {
    all : function( req, res ) {
      var teaCounter = 0;

      var wantsTea = req.session.wantsTea = (req.session.wantsTea || 0);

      res.render('index', {
        routePrefix : routePrefix,
        title : 'iBrew',
        wantsTea : req.session.wantsTea
      });
    }
  },
  choose : {
    post : function( req, res ) {
      var wantsTea
        , teaCounter = res.app.locals.teaCounter;

      if(typeof req.body.wantsTea !== "undefined") {
        wantsTea = ( (req.body.wantsTea === "true") || false);

        if(wantsTea) {
          teaCounter.up();
        } else {
          teaCounter.down();
        }

        req.session.wantsTea = wantsTea;
      }  

      res.redirect(301, "/");
    }
  }  
};
 
exports.init = function( server ) {
  server.all(routePrefix, routes.index.all);
  server.post(routePrefix + 'choose', routes.choose.post);
};
