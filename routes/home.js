var config = require('../config')
  , libutil = require('../lib/util')

var routePrefix = "/";

var routes = {
  index : {
    all : function( req, res ) {
      var teaCounter = 0
        , wantsNotify = req.session.wantsNotify = (req.session.wantsNotify || 0);

      res.render('index', {
        routePrefix : routePrefix,
        title : config.strings.title,
        wantsNotify : req.session.wantsNotify
      });
    }
  },
  choose : {
    post : function( req, res ) {
      var wantsNotify = ( req.session.wantsNotify || false )
        , emailAdd = ( req.body.emailAdd || req.session.email || null )
        , teaCounter = res.app.locals.teaCounter;

      wantsNotify = req.session.wantsNotify = !wantsNotify;
      req.session.email = emailAdd;

console.log(req.session);

      if( !( req.session.email && req.session.email.length > 0 ) ) {
        return res.send({
          success : false,
          count : Number(teaCounter),
          wantsNotify : wantsNotify
        });
      }

      if( wantsNotify ) {
        teaCounter.up();
      } else {
        teaCounter.down();
      }

      if( req.xhr ) {
        res.send({
          success : true,
          count : Number(teaCounter),
          wantsNotify : wantsNotify
        });
      } else {
        res.redirect(301, "/");
      }
    }
  },
  opt : {
    all : function( req, res ) {
      if( req.query.yaynay && parseInt(req.query.yaynay) == 1 ) {
        req.session.wantsTea = true;

        res.send("Cool beans! Tea's on the way!");
      } else {
        req.session.wantsTea = false;

        res.send("Ok, that's fine");
      }
    }
  }
};
 
exports.init = function( server ) {
  server.all(routePrefix, routes.index.all);
  server.post(libutil.validUrl(routePrefix, 'choose'), routes.choose.post);

  server.get(libutil.validUrl(routePrefix, '/email/opt'), routes.opt.all);
};
