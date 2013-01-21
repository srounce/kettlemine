var config = require('../config');

var routePrefix = "/";

var routes = {
  index : {
    all : function( req, res ) {
      var teaCounter = 0
        , wantsTea = req.session.wantsTea = (req.session.wantsTea || 0);

      res.render('index', {
        routePrefix : routePrefix,
        title : config.strings.title,
        wantsTea : req.session.wantsTea
      });
    }
  },
  choose : {
    post : function( req, res ) {
      var wantsTea = ( req.session.wantsTea || false)
        , emailAdd = ( req.body.emailAdd || req.session.email || null)
        , teaCounter = res.app.locals.teaCounter;

      wantsTea = req.session.wantsTea = !wantsTea;
      req.session.email = emailAdd;

      console.log(req.body);

      if( wantsTea ) {
        teaCounter.up();
      } else {
        teaCounter.down();
      }

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
