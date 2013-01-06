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
      console.log( req.xhr );

      var wantsTea = ( req.session.wantsTea || false)
        , teaCounter = res.app.locals.teaCounter;

      if( wantsTea ) {
        teaCounter.down();
      } else {
        teaCounter.up();
      }

      wantsTea = req.session.wantsTea = !wantsTea;

      if( req.xhr ) {
        res.send({
          success : true,
          count : Number(teaCounter),
          wantsTea : wantsTea
        });
      } else {
        res.redirect(301, "/");
      }
    }
  }  
};
 
exports.init = function( server ) {
  server.all(routePrefix, routes.index.all);
  server.post(routePrefix + 'choose', routes.choose.post);
};
