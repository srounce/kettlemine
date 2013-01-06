var nodemailer = require('nodemailer')
  , config = require('../config.js');

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
      var smtpTransport = nodemailer.createTransport("SMTP", config.email);

      var sids = Object.keys(sessionStore.sessions);
      sids.forEach(function( sid ) {
        var session = JSON.parse(sessionStore.sessions[sid]);
        
        if( session.wantsTea && session.email && session.email !== false ) {
          smtpTransport.sendMail({
            from : config.strings.title + ' <' + config.email.auth.user + '>',
            to : session.email,
            subject : "Tea's ready!",
            text : "Plaintext message goes here",
            html : "<b>HTML</b> message <em>goes</em> here!"
          }, function( err, res ) {
            if( err ) 
              console.error(err)
            else
              console.info(res);
          });
        }

        session.wantsTea = false;
        sessionStore.sessions[sid] = JSON.stringify(session);

        if( sid === sids[ sids.length -1 ] ) {
          smtpTransport.close();
        }
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
